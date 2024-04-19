/* eslint-disable max-len */
import {gecutList} from '@gecut/components';
import {range} from 'lit/directives/range.js';
import {html, render} from 'lit/html.js';

import placeHolderImage from '../public/placeholder.webp';

render(
  html`
    <main role="main">
      <div class="flex flex-col p-4 gap-4 max-h-screen">
        ${gecutList(
          {
            box: 'filled',
          },
          range(2),
          (i) => ({
            leading: {
              element: 'icon',
              svg: '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><g fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5"><path stroke-dasharray="20" stroke-dashoffset="20" d="M12 5C13.66 5 15 6.34 15 8C15 9.65685 13.6569 11 12 11C10.3431 11 9 9.65685 9 8C9 6.34315 10.3431 5 12 5z"><animate fill="freeze" attributeName="stroke-dashoffset" dur="0.6s" values="20;0"/></path><path stroke-dasharray="36" stroke-dashoffset="36" d="M12 14C16 14 19 16 19 17V19H5V17C5 16 8 14 12 14z" opacity="0"><set attributeName="opacity" begin="0.75s" to="1"/><animate fill="freeze" attributeName="stroke-dashoffset" begin="0.75s" dur="0.6s" values="36;0"/></path></g></svg>',
            },
            headline: 'List Item: ' + i,
          }),
        )}
        ${gecutList(
          {
            box: 'filled',
          },
          range(3),
          (i) => ({
            leading: {element: 'avatar:character', character: 'C'},
            headline: 'List Item: ' + i,
            events: {click: console.log},
            supportingText:
              'Hybrid UI is a cutting-edge web front-end framework that empowers developers to create high-performance, memory-safe, and visually stunning applications. It provides a comprehensive set of tools and features to streamline development and deliver exceptional user experiences.',
          }),
        )}
        ${gecutList(
          {
            box: 'filled',
            scrollable: true,
            fade: 'auto',
          },
          range(10),
          (i) => ({
            href: '#' + i,
            leading: {
              element: 'image',
              placeholder: placeHolderImage,
              source: 'https://picsum.photos/' + (i + 100),
            },
            headline: 'List Item: ' + i,
            divider: true,
            supportingText:
              'Hybrid UI is a cutting-edge web front-end framework that empowers developers to create high-performance, memory-safe, and visually stunning applications. It provides a comprehensive set of tools and features to streamline development and deliver exceptional user experiences.',
          }),
        )}
      </div>
    </main>
  `,
  document.body,
);
