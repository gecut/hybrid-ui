/* eslint-disable max-len */
import {GecutDirective} from '@gecut/lit-helper/directives/directive.js';
import {numberUtils} from '@gecut/utilities/data-types/number.js';
import {directive, type PartInfo} from 'lit/directive.js';
import {classMap} from 'lit/directives/class-map.js';
import {ifDefined} from 'lit/directives/if-defined.js';
import {when} from 'lit/directives/when.js';
import {html, noChange, nothing} from 'lit/html.js';
import {literal, html as staticHtml} from 'lit/static-html.js';

import {divider, icon, iconButton} from '../components';

import type {IconButtonContent, IconContent} from '../components';
import type {RenderResult} from '@gecut/types';
import type {TemplateResult} from 'lit/html.js';
import type {StaticValue} from 'lit/static-html.js';

export interface ItemImageSlotContent {
  placeholder: string;
  source: string;
}

export type HtmlString = string | TemplateResult;
export type ItemSlutContent =
  | {
    type: 'avatar:character';
    character: string;
  }
  | (ItemImageSlotContent & {
    type: 'avatar:image';
  })
  | (ItemImageSlotContent & {
    type: 'image';
  })
  | {type: 'template'; template: TemplateResult}
  | (IconContent & {type: 'icon'})
  | (IconButtonContent & {type: 'icon-button'});

export interface ItemContent {
  headline: HtmlString;
  overline?: HtmlString;
  supportingText?: HtmlString;
  trailingSupportingText?: {type: 'string'; value: string} | {type: 'number'; value: number | string; maximum: number};

  supportingTextTwoLine?: boolean;

  href?: string;
  target?: '_blank' | '_parent' | '_self' | '_top';

  onClick?: (event: MouseEvent) => void;
  onDblClick?: (event: MouseEvent) => void;

  disabled?: boolean;
  divider?: boolean;

  leading?: ItemSlutContent;
  trailing?: ItemSlutContent;
}

export class GecutItemDirective extends GecutDirective {
  constructor(partInfo: PartInfo) {
    super(partInfo, 'gecut-button');
  }

  protected content?: ItemContent;
  protected type: 'link' | 'text' | 'button' = 'text';

  protected $rootClassName =
    'relative flex flex-col list-none group w-full bg-surface text-onSurface overflow-hidden [&[interactive]]:focus-ring-inner rounded-lg disabled:cursor-default disabled:pointer-events-none select-none [&[interactive]]:hover:stateHover-onSurface [&[interactive]]:active:stateActive-onSurface';

  render(content?: ItemContent): unknown {
    this.log.methodArgs?.('render', content);

    if (content === undefined) return noChange;

    this.content = content;

    if (content.onClick || content.onDblClick) this.type = 'button';
    if (content.href) this.type = 'link';

    return this.renderItem();
  }

  protected renderItem() {
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
      case 'text':
        tag = literal`label`;
        break;
    }

    const isInteractive = this.type !== 'text';

    return staticHtml`
      <${tag}
        class=${classMap({[this.$rootClassName]: true, ...this.getRenderClasses()})}
        tabindex="${this.content.disabled || !isInteractive ? -1 : 0}"
        role="listitem"
        href=${ifDefined(this.content.href)}
        target=${ifDefined(this.content.target)}
        ?disabled=${this.content.disabled}
        ?sttl=${this.content.supportingTextTwoLine}
        ?interactive=${isInteractive}
        ?multiline=${this.content.headline && this.content.supportingText}
        ?divider=${this.content.divider}
        @click=${this.content.onClick}
        @dblclick=${this.content.onDblClick}
      >${this.renderBody()}</${tag}>
    `;
  }
  protected renderBody() {
    if (!this.content) return nothing;

    return html`
      <div class="flex gap-4 py-3 px-4">
        <div class="empty:hidden flex items-center group-[[sttl]]:items-start shrink-0">
          ${this.renderSlot('leading')}
        </div>

        <div class="flex flex-col min-h-8 grow justify-center group-[[multiline]]:min-h-12">
          <p class="text-onSurface text-bodyLarge text-start line-clamp-1">${this.content.headline}</p>
          <p class="text-onSurfaceVariant text-bodyMedium line-clamp-1 text-start group-[[sttl]]:line-clamp-2">
            ${this.content.supportingText}
          </p>
        </div>

        <div class="empty:hidden flex justify-center items-center shrink-0 gap-4">
          ${when(
            this.content.trailingSupportingText,
            () => html`
              <p class="text-onSurfaceVariant text-labelSmall">
                ${this.renderItemTrailingSupportingText()}
              </p>
            `,
          )}
          ${this.renderSlot('trailing')}
        </div>
      </div>

      ${when(this.content.divider, () =>
        divider({
          insetStart: !!this.content?.leading,
          insetEnd: this.content?.trailing ? '1.5rem' : undefined,
        }),
      )}
    `;
  }
  protected renderSlot(slotName: 'trailing' | 'leading'): RenderResult {
    const content = this.content?.[slotName];

    if (!this.content || !content) return nothing;

    switch (content.type) {
      case 'avatar:character':
        return html`
          <div
            class="bg-tertiaryContainer text-onTertiaryContainer uppercase size-10 flex items-center justify-center text-bodyLarge rounded-full"
          >
            ${content.character}
          </div>
        `;
      case 'avatar:image':
        return nothing;
      case 'image': {
        const image = new Image();
        const lazyLoadImage = new Image();

        lazyLoadImage.addEventListener(
          'load',
          () => {
            image.src = lazyLoadImage.src;

            lazyLoadImage.remove();
          },
          {once: true},
        );

        image.src = content.placeholder;
        image.className = 'size-14 rounded elevation-1';
        image.alt = this.content.headline.toString() ?? '';

        lazyLoadImage.src = content.source;

        return html`${image}`;
      }
      case 'icon':
        return icon(content);
      case 'icon-button':
        return iconButton(content);
      case 'template':
        return content.template;
    }
  }
  protected renderItemTrailingSupportingText(): RenderResult {
    if (!this.content || !this.content.trailingSupportingText) return nothing;

    switch (this.content.trailingSupportingText.type) {
      case 'string':
        return this.content.trailingSupportingText.value;
      case 'number': {
        if (!numberUtils.is(this.content.trailingSupportingText.value))
          return this.content.trailingSupportingText.value;

        const valueAsNumber = Number(this.content.trailingSupportingText.value);
        const value = Math.min(valueAsNumber, this.content.trailingSupportingText.maximum);
        const valuePrefix = valueAsNumber > this.content.trailingSupportingText.maximum ? '+' : '';

        return value.toLocaleString() + valuePrefix;
      }
    }
  }
}

export const gecutItem = directive(GecutItemDirective);
