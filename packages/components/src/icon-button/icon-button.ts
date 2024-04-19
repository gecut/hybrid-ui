import {GecutDirective} from '@gecut/lit-helper/directives/directive.js';
import {directive, type PartInfo} from 'lit/directive.js';
import {classMap} from 'lit/directives/class-map.js';
import {ifDefined} from 'lit/directives/if-defined.js';
import {html, noChange, nothing} from 'lit/html.js';
import {literal, html as staticHtml} from 'lit/static-html.js';

import {icon, type IconContent} from '../icon/icon.js';
import {gecutEFO} from '../internal/events-handler.js';

import type {EventsObject} from '../internal/events-handler.js';
import type {ClassInfo} from 'lit/directives/class-map.js';
import type {StaticValue} from 'lit/static-html.js';

/**
 * Represents the content of an icon button.
 *
 * @interface IconButtonContent
 * @extends IconContent
 */
export interface IconButtonContent extends IconContent {
  /**
   * The type of the icon button.
   *
   * A 'normal' button has a transparent background.
   * A 'filled' button has a solid background color.
   * A 'filledTonal' button has a tonal background color.
   * An 'outlined' button has a bordered appearance.
   *
   * @type {'normal' | 'filled' | 'filledTonal' | 'outlined'}
   * @default 'normal'
   */
  type?: 'normal' | 'filled' | 'filledTonal' | 'outlined';

  /**
   * The URL that the button links to.
   *
   * When provided, the button will be rendered as an `<a>` tag instead of a `<button>`.
   *
   * @type {string}
   */
  href?: string;

  /**
   * The target attribute for the button's link.
   *
   * Specifies where to open the linked document.
   *
   * @type {'_blank' | '_parent' | '_self' | '_top'}
   */
  target?: '_blank' | '_parent' | '_self' | '_top';

  /**
   * An object containing event handlers for the button.
   *
   * @type {EventsObject}
   */
  events?: EventsObject;

  /**
   * An alternative icon to display when the button is in a selected state.
   *
   * @type {IconContent}
   */
  selectedIcon?: IconContent;

  /**
   * The name of the button, used for form submissions.
   *
   * @type {string}
   */
  name?: string;

  /**
   * The title of the button, shown as a tooltip.
   *
   * @type {string}
   */
  title?: string;

  /**
   * An icon to display as a loader while the button is in a loading state.
   *
   * @type {IconContent}
   */
  loader?: IconContent;

  /**
   * Whether the button is disabled and cannot be clicked.
   *
   * @type {boolean}
   */
  disabled?: boolean;

  /**
   * Whether the button is in a loading state.
   *
   * @type {boolean}
   */
  loading?: boolean;

  /**
   * Whether the button is a toggle button.
   *
   * @type {boolean}
   */
  toggle?: boolean;

  /**
   * Whether the toggle button is in a checked state.
   *
   * @type {boolean}
   */
  checked?: boolean;
}

export class IconButtonDirective extends GecutDirective {
  constructor(partInfo: PartInfo) {
    super(partInfo, 'gecut-icon-button');
  }
  protected content?: IconButtonContent;
  protected type: 'link' | 'button' | 'toggle' = 'button';

  render(content?: IconButtonContent): unknown {
    this.log.methodArgs?.('render', content);

    if (content === undefined) return noChange;

    this.content = content;

    if (this.content.href) this.type = 'link';
    else if (this.content.toggle) this.type = 'toggle';

    return this.renderButton();
  }

  protected renderButton() {
    if (!this.content) return nothing;

    this.log.method?.('renderButton');

    let tag: StaticValue;

    switch (this.type) {
      case 'link':
        tag = literal`a`;
        break;
      case 'button':
        tag = literal`button`;
        break;
      case 'toggle':
        tag = literal`label`;
        break;
    }

    return staticHtml`
      <${tag}
        class=${classMap(this.getRenderClasses())}
        role=${this.type === 'toggle' ? 'checkbox' : 'button'}
        href=${ifDefined(this.content.href)}
        target=${ifDefined(this.content.target)}
        title=${ifDefined(this.content.title)}
        tabindex="${this.content.disabled ? -1 : 0}"
        ?disabled=${this.content.disabled ?? false}
        ?loading=${this.content.loading ?? false}
        @keypress=${(event: KeyboardEvent) => {
          if (this.type !== 'toggle') return;

          if (event.key === 'Enter' || event.key === ' ') {
            const target = (event.currentTarget || event.target) as HTMLLabelElement | null;
            const input = target?.querySelector<HTMLInputElement>('input[type="checkbox"]');

            if (input) {
              input.checked = !input.checked;
            }
          }
        }}
        ${gecutEFO(this.content.events)}
      >${this.renderCheckbox()}${this.renderLoader()}${this.renderIcon()}</${tag}>
    `;
  }
  protected renderCheckbox(): unknown {
    if (!this.content || this.type !== 'toggle') return nothing;

    this.log.method?.('renderCheckbox');

    return html`<input type="checkbox" name=${ifDefined(this.content.name)} ?checked=${this.content.checked} hidden />`;
  }
  protected renderIcon(): unknown {
    if (!this.content) return nothing;

    this.log.method?.('renderIcon');

    if (!this.content.selectedIcon) return html`<div class="gecut-icon-button-icon">${icon(this.content)}</div>`;

    return html`
      <div class="gecut-icon-button-icon gecut-icon-button-unselected-icon">${icon(this.content)}</div>

      <div class="gecut-icon-button-icon gecut-icon-button-selected-icon">${icon(this.content!.selectedIcon!)}</div>
    `;
  }
  protected renderLoader(): unknown {
    if (!this.content) return nothing;

    this.log.method?.('renderLoader');

    return html`
      <div class="gecut-icon-button-loader">
        ${icon(
          this.content.loader ?? {
            // eslint-disable-next-line max-len
            svg: '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><g stroke="currentColor"><circle cx="12" cy="12" r="9.5" fill="none" stroke-linecap="round" stroke-width="2.5"><animate attributeName="stroke-dasharray" calcMode="spline" dur="1.5s" keySplines="0.42,0,0.58,1;0.42,0,0.58,1;0.42,0,0.58,1" keyTimes="0;0.475;0.95;1" repeatCount="indefinite" values="0 150;42 150;42 150;42 150"/><animate attributeName="stroke-dashoffset" calcMode="spline" dur="1.5s" keySplines="0.42,0,0.58,1;0.42,0,0.58,1;0.42,0,0.58,1" keyTimes="0;0.475;0.95;1" repeatCount="indefinite" values="0;-16;-59;-59"/></circle><animateTransform attributeName="transform" dur="2s" repeatCount="indefinite" type="rotate" values="0 12 12;360 12 12"/></g></svg>',
          },
        )}
      </div>
    `;
  }

  protected override getRenderClasses(): ClassInfo {
    if (!this.content) return super.getRenderClasses();

    this.content.type ??= 'normal';

    return {
      ...super.getRenderClasses(),

      toggle: this.type === 'toggle',
      filled: this.content.type === 'filled',
      'filled-tonal': this.content.type === 'filledTonal',
      outlined: this.content.type === 'outlined',
      normal: this.content.type === 'normal',
    };
  }
}

export const gecutIconButton = directive(IconButtonDirective);
