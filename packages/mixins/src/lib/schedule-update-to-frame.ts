import {cancelNextAnimationFrame, nextAnimationFrame} from '@gecut/utilities/wait/polyfill.js';

import {SignalMixinInterface} from './signal.js';

import type {Constructor} from '@gecut/types';

export declare class ScheduleUpdateToFrameMixinInterface extends SignalMixinInterface {}

export function ScheduleUpdateToFrameMixin<T extends Constructor<SignalMixinInterface>>(
  superClass: T,
): Constructor<ScheduleUpdateToFrameMixinInterface> & T {
  class ScheduleUpdateToFrameMixinClass extends superClass {
    private scheduleUpdateDebounce?: number;

    protected override async scheduleUpdate(): Promise<void> {
      if (this.scheduleUpdateDebounce != null) {
        cancelNextAnimationFrame(this.scheduleUpdateDebounce);
      }

      await new Promise<number>((resolve) => {
        this.scheduleUpdateDebounce = nextAnimationFrame(resolve.bind(this));
      });
      super.scheduleUpdate();
    }
  }
  return ScheduleUpdateToFrameMixinClass as unknown as Constructor<ScheduleUpdateToFrameMixinInterface> & T;
}
