/* eslint-disable new-cap */
import { LitElement } from 'lit';

import { LoggerMixin } from './lib/logger.js';
import { ScheduleUpdateToFrameMixin } from './lib/schedule-update-to-frame.js';
import { SignalMixin } from './lib/signal.js';

export * from './lib/logger.js';
export * from './lib/signal.js';
export * from './lib/schedule-update-to-frame.js';

export const loggerElement = LoggerMixin(LitElement);
export const signalElement = SignalMixin(loggerElement);
export const scheduleSignalElement = ScheduleUpdateToFrameMixin(signalElement);
