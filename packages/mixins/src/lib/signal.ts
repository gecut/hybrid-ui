import {LitElement} from 'lit';

import type {Signal, Subscriber} from '@gecut/signal';
import type {Constructor} from '@gecut/types';

export declare class SignalMixinInterface extends LitElement {
  protected addSignalSubscriber<T, S extends Signal<T>>(signal: S, subscriber: Subscriber<T>): void;
}

export type MixinReturn<T> = Constructor<SignalMixinInterface> & T;

export function SignalMixin<T extends Constructor<LitElement>>(superClass: T): MixinReturn<T> {
  class SignalMixinClass extends superClass {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    private signalSubscribers: [Signal<any>, Subscriber<any>][] = [];

    override disconnectedCallback(): void {
      super.disconnectedCallback();

      for (const [signal, subscriber] of this.signalSubscribers) {
        signal.unsubscribe(subscriber);
      }
    }

    protected addSignalSubscriber<T, S extends Signal<T>>(signal: S, subscriber: Subscriber<T>): void {
      this.signalSubscribers.push([signal, subscriber]);
    }
  }

  return SignalMixinClass as unknown as MixinReturn<T>;
}
