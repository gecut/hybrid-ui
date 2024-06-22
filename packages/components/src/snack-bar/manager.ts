import {gecutContext} from '@gecut/lit-helper/directives/context.js';
import {GecutLogger} from '@gecut/logger';
import {ContextSignal} from '@gecut/signal';
import {map} from 'lit/directives/map.js';
import {styleMap} from 'lit/directives/style-map.js';
import {html} from 'lit/html.js';

import {gecutSnackBar, type SnackBarContent} from './snack-bar.js';

export interface SnackBarManagerContent {
  position?: {
    top?: string;
    bottom?: string;
    left?: string;
    right?: string;
  };
}

export class SnackBarManager {
  constructor(content: SnackBarManagerContent) {
    this.content = content;
    this.snackBars = {};
    this._$updaterContext.value = 'update';

    this.html = html`
      <div class="flex flex-col absolute inset-x-0" style=${styleMap(this.content?.position ?? {})}>
        ${gecutContext(this._$updaterContext, () =>
          map(Object.keys(this.snackBars), (k) => gecutSnackBar(this.snackBars[k])),
        )}
      </div>
    `;
  }

  content: SnackBarManagerContent = {};
  snackBars: Record<string, ContextSignal<SnackBarContent>> = {};
  html;

  protected _$log = new GecutLogger('gecut-snackbar-manager');
  protected _$updaterContext = new ContextSignal<'update'>('gecut-snackbar-updater', 'AnimationFrame');

  connect(id: string, content: SnackBarContent) {
    this._$log.methodArgs?.('connect', {id, content});

    const context = new ContextSignal<SnackBarContent>(id, 'AnimationFrame');
    context.value = {...content, open: false};

    this.snackBars[id] = context;
    this.update();
  }
  disconnect(id: string) {
    this._$log.methodArgs?.('disconnect', {id});

    this.close(id);

    setTimeout(() => {
      delete this.snackBars[id];
      this.update();
    }, 500);
  }

  open(id: string) {
    this._$log.methodArgs?.('open', {id});

    if (!this.snackBars[id]) return this._$log.warning('open', 'id_not_found', `'${id}' not found`);

    this.snackBars[id].functionalValue((old) => {
      return {...(old ?? {message: ''}), open: true};
    });
    this.update();
  }
  close(id: string) {
    this._$log.methodArgs?.('close', {id});

    if (!this.snackBars[id]) return this._$log.warning('close', 'id_not_found', `'${id}' not found`);

    this.snackBars[id].functionalValue((old) => {
      return {...(old ?? {message: ''}), open: false};
    });
    this.update();
  }

  protected update() {
    this._$log.methodArgs?.('update', {snackBars: this.snackBars});
    this._$updaterContext.renotify();
  }
}
