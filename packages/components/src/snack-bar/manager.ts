import {GecutState, mapObject} from '@gecut/lit-helper';
import {GecutLogger} from '@gecut/logger';
import {uid} from '@gecut/utilities/uid.js';
import {untilEvent, untilNextFrame} from '@gecut/utilities/wait/wait.js';
import {createRef, type Ref} from 'lit/directives/ref.js';
import {styleMap, type StyleInfo} from 'lit/directives/style-map.js';
import {html} from 'lit/html.js';

import {gecutSnackBar, type SnackBarContent} from './snack-bar.js';

export interface SnackBarManagerContent {
  style?: Readonly<StyleInfo>;
}

export class SnackBarManager {
  constructor(content: SnackBarManagerContent) {
    this.content = content;
    this.state = new GecutState<Record<string, {content: SnackBarContent; ref: Ref<HTMLDivElement>}>>(
      'snack-bar-manager',
    );
    this.html = html`
      <div style=${styleMap(this.content.style ?? {})}>
        ${this.state.hydrate((data) =>
          mapObject(null, data, (snackBar) => gecutSnackBar(snackBar.content, snackBar.ref)),
        )}
      </div>
    `;
  }

  readonly state: GecutState<Record<string, {content: SnackBarContent; ref: Ref<HTMLDivElement>}>>;
  readonly html: unknown;
  readonly content: SnackBarManagerContent;

  private readonly logger = new GecutLogger('<snack-bar-manager>');
  private timers: Record<string, NodeJS.Timeout> = {};

  connect(id: string, content: SnackBarContent) {
    this.logger.methodArgs?.('connect', {id, content});

    this.state.value = {
      ...(this.state.value ??= {}),

      [id]: {
        content,
        ref: createRef(),
      },
    };

    return this.__$waitForRender(id);
  }

  async disconnect(id: string) {
    this.logger.methodArgs?.('disconnect', {id});

    await this.close(id);

    delete this.state.value?.[id];
    this.state.value = this.state.value ?? {};

    return untilNextFrame();
  }

  open(id: string) {
    this.logger.methodArgs?.('open', {id});

    const state = (this.state.value ??= {})[id];
    const element = state.ref.value;

    if (!state) return this.logger.warning('open', 'state_not_exist', `state '${id}' not exist`);
    if (!element) return this.logger.warning('open', 'element_not_exist', `element of state '${id}' not exist`);

    element.querySelector<HTMLDivElement>('.actions')?.addEventListener(
      'click',
      () => {
        this.close(id);
      },
      {once: true},
    );

    element.classList.remove('close');
    element.classList.add('open');
  }

  close(id: string) {
    this.logger.methodArgs?.('close', {id});

    const state = (this.state.value ??= {})[id];
    const element = state.ref.value;

    if (!state) return this.logger.warning('close', 'state_not_exist', `state '${id}' not exist`);
    if (!element) return this.logger.warning('close', 'element_not_exist', `element of state '${id}' not exist`);

    element.classList.remove('open');
    element.classList.add('close');

    clearTimeout(this.timers[id]);

    return untilEvent(element, 'animationend');
  }

  async notify(content: SnackBarContent, timeout?: number) {
    const id = 'snack-bar_' + uid();

    await this.connect(id, content);

    this.open(id);

    this.timers[id] = setTimeout(
      async () => this.disconnect(id),
      timeout ?? this.__$readTimeCalc(content.message, (content.action?.label?.length ?? 0) > 10 ? 'high' : 'low'),
    );
  }

  private __$readTimeCalc(message: string, priority: 'low' | 'medium' | 'high'): number {
    const wordCount = message.split(' ').length;

    let baseTime = 100;

    switch (priority) {
      case 'low':
        baseTime += 100;
        break;
      case 'medium':
        baseTime += 200;
        break;
      case 'high':
        baseTime += 300;
        break;
    }

    let readTime = Math.min(4_000 + baseTime * wordCount, 10_000);

    if (wordCount > 20) {
      readTime += (wordCount - 20) * 10;
    }

    this.logger.methodFull?.('__$readTimeCalc', {message, priority}, readTime);

    return readTime;
  }
  private async __$waitForRender(id: string): Promise<void> {
    let element;

    this.logger.time?.('waitForRender-' + id);

    while (element == null) {
      this.logger.methodArgs?.('__$waitForRender', {id});

      await untilNextFrame();

      element = this.state.value?.[id].ref.value;
    }

    this.logger.timeEnd?.('waitForRender-' + id);

    return;
  }
}
