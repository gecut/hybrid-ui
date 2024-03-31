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
    'relative  rounded-full h-10 px-6 cursor-pointer focus-ring disabled:cursor-default disabled:pointer-events-none [&[loading]]:cursor-default [&[loading]]:pointer-events-none';
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
      <div class="absolute inset-0 flex justify-center items-center ${content.loading ? 'opacity-100' : 'opacity-0'}">
        ${icon({
          svg: '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><circle cx="12" cy="12" r="0" fill="currentColor"><animate id="svgSpinnersPulse20" fill="freeze" attributeName="r" begin="0;svgSpinnersPulse21.begin+0.6s" calcMode="spline" dur="1.2s" keySplines=".52,.6,.25,.99" values="0;11"/><animate fill="freeze" attributeName="opacity" begin="0;svgSpinnersPulse21.begin+0.6s" calcMode="spline" dur="1.2s" keySplines=".52,.6,.25,.99" values="1;0"/></circle><circle cx="12" cy="12" r="0" fill="currentColor"><animate id="svgSpinnersPulse21" fill="freeze" attributeName="r" begin="svgSpinnersPulse20.begin+0.6s" calcMode="spline" dur="1.2s" keySplines=".52,.6,.25,.99" values="0;11"/><animate fill="freeze" attributeName="opacity" begin="svgSpinnersPulse20.begin+0.6s" calcMode="spline" dur="1.2s" keySplines=".52,.6,.25,.99" values="1;0"/></circle></svg>',
        })}
      </div>

      <div class="flex items-center justify-center gap-2 ${content.loading ? 'opacity-0' : 'opacity-100'}">
        ${when(content.icon?.svg, () => icon({svg: content.icon?.svg as string}))}

        <span class="text-labelLarge">${content.label}</span>

        ${when(content.trailingIcon?.svg, () => icon({svg: content.trailingIcon?.svg as string}))}
      </div>
    `;
  }
}

export const gecutButton = directive(GecutButtonDirective);
