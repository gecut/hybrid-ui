import {noChange} from 'lit/html.js';
import {directive, type PartInfo} from 'lit-html/directive.js';

import {GecutAsyncDirective} from './async-directive.js';

import type {ContextSignal} from '@gecut/signal';

class GecutContextDirective<T> extends GecutAsyncDirective {
  constructor(partInfo: PartInfo) {
    super(partInfo, 'gecut-context');
  }

  unsubscribe?: () => void;

  protected _$signal?: ContextSignal<T>;
  protected _$render?: (data: T) => unknown;
  protected _$loading?: () => unknown;

  render(
    signalContext: ContextSignal<T>,
    render: (data: T) => unknown = (data) => data,
    loading?: () => unknown,
  ): unknown {
    signalContext;
    this.log.methodArgs?.('render', {signalContext});

    this._$render = render;
    this._$loading = loading;
    if (this._$signal !== signalContext) {
      // When the observable changes, unsubscribe to the old one and subscribe to the new one
      this.unsubscribe?.();
      this._$signal = signalContext;

      if (this.isConnected) {
        this.subscribe(signalContext);
      }
    }

    return noChange;
  }

  subscribe(signalContext: ContextSignal<T>): void {
    this.log.method?.('subscribe');

    if (this._$loading) {
      this.setValue(this._$loading());
    }

    this.unsubscribe = signalContext.subscribe(
      (v) => {
        this.setValue(this._$render!(v));
      },
      {receivePrevious: true},
    ).unsubscribe;
  }

  // When the directive is disconnected from the DOM, unsubscribe to ensure
  // the directive instance can be garbage collected
  override disconnected(): void {
    this.unsubscribe?.();
  }
  // If the subtree the directive is in was disconnected and subsequently
  // re-connected, re-subscribe to make the directive operable again
  override reconnected(): void {
    this.subscribe(this._$signal!);
  }
}

export const gecutContext = directive(GecutContextDirective) as <T>(
  signalContext: ContextSignal<T>,
  render?: (data: T) => unknown,
) => unknown;
