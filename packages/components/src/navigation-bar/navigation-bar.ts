/* eslint-disable max-len */
import {GecutDirective} from '@gecut/lit-helper/directives/directive.js';
import {mapObject} from '@gecut/lit-helper/utilities/map-object.js';
import {directive, type PartInfo} from 'lit/directive.js';
import {ifDefined} from 'lit/directives/if-defined.js';
import {when} from 'lit/directives/when.js';
import {html, noChange} from 'lit/html.js';

import {icon} from '../icon/icon.js';

import type {IconContent} from '../icon/icon.js';

export type NavigationItemContent = {
  icon: IconContent;
  badge?: string;
} & ({onClick(): void} | {path: string}) &
({label?: string} | {labelKey?: string});

export interface NavigationBarContent {
  selected: string;
  items: Record<string, NavigationItemContent>;
}

export class GecutNavigationBarDirective extends GecutDirective {
  constructor(partInfo: PartInfo) {
    super(partInfo, 'gecut-navigation-bar');
  }

  render(content?: NavigationBarContent): unknown {
    this.log.methodArgs?.('render', content);

    if (content === undefined) return noChange;

    return html`
      <footer
        class="flex justify-center w-full shrink-0 grow-0 bg-surfaceContainer elevation-6 md:bg-transparent md:elevation-0"
      >
        <nav
          role="tablist"
          class="flex h-20 w-full max-w-screen-medium cursor-pointer select-none
          items-stretch text-labelMedium text-onSurfaceVariant md:bg-surfaceContainer border-0 border-surfaceContainerHighest md:elevation-4 dark:elevation-0 dark:md:border-2 md:rounded-2xl md:mb-5"
        >
          ${this._renderNavItems(content)}
        </nav>
      </footer>
    `;
  }

  protected _renderNavItems(content: NavigationBarContent): unknown {
    const navItemList = mapObject(this, content.items, (item, name) => {
      const isLink = 'path' in item;
      const href = isLink ? item.path : undefined;
      const selected = isLink ? content.selected === item.path : false;
      const onClick = isLink ? () => undefined : item.onClick.bind(item);

      const _label = 'label' in item ? item.label : undefined;
      const _labelKey = 'labelKey' in item ? item.labelKey : undefined;

      const label = _label ?? _labelKey ?? undefined;

      return html`
        <a
          role="tab"
          aria-label=${name}
          aria-selected=${selected}
          href=${ifDefined(href)}
          @click=${onClick}
          @keyup=${this.onEnterTab(onClick)}
          tabindex="0"
          class="group flex grow flex-col items-center justify-center hover:text-onSurface aria-selected:pointer-events-none"
        >
          <div
            class="flex relative rounded-xl px-5 py-1 border-2 border-transparent group-hover:stateHover-onSurfaceVariant group-hover:border-surfaceContainerHighest group-active:border-outline group-active:stateActive-onSurfaceVariant group-focus:elevation-0 group-focus:border-outline group-focus:stateActive-onSurfaceVariant group-active:elevation-0 group-aria-selected:bg-secondaryContainer group-aria-selected:text-onSecondaryContainer group-aria-selected:elevation-2 dark:group-aria-selected:elevation-0 dark:group-aria-selected:border-secondary [&>.md-icon]:block [&>.md-icon]:h-6 [&>.md-icon]:w-6"
          >
            ${icon(item.icon)}
            ${when(
              item.badge,
              () => html`
                <span
                  class="flex absolute -end-1.5 -top-1.5 items-center justify-center rounded-full bg-error leading-4 min-w-5 h-5 px-0.5 py-0.5 text-[12px] font-bold text-onError elevation-3"
                >
                  ${item.badge}
                </span>
              `,
            )}
          </div>

          ${when(label, () => html` <div class="pt-1 group-aria-selected:text-onSurface">${label}</div> `)}
        </a>
      `;
    });

    return navItemList;
  }

  // eslint-disable-next-line @typescript-eslint/ban-types
  private onEnterTab(func: Function) {
    return (event: KeyboardEvent) => {
      if (event.key === 'Enter') {
        func.call(this);
      }
    };
  }
}

export const gecutNavigationBar = directive(GecutNavigationBarDirective);
