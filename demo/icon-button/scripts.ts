/* eslint-disable max-len */
import {gecutIconButton} from '@gecut/components';
import {map} from '@gecut/lit-helper';
import {html, render} from 'lit/html.js';

import type {IconButtonContent} from '@gecut/components';
import type {MaybePromise} from '@gecut/types';

const iconButtonTypes: NonNullable<IconButtonContent['type']>[] = ['filled', 'filledTonal', 'outlined', 'normal'];
const iconButtonsContents: Record<
  NonNullable<IconButtonContent['type']>,
  {iconSVG: MaybePromise<string>; name?: string; hint?: string; loaderSVG?: string} & Partial<IconButtonContent>
> = {
  normal: {
    name: 'normal',
    href: document.URL,
    target: '_blank',
    hint: 'Links do not have a disabled state',
    iconSVG:
      '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><g fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5"><path stroke-dasharray="42" stroke-dashoffset="42" d="M11 5H5V19H19V13"><animate fill="freeze" attributeName="stroke-dashoffset" dur="0.9s" values="42;0"/></path><path stroke-dasharray="12" stroke-dashoffset="12" d="M13 11L20 4"><animate fill="freeze" attributeName="stroke-dashoffset" begin="0.9s" dur="0.45s" values="12;0"/></path><path stroke-dasharray="8" stroke-dashoffset="8" d="M21 3H15M21 3V9"><animate fill="freeze" attributeName="stroke-dashoffset" begin="1.35s" dur="0.3s" values="8;0"/></path></g></svg>',
  },
  filled: {
    name: 'filled',
    selectedIcon: {
      svg: '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><mask id="lineMdBuyMeACoffeeFilled0"><path fill="#fff" d="M5 6C5 4 7 6 11.5 6C16 6 19 4 19 6L19 7C19 8.5 17 9 12.5 9C8 9 5 9 5 7L5 6Z"/></mask><mask id="lineMdBuyMeACoffeeFilled1"><path fill="#fff" d="M10.125 18.15C10.04 17.29 9.4 11.98 9.4 11.98C9.4 11.98 11.34 12.31 12.5 11.73C13.66 11.16 14.98 11 14.98 11C14.98 11 14.4 17.96 14.35 18.46C14.3 18.96 13.45 19.3 12.95 19.3L11.23 19.3C10.73 19.3 10.21 19 10.125 18.15Z"/></mask><g fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5"><path stroke-dasharray="32" stroke-dashoffset="32" d="M7.5 10.5C7.5 10.5 8.33 17.43 8.5 19C8.67 20.57 10 21 11 21L13 21C14.5 21 15.875 19.86 16 19C16.125 18.14 17 7 17 7"><animate fill="freeze" attributeName="stroke-dashoffset" dur="0.6s" values="32;0"/></path><path stroke-dasharray="12" stroke-dashoffset="12" d="M16.5 6C16.5 3.5 14 3 12 3C10 3 9.1 3.43 8 4"><animate fill="freeze" attributeName="stroke-dashoffset" begin="1.2s" dur="0.3s" values="12;24"/></path></g><rect width="16" height="5" x="20" y="4" fill="currentColor" mask="url(#lineMdBuyMeACoffeeFilled0)"><animate fill="freeze" attributeName="x" begin="0.6s" dur="0.6s" values="20;4"/></rect><rect width="8" height="10" x="8" y="20" fill="currentColor" mask="url(#lineMdBuyMeACoffeeFilled1)"><animate fill="freeze" attributeName="y" begin="1.5s" dur="0.6s" values="20;10"/></rect></svg>',
    },
    loaderSVG:
      '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><g fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5"><path fill="currentColor" fill-opacity="0" stroke-dasharray="48" stroke-dashoffset="48" d="M17 9v9a3 3 0 0 1-3 3H8a3 3 0 0 1-3-3V9z"><animate fill="freeze" attributeName="stroke-dashoffset" dur="0.9s" values="48;0"/><animate fill="freeze" attributeName="fill-opacity" begin="1.2s" dur="0.225s" values="0;0.5"/></path><path stroke-dasharray="14" stroke-dashoffset="14" d="M17 14H20C20.55 14 21 13.55 21 13V10C21 9.45 20.55 9 20 9H17"><animate fill="freeze" attributeName="stroke-dashoffset" begin="0.9s" dur="0.3s" values="14;28"/></path></g><mask id="lineMdCoffeeTwotoneLoop0"><path fill="none" stroke="#fff" stroke-width="1.5" d="M8 0c0 2-2 2-2 4s2 2 2 4-2 2-2 4 2 2 2 4M12 0c0 2-2 2-2 4s2 2 2 4-2 2-2 4 2 2 2 4M16 0c0 2-2 2-2 4s2 2 2 4-2 2-2 4 2 2 2 4"><animateMotion calcMode="linear" dur="4.5s" path="M0 0v-8" repeatCount="indefinite"/></path></mask><rect width="24" height="0" y="7" fill="currentColor" mask="url(#lineMdCoffeeTwotoneLoop0)"><animate fill="freeze" attributeName="y" begin="1.2s" dur="0.9s" values="7;2"/><animate fill="freeze" attributeName="height" begin="1.2s" dur="0.9s" values="0;5"/></rect></svg>',
    iconSVG:
      '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><mask id="lineMdBuyMeACoffeeTwotone0"><path fill="#fff" d="M5 6C5 4 7 6 11.5 6C16 6 19 4 19 6L19 7C19 8.5 17 9 12.5 9C8 9 5 9 5 7L5 6Z"/></mask><mask id="lineMdBuyMeACoffeeTwotone1"><path fill="#fff" d="M10.125 18.15C10.04 17.29 9.4 11.98 9.4 11.98C9.4 11.98 11.34 12.31 12.5 11.73C13.66 11.16 14.98 11 14.98 11C14.98 11 14.4 17.96 14.35 18.46C14.3 18.96 13.45 19.3 12.95 19.3L11.23 19.3C10.73 19.3 10.21 19 10.125 18.15Z"/></mask><g fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5"><path stroke-dasharray="32" stroke-dashoffset="32" d="M7.5 10.5C7.5 10.5 8.33 17.43 8.5 19C8.67 20.57 10 21 11 21L13 21C14.5 21 15.875 19.86 16 19C16.125 18.14 17 7 17 7"><animate fill="freeze" attributeName="stroke-dashoffset" dur="0.8s" values="32;0"/></path><path stroke-dasharray="12" stroke-dashoffset="12" d="M16.5 6C16.5 3.5 14 3 12 3C10 3 9.1 3.43 8 4"><animate fill="freeze" attributeName="stroke-dashoffset" begin="1.6s" dur="0.4s" values="12;24"/></path></g><rect width="16" height="5" x="20" y="4" fill="currentColor" mask="url(#lineMdBuyMeACoffeeTwotone0)"><animate fill="freeze" attributeName="x" begin="0.8s" dur="0.8s" values="20;4"/></rect><rect width="8" height="10" x="8" y="20" fill="currentColor" fill-opacity="0.5" mask="url(#lineMdBuyMeACoffeeTwotone1)"><animate fill="freeze" attributeName="y" begin="2s" dur="0.8s" values="20;10"/></rect></svg>',
  },
  filledTonal: {
    name: 'filled tonal',
    loaderSVG:
      '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><g fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5"><path stroke-dasharray="14" stroke-dashoffset="14" d="M6 19h12"><animate fill="freeze" attributeName="stroke-dashoffset" begin="0.75s" dur="0.6s" values="14;0"/></path><path stroke-dasharray="18" stroke-dashoffset="18" d="M12 4 h2 v6 h2.5 L12 14.5M12 4 h-2 v6 h-2.5 L12 14.5"><animate fill="freeze" attributeName="stroke-dashoffset" dur="0.4s" values="18;0"/><animate attributeName="d" calcMode="linear" dur="2.25s" keyTimes="0;0.7;1" repeatCount="indefinite" values="M12 4 h2 v6 h2.5 L12 14.5M12 4 h-2 v6 h-2.5 L12 14.5;M12 4 h2 v3 h2.5 L12 11.5M12 4 h-2 v3 h-2.5 L12 11.5;M12 4 h2 v6 h2.5 L12 14.5M12 4 h-2 v6 h-2.5 L12 14.5"/></path></g></svg>',
    iconSVG:
      '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><g fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5"><path stroke-dasharray="14" stroke-dashoffset="14" d="M6 19h12"><animate fill="freeze" attributeName="stroke-dashoffset" begin="0.75s" dur="0.6s" values="14;0"/></path><path stroke-dasharray="18" stroke-dashoffset="18" d="M12 4 h2 v6 h2.5 L12 14.5M12 4 h-2 v6 h-2.5 L12 14.5"><animate fill="freeze" attributeName="stroke-dashoffset" dur="1s" values="18;0"/></path></g></svg>',
  },
  outlined: {
    name: 'outlined',
    iconSVG:
      '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><g fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5"><path stroke-dasharray="66" stroke-dashoffset="66" d="M12 3H8C5.23858 3 3 5.23858 3 8V16C3 18.7614 5.23858 21 8 21H16C18.7614 21 21 18.7614 21 16V8C21 5.23858 18.7614 3 16 3z"><animate fill="freeze" attributeName="stroke-dashoffset" dur="0.9s" values="66;132"/></path><path stroke-dasharray="26" stroke-dashoffset="26" d="M12 8C14.20914 8 16 9.79086 16 12C16 14.20914 14.20914 16 12 16C9.79086 16 8 14.2091 8 12C8 9.79086 9.79086 8 12 8"><animate fill="freeze" attributeName="stroke-dashoffset" begin="1.05s" dur="0.6s" values="26;0"/></path></g><circle cx="17" cy="7" r="1.5" fill="currentColor" fill-opacity="0"><animate fill="freeze" attributeName="fill-opacity" begin="1.65s" dur="0.6s" values="0;1"/></circle></svg>',
  },
};

