/* eslint-disable max-len */
import {GecutDirective} from '@gecut/lit-helper/directives/directive.js';
import {directive, type PartInfo} from 'lit/directive.js';
import {classMap} from 'lit/directives/class-map.js';
import {ifDefined} from 'lit/directives/if-defined.js';
import {when} from 'lit/directives/when.js';
import {html, noChange, nothing} from 'lit/html.js';
import {literal, html as staticHtml} from 'lit/static-html.js';

import {icon} from '../icon/icon.js';

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

  onClick?: (event: MouseEvent) => void;
  onDblClick?: (event: MouseEvent) => void;

  label?: string;
}

export class GecutButtonDirective extends GecutDirective {
  constructor(partInfo: PartInfo) {
    super(partInfo, 'gecut-button');
  }

  protected content?: ButtonContent;
  protected type: 'link' | 'button' = 'button';

  protected $rootClassName =
    'relative group rounded-full h-10 px-6 cursor-pointer focus-ring disabled:cursor-default disabled:pointer-events-none';
  protected $loaderClassName =
    'absolute inset-0 flex justify-center items-center transition-opacity duration-300 opacity-0 group-[[loading]]:opacity-100 [&[loading]]:cursor-default [&[loading]]:pointer-events-none';
  protected $bodyClassName =
    'flex items-center justify-center h-full w-full gap-2 transition-opacity duration-300 opacity-100 group-[[loading]]:opacity-0';

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
        class=${classMap({[this.$rootClassName]: true, ...this.getRenderClasses()})}
        role="button"
        href=${ifDefined(this.content.href)}
        target=${ifDefined(this.content.target)}
        tabindex="${this.content.disabled ? -1 : 0}"
        ?disabled=${this.content.disabled ?? false}
        ?loading=${this.content.loading ?? false}
        @click=${this.content.onClick}
        @dblclick=${this.content.onDblClick}
      >${this.renderLoader()}${this.renderBody()}</${tag}>
    `;
  }
  protected renderBody(): unknown {
    if (!this.content) return nothing;

    this.log.method?.('renderContent');

    return html`
      <div class=${this.$loaderClassName}>
        ${icon(
          this.content.loader ?? {
            svg: '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><g stroke="currentColor"><circle cx="12" cy="12" r="9.5" fill="none" stroke-linecap="round" stroke-width="2.5"><animate attributeName="stroke-dasharray" calcMode="spline" dur="1.5s" keySplines="0.42,0,0.58,1;0.42,0,0.58,1;0.42,0,0.58,1" keyTimes="0;0.475;0.95;1" repeatCount="indefinite" values="0 150;42 150;42 150;42 150"/><animate attributeName="stroke-dashoffset" calcMode="spline" dur="1.5s" keySplines="0.42,0,0.58,1;0.42,0,0.58,1;0.42,0,0.58,1" keyTimes="0;0.475;0.95;1" repeatCount="indefinite" values="0;-16;-59;-59"/></circle><animateTransform attributeName="transform" dur="2s" repeatCount="indefinite" type="rotate" values="0 12 12;360 12 12"/></g></svg>',
          },
        )}
      </div>

      <div class=${this.$bodyClassName}>
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
      <div class=${this.$loaderClassName}>
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

      'text-primary bg-surfaceContainerLow elevation-1 hover:elevation-2 hover:stateHover-primary focus:elevation-1 active:stateActive-primary disabled:opacity-60':
        this.content?.type === 'elevated',
      'text-onPrimary bg-primary elevation-0 hover:elevation-2 hover:stateHover-onPrimary focus:elevation-1 active:stateActive-onPrimary disabled:opacity-40':
        this.content?.type === 'filled',
      'text-onSecondaryContainer bg-secondaryContainer elevation-0 hover:elevation-2 hover:stateHover-onSecondaryContainer focus:elevation-1 active:stateActive-onSecondaryContainer disabled:opacity-60':
        this.content?.type === 'filledTonal',
      'text-primary bg-transparent border border-outline hover:stateHover-primary active:stateActive-primary disabled:opacity-60':
        this.content?.type === 'outlined',
      'text-primary bg-transparent hover:stateHover-primary active:stateActive-primary disabled:opacity-60':
        this.content?.type === 'text',
    };
  }
}

export const gecutButton = directive(GecutButtonDirective);
