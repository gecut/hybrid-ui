/* eslint-disable max-len */
import {classMap} from 'lit/directives/class-map.js';
import {map} from 'lit/directives/map.js';
import {html, render} from 'lit/html.js';

import button from '../public/previews/button.png';
import cards from '../public/previews/cards.png';
import dialog from '../public/previews/dialog.png';
import iconButton from '../public/previews/icon-button.png';
import lists from '../public/previews/lists.png';
import topBar from '../public/previews/top-bar.png';

interface Demo {
  title: string;
  href: string;
  imageSource: string;

  align?: 'center' | 'bottom' | 'top';
}

const container = document.getElementById('container');
const demos: Demo[] = [
  {
    title: 'Commons Buttons',
    href: '/button/',
    imageSource: button,
  },
  {
    title: 'Dialog',
    href: '/dialog/',
    imageSource: dialog,
  },
  {
    title: 'Top App Bar',
    href: '/top-bar/',
    imageSource: topBar,
    align: 'top',
  },
  {
    title: 'Lists',
    href: '/lists/',
    imageSource: lists,
    align: 'top',
  },
  {
    title: 'Cards',
    href: '/cards/',
    imageSource: cards,
    align: 'top',
  },
  {
    title: 'Icon Button',
    href: '/icon-button/',
    imageSource: iconButton,
    align: 'top',
  },
];

if (container)
  render(
    map(
      demos,
      (demo) => html`
        <a
          href=${demo.href}
          class="flex flex-col p-4 !m-0 group gecut-card-elevated dark:gecut-card-filled-selectable w-full hover:elevation-5 transition-shadow duration-500 dark:!shadow-none"
        >
          <div class="aspect-w-4 aspect-h-3 w-full overflow-hidden rounded-md relative">
            <img
              src=${demo.imageSource}
              class="h-full w-full object-cover invert dark:invert-0 ${classMap({
                'object-center': demo.align === 'center' || !demo.align,
                'object-top': demo.align === 'top',
                'object-bottom': demo.align === 'bottom',
              })}"
            />

            <div
              class="absolute z-above inset-0 shadow-[inset_0px_4px_48px_0px_#0002] group-hover:shadow-[inset_0px_8px_16px_4px_#0004] transition-shadow duration-500 dark:!shadow-none"
            ></div>
          </div>
          <h2 class="text-onSurfaceVariant text-titleMedium mt-4">${demo.title}</h2>
        </a>
      `,
    ),
    container,
  );