render(
  html`
    <main class="p-4" role="main">
      <div class="flex flex-col p-4">
        ${map(this, iconButtonTypes, (type) => {
          const content = iconButtonsContents[type];

          return html`
            <h2 class="text-onSurfaceVariant text-titleLarge capitalize mb-2">${content.name}</h2>
            <p class="text-onSurface text-bodyMedium empty:hidden mb-2">${content.hint}</p>
            <div class="flex gap-4 mb-6">
              ${gecutIconButton({
                type,
                loader: content.loaderSVG
                  ? {
                      svg: content.loaderSVG!,
                    }
                  : undefined,
                svg: content.iconSVG,
                title: content.name,
                events: {
                  click: (event) => {
                    console.log(event);

                    const target = event.currentTarget as HTMLButtonElement;

                    target.setAttribute('loading', '');

                    setTimeout(() => {
                      target.removeAttribute('loading');
                    }, 5120);
                  },
                },

                ...content,
              })}
              ${gecutIconButton({
                type,
                loader: content.loaderSVG
                  ? {
                      svg: content.loaderSVG!,
                    }
                  : undefined,
                svg: content.iconSVG,

                title: content.name + ' disabled',

                ...content,

                disabled: true,
              })}
              ${gecutIconButton({
                type,
                loader: content.loaderSVG
                  ? {
                      svg: content.loaderSVG!,
                    }
                  : undefined,
                svg: content.iconSVG,

                title: content.name + ' loading',

                ...content,

                loading: true,
              })}
              ${gecutIconButton({
                type,
                svg: content.iconSVG,

                title: content.name + ' toggle',

                ...content,

                toggle: true,
              })}
            </div>
          `;
        })}
      </div>
    </main>
  `,
  document.body,
);
