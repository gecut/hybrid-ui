/* eslint-disable max-len */
import {classMap} from 'lit/directives/class-map.js';
import {map} from 'lit/directives/map.js';
import {html, render} from 'lit/html.js';

interface Demo {
  title: string;
  href: string;

  align?: 'center' | 'bottom' | 'top';
}

const container = document.getElementById('container');
const demos: Demo[] = [
  {
    title: 'Dialog',
    href: '/dialog/',
    align: 'center',
  },
  {
    title: 'Top App Bar',
    href: '/top-bar/',
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
          class="flex flex-col p-4 !m-0 group card-elevated dark:card-filled-selectable w-full hover:elevation-5 transition-shadow duration-500 dark:!shadow-none"
        >
          <div class="aspect-w-4 aspect-h-3 w-full overflow-hidden rounded-md relative">
            <img
              src="${demo.href}preview.png"
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
