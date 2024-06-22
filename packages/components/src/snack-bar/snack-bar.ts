import {GecutAsyncDirective} from '@gecut/lit-helper/directives/async-directive.js';
import {directive} from 'lit/directive.js';
import {classMap} from 'lit/directives/class-map.js';
import {nothing, html, noChange} from 'lit/html.js';

import {gecutButton} from '../button/button.js';
import {gecutIconButton} from '../components.js';

import type {ButtonContent} from '../button/button.js';
import type {IconButtonContent} from '../components.js';
import type {ContextSignal} from '@gecut/signal';
import type {PartInfo} from 'lit/directive.js';
import type {ClassInfo} from 'lit/directives/class-map.js';

export interface SnackBarContent {
  message: string;

  open?: boolean;
  action?: Omit<ButtonContent, 'type'>;
  close?: boolean | Omit<IconButtonContent, 'type'>;
}

export class GecutSnackBarDirective extends GecutAsyncDirective {
  constructor(partInfo: PartInfo) {
    super(partInfo, 'gecut-snack-bar');
  }

  protected _$signalContext?: ContextSignal<SnackBarContent>;
  protected _$unsubscribe?: () => void;

  render(signalContext: ContextSignal<SnackBarContent>): unknown {
    this.log.methodArgs?.('render', signalContext);

    if (this._$signalContext !== signalContext) {
      // When the observable changes, unsubscribe to the old one and subscribe to the new one
      this._$unsubscribe?.();
      this._$signalContext = signalContext;

      if (this.isConnected) {
        this.subscribe();
      }
    }

    return noChange;
  }

  // When the directive is disconnected from the DOM, unsubscribe to ensure
  // the directive instance can be garbage collected
  override disconnected(): void {
    super.disconnected();

    this._$unsubscribe!();
  }
  // If the subtree the directive is in was disconnected and subsequently
  // re-connected, re-subscribe to make the directive operable again
  override reconnected(): void {
    super.reconnected();

    this.subscribe();
  }

  close() {
    if (this._$signalContext?.value?.open) {
      this._$signalContext.value.open = false;

      this._$signalContext?.renotify();
    }
  }

  protected subscribe() {
    this.log.method?.('subscribe');

    this._$unsubscribe = this._$signalContext?.subscribe(
      (content) => {
        this.setValue(this.renderSnackBar(content));
      },
      {receivePrevious: true},
    ).unsubscribe;
  }

  protected renderSnackBar(content: SnackBarContent) {
    this.log.method?.('renderSnackBar');

    return html`
      <div class=${classMap(this.getRenderClasses())}>
        <span class="gecut-snack-bar-message">${content.message}</span>
        <div @click=${this.close.bind(this)}>
          ${this.renderAction(content.action)} ${this.renderClose(content.close)}
        </div>
      </div>
    `;
  }
  protected renderAction(content: SnackBarContent['action']): unknown {
    if (!content) return nothing;

    this.log.method?.('renderAction');

    return gecutButton({
      ...content,
      type: 'text',
    });
  }
  protected renderClose(content: SnackBarContent['close']): unknown {
    if (!content) return nothing;

    this.log.method?.('renderClose');

    const _content: Omit<IconButtonContent, 'type'> =
      typeof content !== 'boolean'
        ? content
        : {
          svg:
              // eslint-disable-next-line max-len
              '<svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 24 24"><path fill="none" stroke="currentColor" stroke-dasharray="12" stroke-dashoffset="12" stroke-linecap="round" stroke-width="2" d="M12 12L19 19M12 12L5 5M12 12L5 19M12 12L19 5"><animate fill="freeze" attributeName="stroke-dashoffset" dur="1.2s" values="12;0"/></path></svg>',
        };

    return gecutIconButton(_content);
  }

  protected override getRenderClasses(): ClassInfo {
    const content = this._$signalContext?.value;

    if (!content) return super.getRenderClasses();

    return {
      ...super.getRenderClasses(),

      'longer-action': (content.action?.label?.length ?? 0) > 10,
      open: content.open ?? false,
      close: !(content.open ?? false),
    };
  }
}

export const gecutSnackBar = directive(GecutSnackBarDirective);
