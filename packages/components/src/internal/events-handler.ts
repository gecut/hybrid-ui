import {GecutDirective} from '@gecut/lit-helper/directives/directive.js';
import debounce from '@gecut/utilities/debounce.js';
import {nothing} from 'lit';
import {directive} from 'lit/directive.js';

import type {GecutLogger} from '@gecut/logger';
import type {ElementPart, PartInfo} from 'lit/directive.js';

export type OptionsEventsObject = Record<string, boolean | EventListenerOptions>;
export type FunctionOptionsEventsObject<T = HTMLElementEventMap> = Partial<{
  [P in keyof T]: [(evt: T[P]) => unknown, boolean | EventListenerOptions];
}>;
export type FunctionEventsObject<T = HTMLElementEventMap> = Partial<{
  [P in keyof T]: (evt: T[P]) => unknown;
}>;
export type EventsObject<T = HTMLElementEventMap> = FunctionEventsObject<T> | FunctionOptionsEventsObject<T>;

export class EventsFromObjectDirective extends GecutDirective {
  constructor(partInfo: PartInfo) {
    super(partInfo, 'gecut-efo');
  }

  protected element?: HTMLElement;
  protected eventsFunctions: FunctionEventsObject = {};
  protected eventsOptions: OptionsEventsObject = {};
  protected rendered = false;

  override update(part: ElementPart, [events, logger]: Parameters<this['render']>) {
    super.update(part, [events]);

    if (this.rendered) return nothing;

    if (logger && this.log.domain != logger.domain) {
      this.log = logger;
    }

    this.element = part.element as HTMLElement;

    if (events) {
      for (const [name, callbackOrCallbackAndOptions] of Object.entries(events)) {
        if (Array.isArray(callbackOrCallbackAndOptions)) {
          this.eventsFunctions[name as keyof EventsObject] = debounce(
            this.debouncedEventHandler(name, callbackOrCallbackAndOptions[0]).bind(this),
            16.6666,
          );

          this.eventsOptions[name as keyof EventsObject] = callbackOrCallbackAndOptions[1];
        }
        else {
          this.eventsFunctions[name as keyof EventsObject] ??= debounce(
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            this.debouncedEventHandler<any>(name, callbackOrCallbackAndOptions).bind(this),
            16.6666,
          );
        }
      }

      for (const [name, func] of Object.entries(this.eventsFunctions)) {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        this.element.addEventListener(name as keyof EventsObject, func as any, this.eventsOptions[name] ?? {});
      }
    }

    this.rendered = true;

    return nothing;
  }

  render(events: EventsObject = {}, logger?: GecutLogger): unknown {
    this.log.methodArgs?.('render', {events, customLogger: !!logger});

    return nothing;
  }

  private debouncedEventHandler<T extends Event = Event>(name: string, func: (event: T) => unknown): EventListener {
    return (event: Event) => {
      this.log.methodArgs?.(name, {
        tag: this.element?.tagName.toLowerCase(),
        element: this.element,
        event,
      });

      func(event as T);
    };
  }
}

export const gecutEFO = directive(EventsFromObjectDirective);
