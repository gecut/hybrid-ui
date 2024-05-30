/* eslint-disable max-len */
import {GecutDirective} from '@gecut/lit-helper/directives/directive.js';
import {directive, type PartInfo} from 'lit/directive.js';
import {classMap} from 'lit/directives/class-map.js';
import {ifDefined} from 'lit/directives/if-defined.js';
import {when} from 'lit/directives/when.js';
import {html, noChange, nothing} from 'lit/html.js';
import {literal, html as staticHtml} from 'lit/static-html.js';

import {icon} from '../icon/icon.js';
import {gecutEFO, type EventsObject} from '../internal/events-handler.js';

import type {IconContent} from '../icon/icon.js';
import type {ClassInfo} from 'lit/directives/class-map.js';
import type {StaticValue} from 'lit/static-html.js';

export interface ButtonContent {
  /**
   * @default elevated
   */
  type: 'elevated' | 'filled' | 'filledTonal' | 'outlined' | 'text';

  disabled?: boolean;
  loading?: boolean;
  loader?: IconContent;
  icon?: IconContent;
  trailingIcon?: IconContent;

  href?: string;
  target?: '_blank' | '_parent' | '_self' | '_top';

  events?: EventsObject;

  label?: string;
}

export class GecutButtonDirective extends GecutDirective {
  constructor(partInfo: PartInfo) {
    super(partInfo, 'gecut-button');
  }

  protected content?: ButtonContent;
  protected type: 'link' | 'button' = 'button';

  render(content?: ButtonContent): unknown {
    this.log.methodArgs?.('render', content);

    if (content === undefined) return noChange;

    this.content = content;

    if (this.content.href) this.type = 'link';

    return this.renderButton();
  }

  protected renderButton() {
    if (!this.content) return nothing;

    this.log.method?.('renderItem');

    let tag: StaticValue;

    switch (this.type) {
      case 'link':
        tag = literal`a`;
        break;
      case 'button':
        tag = literal`button`;
        break;
    }

    return staticHtml`
      <${tag}
        class=${classMap(this.getRenderClasses())}
        role="button"
        href=${ifDefined(this.content.href)}
        target=${ifDefined(this.content.target)}
        tabindex="${this.content.disabled ? -1 : 0}"
        ?disabled=${this.content.disabled ?? false}
        ?loading=${this.content.loading ?? false}
        ${gecutEFO(this.content.events, this.log.sub('efo'))}
        >${this.renderLoader()}${this.renderBody()}</${tag}>
    `;
  }
  protected renderBody(): unknown {
    if (!this.content) return nothing;

    this.log.method?.('renderContent');

    return html`
      <div class="gecut-button-body">
        ${when(this.content.icon?.svg, () => icon({svg: this.content?.icon?.svg as string}))}

        <span class="text-labelLarge">${this.content.label}</span>

        ${when(this.content.trailingIcon?.svg, () => icon({svg: this.content?.trailingIcon?.svg as string}))}
      </div>
    `;
  }
  protected renderLoader(): unknown {
    if (!this.content) return nothing;

    this.log.method?.('renderLoader');

    return html`
      <div class="gecut-button-loader">
        ${icon(
          this.content.loader ?? {
            svg: '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><g stroke="currentColor"><circle cx="12" cy="12" r="9.5" fill="none" stroke-linecap="round" stroke-width="2.5"><animate attributeName="stroke-dasharray" calcMode="spline" dur="1.5s" keySplines="0.42,0,0.58,1;0.42,0,0.58,1;0.42,0,0.58,1" keyTimes="0;0.475;0.95;1" repeatCount="indefinite" values="0 150;42 150;42 150;42 150"/><animate attributeName="stroke-dashoffset" calcMode="spline" dur="1.5s" keySplines="0.42,0,0.58,1;0.42,0,0.58,1;0.42,0,0.58,1" keyTimes="0;0.475;0.95;1" repeatCount="indefinite" values="0;-16;-59;-59"/></circle><animateTransform attributeName="transform" dur="2s" repeatCount="indefinite" type="rotate" values="0 12 12;360 12 12"/></g></svg>',
          },
        )}
      </div>
    `;
  }

  protected override getRenderClasses(): ClassInfo {
    return {
      ...super.getRenderClasses(),

      elevated: this.content?.type === 'elevated',
      filled: this.content?.type === 'filled',
      'filled-tonal': this.content?.type === 'filledTonal',
      outlined: this.content?.type === 'outlined',
      text: this.content?.type === 'text',
    };
  }
}

export const gecutButton = directive(GecutButtonDirective);
