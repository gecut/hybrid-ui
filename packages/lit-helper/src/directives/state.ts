import {GecutState as GecutStateBase} from '@gecut/signal';
import {noChange} from 'lit/html.js';
import {directive, type PartInfo} from 'lit-html/directive.js';

import {GecutAsyncDirective} from './async-directive.js';

export class GecutState<T> extends GecutStateBase<T> {
  constructor(name: string, defaultValue?: T) {
    super(name, 'AnimationFrame');

    if (defaultValue != null) {
      this.value = defaultValue;
    }
  }

  hydrate(render: (data: T) => unknown, loading?: () => unknown) {
    return __state(this, render, loading);
  }
}

class __GecutStateDirective<T> extends GecutAsyncDirective {
  constructor(partInfo: PartInfo) {
    super(partInfo, 'gecut-state');
  }

  unsubscribe?: () => void;

  protected _$signal?: GecutState<T>;
  protected _$render?: (data: T) => unknown;
  protected _$loading?: () => unknown;

  render(signalState: GecutState<T>, render: (data: T) => unknown = (data) => data, loading?: () => unknown): unknown {
    this.log.methodArgs?.('render', {signalState});

    if (this._$signal && this._$render) return noChange;

    this._$render = render;
    this._$loading = loading;

    this.unsubscribe?.();
    delete this.unsubscribe;

    this._$signal = signalState;

    if (this.isConnected) {
      this.subscribe(signalState);
    }

    return noChange;
  }

  subscribe(signalContext: GecutState<T>): void {
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

    delete this.unsubscribe;
  }
  // If the subtree the directive is in was disconnected and subsequently
  // re-connected, re-subscribe to make the directive operable again
  override reconnected(): void {
    this.subscribe(this._$signal!);
  }
}

const __state = directive(__GecutStateDirective) as <T>(
  signalContext: GecutState<T>,
  render?: (data: T) => unknown,
  loading?: () => unknown,
) => unknown;
