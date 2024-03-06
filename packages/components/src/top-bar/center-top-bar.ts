import { html, nothing } from 'lit/html.js';

import { endIconListTemplate } from './_end-icon-list.js';
import {
  iconButton
} from '../icon-button/icon-button.js';


import type { TopBarContent } from './_type.js';

export const gecutCenterTopBar = (content: TopBarContent) =>
  html`<header
    class="scroll z-sticky flex h-16 shrink-0 grow-0 select-none items-center
           bg-surface px-4 [&.scroll]:bg-surfaceContainer"
  >
    ${content.startIcon ? iconButton(content.startIcon) : nothing}

    <div
      class="lead grow overflow-clip whitespace-nowrap px-1 text-center text-titleLarge text-onSurface"
    >
      ${content.title}
    </div>

    ${endIconListTemplate(content.endIconList)}
  </header>`;
