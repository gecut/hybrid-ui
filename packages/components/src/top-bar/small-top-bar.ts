import {html, nothing} from 'lit/html.js';

import {endIconListTemplate} from './_end-icon-list.js';
import {gecutIconButton} from '../icon-button/icon-button.js';

import type {TopBarContent} from './_type.js';

export const gecutSmallTopBar = (content: TopBarContent) => html`
  <header class="gecut-top-bar small">
    <div class="gecut-top-bar-box">
      <div>${content.startIcon ? gecutIconButton(content.startIcon) : nothing}</div>

      <div class="gecut-top-bar-title">
        <h1>${typeof content.title === 'string' ? content.title : gecutContext(content.title)}</h1>
      </div>

      <div>${endIconListTemplate(content.endIconList)}</div>
    </div>
  </header>
`;
