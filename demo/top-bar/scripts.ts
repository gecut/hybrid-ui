/* eslint-disable max-len */
import {gecutSmallTopBar} from '@gecut/components';
import {map} from 'lit/directives/map.js';
import {range} from 'lit/directives/range.js';
import {html, render} from 'lit/html.js';

render(
  html`
    ${gecutSmallTopBar({
      startIcon: {
        svg: '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><path fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="32" d="M368 368L144 144m224 0L144 368"/></svg>',
      },
      endIconList: [
        {
          element: 'button',
          type: 'text',
          label: 'Save',
        },
      ],
      title: 'Gecut Top Bar',
    })}
    <main class="has-top-bar px-4">
      ${map(
        range(window.innerHeight / 10),
        (i) => html`<p class="text-bodyMedium text-onSurfaceVariant">Random Content: ${i}</p>`,
      )}
    </main>
  `,
  document.body,
);
