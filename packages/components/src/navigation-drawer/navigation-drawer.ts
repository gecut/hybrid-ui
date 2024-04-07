/* eslint-disable max-len */
import {GecutDirective} from '@gecut/lit-helper/directives/directive.js';
import {mapObject} from '@gecut/lit-helper/utilities/map-object.js';
import {map} from '@gecut/lit-helper/utilities/map.js';
import {directive, type PartInfo} from 'lit/directive.js';
import {ifDefined} from 'lit/directives/if-defined.js';
import {when} from 'lit/directives/when.js';
import {html, noChange} from 'lit/html.js';

import {divider} from '../divider/divider.js';
import {icon} from '../icon/icon.js';

import type {NavigationItemContent} from '../navigation-bar/navigation-bar.js';

export interface NavigationDrawerGroupContent {
  title?: string;
  divider?: boolean;
  paths: Record<string, NavigationItemContent>;
}

export interface NavigationDrawerContent {
  selected: string;
  open?: boolean;
  groups: NavigationDrawerGroupContent[];
}

export class GecutNavigationDrawerDirective extends GecutDirective {
  constructor(partInfo: PartInfo) {
    super(partInfo, 'gecut-navigation-drawer');
  }

  render(content?: NavigationDrawerContent): unknown {
    this.log.method?.('render');

    if (content === undefined) return noChange;

    const openAttr = content.open ? 'opened' : '';

    return html`
      <aside
        id="navigationDrawer"
        class="absolute bottom-0 start-0 top-0 z-modal w-[22.5rem] max-w-[88vw] translate-x-[-105%] rtl:translate-x-[105%] transform-gpu overflow-clip rounded-e-3xl md:rounded-3xl md:my-3 bg-surfaceContainerHigh transition-transform duration-300 ease-in will-change-transform elevation-1 [&.opened]:translate-x-0 [&.opened]:ease-out [&.opened]:shadow-[0_0_100vw_100vw_rgba(0,0,0,0.3)] md:[&.opened]:-translate-x-2 md:[&.opened]:elevation-3 border-0 border-surfaceContainerHighest dark:md:border-2 md:my-5 ${openAttr}"
      >
        <nav class="flex h-full flex-col bg-surfaceContainerLow px-3 py-3 elevation-1">
          ${this._renderGroups(content)}
        </nav>
      </aside>
    `;
  }

  protected _renderGroups(content: NavigationDrawerContent): unknown {
    return map(
      this,
      content.groups,
      (groupContent) => html`
        <div role="tablist" class="text-labelLarge text-onSurfaceVariant">
          ${when(
            groupContent.title,
            () => html` <h2 class="mx-4 pb-3 pt-5 text-titleSmall text-onSurfaceVariant">${groupContent.title}</h2> `,
          )}
          ${this._renderItems(groupContent, content.selected)}
          ${when(groupContent.divider, () => divider({gapTop: true}))}
        </div>
      `,
    );
  }

  protected _renderItems(content: NavigationDrawerGroupContent, _selected: string): unknown {
    return mapObject(this, content.paths, (item, name) => {
      const isLink = 'path' in item;
      const href = isLink ? item.path : undefined;
      const selected = isLink ? _selected === item.path : false;
      const onClick = isLink ? () => undefined : item.onClick.bind(item);

      const _label = 'label' in item ? item.label : undefined;
      const _labelKey = 'labelKey' in item ? item.labelKey : undefined;

      const label = _label ?? _labelKey ?? undefined;

      return html`
        <a
          role="tab"
          href=${ifDefined(href)}
          aria-label=${name}
          aria-selected=${selected}
          @click=${onClick}
          @keyup=${this.onEnterTab(onClick)}
          tabindex="0"
          class="flex h-14 cursor-pointer select-none flex-nowrap items-center rounded-full px-3 hover:bg-secondaryContainer hover:text-onSecondaryContainer hover:stateHover-onSecondaryContainer focus-ring [&>.gecut-icon]:mx-1 [&>.gecut-icon]:h-6 [&>.gecut-icon]:w-6 aria-selected:stateActive-onSecondaryContainer aria-selected:text-onSecondaryContainer"
        >
          ${icon(item.icon)} ${when(label, () => html`<div class="mx-2 grow">${label}</div>`)}
          ${when(item.badge != null, () => html`<div class="me-3">${item.badge}</div>`)}
        </a>
      `;
    });
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

export const gecutNavigationDrawer = directive(GecutNavigationDrawerDirective);
