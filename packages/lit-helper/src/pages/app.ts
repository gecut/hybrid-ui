import {scheduleSignalElement} from '@gecut/mixins';
import {css, html} from 'lit';

import type {RenderResult} from '@gecut/types';
import type {PropertyValues} from 'lit';

export abstract class GecutApp extends scheduleSignalElement {
  static override styles = [
    css`
      [hidden] {
        display: none;
      }
    `,
    css`
      :host {
        display: flex;
        flex-direction: column;
        height: 100%;
        width: 100%;
        overflow: hidden;
        position: relative;
      }

      main {
        display: flex;
        flex-direction: column;
        flex: 1;
        overflow: hidden;
        position: relative;
      }
    `,
  ];

  override render(): RenderResult {
    super.render();

    return html``;
  }

  protected override firstUpdated(changedProperties: PropertyValues<this>): void {
    super.firstUpdated(changedProperties);

    window.addEventListener('vaadin-router-location-changed', () => this.requestUpdate());
  }

  protected override createRenderRoot() {
    return this;
  }
}
