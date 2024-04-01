/* eslint-disable max-len */
import {GecutDirective} from '@gecut/lit-helper/directives/directive.js';
import {directive, type PartInfo} from 'lit/directive.js';
import {ifDefined} from 'lit/directives/if-defined.js';
import {when} from 'lit/directives/when.js';
import {html, noChange} from 'lit/html.js';

import {icon} from '../icon/icon.js';

import type {IconContent} from '../icon/icon.js';

export type ButtonContent = {
  /**
   * @default elevated
   */
  type: 'elevated' | 'filled' | 'filledTonal' | 'outlined' | 'text';

  disabled?: boolean;
  loading?: boolean;
  loader?: IconContent;
  icon?: IconContent;
  trailingIcon?: IconContent;

  label?: string;
} & (
  | {href?: string; target?: '_blank' | '_parent' | '_self' | '_top'}
  | {
    onClick: (event: MouseEvent) => void;
  }
  | {
    onDblClick: (event: MouseEvent) => void;
  }
  | Record<string, never>
);

export class GecutButtonDirective extends GecutDirective {
  constructor(partInfo: PartInfo) {
    super(partInfo, 'gecut-button');
  }

  private static baseStyleClass =
    'relative group rounded-full h-10 px-6 cursor-pointer focus-ring disabled:cursor-default disabled:pointer-events-none [&[loading]]:cursor-default [&[loading]]:pointer-events-none';
  private static uiTypeStylesClasses = {
    elevated:
      'text-primary bg-surfaceContainerLow elevation-1 hover:elevation-2 hover:stateHover-primary focus:elevation-1 active:stateActive-primary disabled:opacity-60',
    filled:
      'text-onPrimary bg-primary elevation-0 hover:elevation-2 hover:stateHover-onPrimary focus:elevation-1 active:stateActive-onPrimary disabled:opacity-40',
    filledTonal:
      'text-onSecondaryContainer bg-secondaryContainer elevation-0 hover:elevation-2 hover:stateHover-onSecondaryContainer focus:elevation-1 active:stateActive-onSecondaryContainer disabled:opacity-60',
    outlined:
      'text-primary bg-transparent border border-outline hover:stateHover-primary active:stateActive-primary disabled:opacity-60',
    text: 'text-primary bg-transparent hover:stateHover-primary active:stateActive-primary disabled:opacity-60',
  };

  render(content?: ButtonContent): unknown {
    this.log.methodArgs?.('render', content);

    if (content === undefined) return noChange;

    if (GecutButtonDirective.isLink(content)) {
      return GecutButtonDirective.renderLink(content);
    }

    return GecutButtonDirective.renderButton(content);
  }

  protected static isLink(content: ButtonContent) {
    return 'href' in content;
  }

  protected static renderButton(content: ButtonContent): unknown {
    const onClick = 'onClick' in content ? (event: MouseEvent) => content.onClick(event) : undefined;
    const onDblClick = 'onDblClick' in content ? (event: MouseEvent) => content.onDblClick(event) : undefined;

    return html`
      <button
        class="${this.uiTypeStylesClasses[content.type]} ${this.baseStyleClass}"
        ?disabled=${content.disabled ?? false}
        ?loading=${content.loading ?? false}
        @click=${onClick}
        @dblclick=${onDblClick}
      >
        ${this.renderContent(content)}
      </button>
    `;
  }
  protected static renderLink(content: ButtonContent): unknown {
    return html`<a
      href=${ifDefined('href' in content ? content.href : '#')}
      class="${this.uiTypeStylesClasses[content.type]}  ${this.baseStyleClass}"
      ?disabled=${content.disabled ?? false}
      ?loading=${content.loading ?? false}
    >
      ${this.renderContent(content)}
    </a>`;
  }
  protected static renderContent(content: ButtonContent): unknown {
    return html`
      <div
        class="absolute inset-0 flex justify-center items-center transition-opacity duration-300 opacity-0 group-[[loading]]:opacity-100"
      >
        ${icon(
          content.loader ?? {
            svg: '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><g stroke="currentColor"><circle cx="12" cy="12" r="9.5" fill="none" stroke-linecap="round" stroke-width="2.5"><animate attributeName="stroke-dasharray" calcMode="spline" dur="1.5s" keySplines="0.42,0,0.58,1;0.42,0,0.58,1;0.42,0,0.58,1" keyTimes="0;0.475;0.95;1" repeatCount="indefinite" values="0 150;42 150;42 150;42 150"/><animate attributeName="stroke-dashoffset" calcMode="spline" dur="1.5s" keySplines="0.42,0,0.58,1;0.42,0,0.58,1;0.42,0,0.58,1" keyTimes="0;0.475;0.95;1" repeatCount="indefinite" values="0;-16;-59;-59"/></circle><animateTransform attributeName="transform" dur="2s" repeatCount="indefinite" type="rotate" values="0 12 12;360 12 12"/></g></svg>',
          },
        )}
      </div>

      <div
        class="flex items-center justify-center gap-2 transition-opacity duration-300 opacity-100 group-[[loading]]:opacity-0"
      >
        ${when(content.icon?.svg, () => icon({svg: content.icon?.svg as string}))}

        <span class="text-labelLarge">${content.label}</span>

        ${when(content.trailingIcon?.svg, () => icon({svg: content.trailingIcon?.svg as string}))}
      </div>
    `;
  }
}

export const gecutButton = directive(GecutButtonDirective);
