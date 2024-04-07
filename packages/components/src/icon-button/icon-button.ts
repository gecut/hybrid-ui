import {html} from 'lit/html.js';

import {icon, type IconContent} from '../icon/icon.js';

export interface IconButtonContent extends IconContent {
  disabled?: boolean;

  onClick(event: MouseEvent): void;
}

export const iconButton = (content: IconButtonContent) => html`
  <button
    @click=${content.onClick}
    class="text-onSurface focus-ring m-1 flex h-10 w-10 items-center justify-center
             rounded-full hover:stateHover-onSurface active:stateActive-onSurface"
  >
    ${icon(content)}
  </button>
`;
