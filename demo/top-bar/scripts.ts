/* eslint-disable max-len */
import {gecutSmallTopBar} from '@gecut/components';
import {html, render} from 'lit/html.js';

render(
  html`
    ${gecutSmallTopBar({
      startIcon: {
        onClick(event) {
          console.log(event);
        },
        svg: '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><path fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="32" d="M368 368L144 144m224 0L144 368"/></svg>',
      },
      endIconList: [
        {
          type: 'text',
          label: 'Save',
          onClick: console.log,
        },
      ],
      title: 'Gecut Top Bar',
    })}
    <main role="main">
      <h1 class="text-headlineMedium text-primary">h</h1>
    </main>
  `,
  document.body,
);
