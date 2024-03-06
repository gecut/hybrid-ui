import { scheduleSignalElement } from '@gecut/mixins';
import { html } from 'lit';

import type { RenderResult } from '@gecut/types';
import type { PropertyValueMap } from 'lit';

export interface GecutPWAPageMeta {
  title?: string;
  description?: string;
  url?: string;
  image?: string;
  robots?: {
    index?: boolean;
    follow?: boolean;
  };
}

export abstract class GecutPWAPage extends scheduleSignalElement {
  override render(): RenderResult {
    super.render();

    return html``;
  }

  protected override firstUpdated(
    _changedProperties: PropertyValueMap<this> | Map<PropertyKey, unknown>
  ): void {
    super.firstUpdated(_changedProperties);

    this.classList.add('gecut-page');
  }

  protected meta(): GecutPWAPageMeta {
    this.log.method?.('meta');

    return {};
  }

  protected override createRenderRoot() {
    return this;
  }
}
