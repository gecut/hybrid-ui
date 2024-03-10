/* eslint-disable max-len */
import {GecutDirective} from '@gecut/lit-helper/directives/directive.js';
import {directive, type PartInfo} from 'lit/directive.js';
import {classMap} from 'lit/directives/class-map.js';
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
    'flex items-center justify-center rounded-full h-10 px-6 gap-2 cursor-pointer focus-ring disabled:cursor-default disabled:pointer-events-none';
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
        @click=${onClick}
        @dblclick=${onDblClick}
      >
        ${this.renderContent(content)}
      </button>
    `;
  }
  protected static renderLink(content: ButtonContent): unknown {
    return html`<a
      href=${'href' in content ? content.href : '#'}
      class="${this.uiTypeStylesClasses[content.type]}  ${this.baseStyleClass}"
      ?disabled=${content.disabled ?? false}
    >
      ${this.renderContent(content)}
    </a>`;
  }
  protected static renderContent(content: ButtonContent): unknown {
    return html`
      ${when(content.icon?.svg, () => icon({svg: content.icon?.svg as string}))}

      <span class="text-labelLarge">${content.label}</span>

      ${when(content.trailingIcon?.svg, () => icon({svg: content.trailingIcon?.svg as string}))}
    `;
  }
}

export const gecutButton = directive(GecutButtonDirective);
