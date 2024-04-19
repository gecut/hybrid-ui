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
    private signalSubscribers: ReturnType<Signal<any>['subscribe']>[] = [];

    override disconnectedCallback(): void {
      super.disconnectedCallback();

      for (const signalReturn of this.signalSubscribers) {
        signalReturn.unsubscribe();
      }
    }

    protected addSignalSubscriber<T, S extends Signal<T>>(signalReturn: ReturnType<S['subscribe']>): void {
      this.signalSubscribers.push(signalReturn);
    }
  }

  return SignalMixinClass as unknown as MixinReturn<T>;
}
