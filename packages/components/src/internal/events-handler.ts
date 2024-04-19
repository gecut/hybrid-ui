import {GecutDirective} from '@gecut/lit-helper/directives/directive.js';
import {nothing} from 'lit';
import {directive} from 'lit/directive.js';

import type {ElementPart, PartInfo} from 'lit/directive.js';

export type EventsObject<T = HTMLElementEventMap> = Partial<{
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  [P in keyof T]: (evt: T[P]) => any | [(evt: T[P]) => any, boolean | EventListenerOptions];
}>;

export class EventsFromObjectDirective extends GecutDirective {
  constructor(partInfo: PartInfo) {
    super(partInfo, 'gecut-efo');
  }

  protected element?: HTMLElement;
  protected events: EventsObject = {};

  override update(part: ElementPart, [events]: Parameters<this['render']>) {
    super.update(part, [events]);

    this.element = part.element as HTMLElement;

    if (events) {
      this.events = events;
    }

    const removeOrAddEventListener = (funcName: 'removeEventListener' | 'addEventListener') => {
      for (const [name, callbackOrCallbackAndOptions] of Object.entries(this.events)) {
        if (Array.isArray(callbackOrCallbackAndOptions)) {
          this.element?.[funcName](
            name,
            this.debouncedEventHandler(name, callbackOrCallbackAndOptions[0]),
            callbackOrCallbackAndOptions[1],
          );
        }
        else {
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          this.element?.[funcName](name, this.debouncedEventHandler<any>(name, callbackOrCallbackAndOptions));
        }
      }
    };

    removeOrAddEventListener('removeEventListener');
    removeOrAddEventListener('addEventListener');

    return nothing;
  }

  render(events: EventsObject = {}): unknown {
    this.log.methodArgs?.('render', events);

    return nothing;
  }

  private debouncedEventHandler<T extends Event = Event>(name: string, func: (event: T) => unknown): EventListener {
    return (event: Event) => {
      this.log.methodArgs?.(name, {
        tag: this.element?.tagName.toLowerCase(),
        element: this.element,
      });

      func(event as T);
    };
  }
}

export const gecutEFO = directive(EventsFromObjectDirective);
