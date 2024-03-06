import { GecutLogger } from '@gecut/logger';
import { LitElement } from 'lit';

import type { Constructor } from '@gecut/types';
import type { PropertyValues, PropertyDeclaration } from 'lit';

export declare class LoggerMixinInterface extends LitElement {
  protected log: GecutLogger;
}

export function LoggerMixin<T extends Constructor<LitElement>>(
  superClass: T
): Constructor<LoggerMixinInterface> & T {
  class LoggerMixinClass extends superClass {
    protected log = new GecutLogger(`<${this.tagName.toLowerCase()}>`);

    private _$firstUpdated?: true;

    override connectedCallback(): void {
      this.log.method?.('connectedCallback');
      super.connectedCallback();
    }

    override disconnectedCallback(): void {
      this.log.method?.('disconnectedCallback');
      super.disconnectedCallback();
    }

    override dispatchEvent(event: Event): boolean {
      this.log.methodArgs?.('dispatchEvent', {
        type: event.type,
        detail: (event as Event & { detail?: unknown }).detail
      });
      return super.dispatchEvent(event);
    }

    override remove(): void {
      this.log.method?.('remove');
      super.remove();
    }

    override requestUpdate(
      name?: PropertyKey | undefined,
      oldValue?: unknown,
      options?: PropertyDeclaration<unknown, unknown> | undefined
    ): void {
      this?.log?.methodArgs?.('requestUpdate', {
        name,
        newValue: this[name as keyof LoggerMixinClass],
        oldValue,
        options
      });

      super.requestUpdate(name, oldValue, options);
    }

    protected override update(changedProperties: PropertyValues): void {
      this.log.method?.('update');
      this.log.time?.(
        this._$firstUpdated ? 'update-time' : 'first-update-time'
      );
      super.update(changedProperties);
    }

    protected override firstUpdated(changedProperties: PropertyValues): void {
      this.log.methodArgs?.('firstUpdated', { changedProperties });
      this.log.timeEnd?.('first-update-time');
      super.firstUpdated(changedProperties);
    }

    protected override updated(changedProperties: PropertyValues): void {
      this.log.methodArgs?.('updated', { changedProperties });

      if (this._$firstUpdated) {
        this.log.timeEnd?.('update-time');
      }
      else {
        this._$firstUpdated = true;
      }

      super.updated(changedProperties);
    }

    protected override render(): unknown {
      this.log.method?.('render');
      return;
    }
  }

  return LoggerMixinClass as unknown as Constructor<LoggerMixinInterface> &
  T;
}
