/* eslint-disable max-len */
import {GecutDirective} from '@gecut/lit-helper/directives/directive.js';
import {numberUtils} from '@gecut/utilities/data-types/number.js';
import {directive, type PartInfo} from 'lit/directive.js';
import {classMap} from 'lit/directives/class-map.js';
import {ifDefined} from 'lit/directives/if-defined.js';
import {when} from 'lit/directives/when.js';
import {html, noChange, nothing} from 'lit/html.js';
import {literal, html as staticHtml} from 'lit/static-html.js';

import {divider, icon, gecutIconButton} from '../components';
import {gecutEFO} from '../internal/events-handler';

import type {IconButtonContent, IconContent} from '../components';
import type {EventsObject} from '../internal/events-handler';
import type {RenderResult} from '@gecut/types';
import type {ClassInfo} from 'lit/directives/class-map.js';
import type {TemplateResult} from 'lit/html.js';
import type {StaticValue} from 'lit/static-html.js';

export interface ItemImageSlotContent {
  placeholder: string;
  source: string;
}

export type HtmlString = string | TemplateResult;
export type ItemSlutContent =
  | {
    element: 'avatar:character';
    character: string;
  }
  | (ItemImageSlotContent & {
    element: 'avatar:image';
  })
  | (ItemImageSlotContent & {
    element: 'image';
  })
  | {element: 'template'; template: TemplateResult}
  | (IconContent & {element: 'icon'})
  | (IconButtonContent & {element: 'icon-button'});

export interface ItemContent {
  headline: HtmlString;
  overline?: HtmlString;
  supportingText?: HtmlString;
  trailingSupportingText?: {type: 'string'; value: string} | {type: 'number'; value: number | string; maximum: number};

  supportingTextTwoLine?: boolean;

  href?: string;
  target?: '_blank' | '_parent' | '_self' | '_top';

  events?: EventsObject;

  disabled?: boolean;
  divider?: boolean;

  leading?: ItemSlutContent;
  trailing?: ItemSlutContent;
}

export class GecutItemDirective extends GecutDirective {
  constructor(partInfo: PartInfo) {
    super(partInfo, 'gecut-list-item');
  }

  protected content?: ItemContent;
  protected type: 'link' | 'text' | 'button' = 'text';

  render(content?: ItemContent): unknown {
    this.log.methodArgs?.('render', content);

    if (content === undefined) return noChange;

    this.content = content;

    if (content.events) this.type = 'button';
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
        class=${classMap(this.getRenderClasses())}
        tabindex="${this.content.disabled || !isInteractive ? -1 : 0}"
        role="listitem"
        href=${ifDefined(this.content.href)}
        target=${ifDefined(this.content.target)}
        ?disabled=${this.content.disabled}
        ${gecutEFO(this.content.events)}
      >${this.renderBody()}</${tag}>
    `;
  }
  protected renderBody() {
    if (!this.content) return nothing;

    return html`
      <div class="gecut-list-item-body">
        <div class="gecut-list-item-leading">${this.renderSlot('leading')}</div>

        <div class="gecut-list-item-content">
          <p class="gecut-list-item-headline">${this.content.headline}</p>
          <p class="gecut-list-item-supporting-text">${this.content.supportingText}</p>
        </div>

        <div class="gecut-list-item-trailing">
          ${when(
            this.content.trailingSupportingText,
            () => html`
              <p class="gecut-list-item-trailing-supporting-text">${this.renderItemTrailingSupportingText()}</p>
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

    switch (content.element) {
      case 'avatar:character':
        return html`<div class="gecut-list-item-slot-avatar-character">${content.character}</div>`;
      case 'avatar:image':
        return nothing;
      case 'image': {
        // TODO: Write a Image LazyLoad Component

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

        return html`<div class="gecut-list-item-slot-thumbnail">${image}</div>`;
      }
      case 'icon':
        return icon(content);
      case 'icon-button':
        return gecutIconButton(content);
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

  protected override getRenderClasses(): ClassInfo {
    if (!this.content) return super.getRenderClasses();

    return {
      ...super.getRenderClasses(),

      'supporting-text-two-line': this.content.supportingTextTwoLine ?? false,
      interactive: this.type !== 'text',
      multiline: (!!this.content.headline && !!this.content.supportingText) ?? false,
      divider: this.content.divider ?? false,
    };
  }
}

export const gecutItem = directive(GecutItemDirective);
