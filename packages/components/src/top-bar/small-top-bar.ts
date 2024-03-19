import {classMap} from 'lit/directives/class-map.js';
import {html, nothing} from 'lit/html.js';

import {endIconListTemplate} from './_end-icon-list.js';
import {iconButton} from '../icon-button/icon-button.js';

import type {TopBarContent} from './_type.js';

export const gecutSmallTopBar = (content: TopBarContent, scroll = false) =>
  html`<header
    class="z-sticky flex h-16 shrink-0 grow-0 select-none items-center
           bg-surface [&.scroll]:bg-surfaceContainer ${classMap({scroll})}"
  >
    ${content.startIcon ? iconButton(content.startIcon) : nothing}

    <div class="lead me-auto overflow-clip whitespace-nowrap px-1 text-center text-titleLarge text-onSurface">
      ${content.title}
    </div>

    ${endIconListTemplate(content.endIconList)}
  </header>`;
