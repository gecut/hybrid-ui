/* eslint-disable max-len */
import {gecutItem} from '@gecut/components';
import {map} from 'lit/directives/map.js';
import {range} from 'lit/directives/range.js';
import {html, render} from 'lit/html.js';

import placeHolderImage from '../assets/placeholder.webp';

render(
  html`
    <main role="main">
      <div class="flex flex-col">
        ${map(range(3), (i) =>
          gecutItem({
            leading: {
              type: 'icon',
              svg: '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><g fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5"><path stroke-dasharray="20" stroke-dashoffset="20" d="M12 5C13.66 5 15 6.34 15 8C15 9.65685 13.6569 11 12 11C10.3431 11 9 9.65685 9 8C9 6.34315 10.3431 5 12 5z"><animate fill="freeze" attributeName="stroke-dashoffset" dur="0.6s" values="20;0"/></path><path stroke-dasharray="36" stroke-dashoffset="36" d="M12 14C16 14 19 16 19 17V19H5V17C5 16 8 14 12 14z" opacity="0"><set attributeName="opacity" begin="0.75s" to="1"/><animate fill="freeze" attributeName="stroke-dashoffset" begin="0.75s" dur="0.6s" values="36;0"/></path></g></svg>',
            },
            headline: 'List Item: ' + i,
          }),
        )}
        ${map(range(3), (i) =>
          gecutItem({
            onClick: console.log,
            leading: {type: 'avatar:character', character: 'C'},
            headline: 'List Item: ' + i,
            supportingText:
              'Hybrid UI is a cutting-edge web front-end framework that empowers developers to create high-performance, memory-safe, and visually stunning applications. It provides a comprehensive set of tools and features to streamline development and deliver exceptional user experiences.',
          }),
        )}
        ${map(range(3), (i) =>
          gecutItem({
            headline: 'List Item: ' + i,
            leading: {
              type: 'icon',
              svg: '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><g fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5"><path stroke-dasharray="20" stroke-dashoffset="20" d="M12 5C13.66 5 15 6.34 15 8C15 9.65685 13.6569 11 12 11C10.3431 11 9 9.65685 9 8C9 6.34315 10.3431 5 12 5z"><animate fill="freeze" attributeName="stroke-dashoffset" dur="0.6s" values="20;0"/></path><path stroke-dasharray="36" stroke-dashoffset="36" d="M12 14C16 14 19 16 19 17V19H5V17C5 16 8 14 12 14z" opacity="0"><set attributeName="opacity" begin="0.75s" to="1"/><animate fill="freeze" attributeName="stroke-dashoffset" begin="0.75s" dur="0.6s" values="36;0"/></path></g></svg>',
            },
            supportingText:
              'Hybrid UI is a cutting-edge web front-end framework that empowers developers to create high-performance, memory-safe, and visually stunning applications. It provides a comprehensive set of tools and features to streamline development and deliver exceptional user experiences.',
            supportingTextTwoLine: true,
            trailingSupportingText: {
              type: 'number',
              value: '1000',
              maximum: 99,
            },
          }),
        )}
        ${map(range(10), (i) =>
          gecutItem({
            href: '#' + i,
            leading: {type: 'image', placeholder: placeHolderImage, source: 'https://picsum.photos/' + (i + 1) * 100},
            headline: 'List Item: ' + i,
            divider: true,
            trailing: {
              type: 'icon-button',
              onClick: console.log,
              svg: '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path fill="currentColor" d="M10.5 16.3q-.2 0-.35-.137T10 15.8V8.2q0-.225.15-.362t.35-.138q.05 0 .35.15l3.625 3.625q.125.125.175.25t.05.275q0 .15-.05.275t-.175.25L10.85 16.15q-.075.075-.162.113t-.188.037"/></svg>',
            },
            supportingText:
              'Hybrid UI is a cutting-edge web front-end framework that empowers developers to create high-performance, memory-safe, and visually stunning applications. It provides a comprehensive set of tools and features to streamline development and deliver exceptional user experiences.',
          }),
        )}
      </div>
    </main>
  `,
  document.body,
);
