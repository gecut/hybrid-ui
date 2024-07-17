/* eslint-disable max-len */
import {gecutButton} from '@gecut/components';
import {map} from '@gecut/lit-helper';
import {html, render} from 'lit/html.js';

import type {ButtonContent} from '@gecut/components';

const buttonTypes: ButtonContent['type'][] = ['elevated', 'filled', 'filledTonal', 'outlined', 'text'];
const buttonsContents: Record<
  ButtonContent['type'],
  {name: string; iconSVG?: string; loaderSVG?: string} & Partial<ButtonContent>
> = {
  elevated: {
    name: 'Open In New Tag',
    href: document.URL,
    target: '_blank',
  },
  filled: {
    name: 'Buy me a coffee',
    loaderSVG:
      '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><g fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5"><path fill="currentColor" fill-opacity="0" stroke-dasharray="48" stroke-dashoffset="48" d="M17 9v9a3 3 0 0 1-3 3H8a3 3 0 0 1-3-3V9z"><animate fill="freeze" attributeName="stroke-dashoffset" dur="0.9s" values="48;0"/><animate fill="freeze" attributeName="fill-opacity" begin="1.2s" dur="0.225s" values="0;0.5"/></path><path stroke-dasharray="14" stroke-dashoffset="14" d="M17 14H20C20.55 14 21 13.55 21 13V10C21 9.45 20.55 9 20 9H17"><animate fill="freeze" attributeName="stroke-dashoffset" begin="0.9s" dur="0.3s" values="14;28"/></path></g><mask id="lineMdCoffeeTwotoneLoop0"><path fill="none" stroke="#fff" stroke-width="1.5" d="M8 0c0 2-2 2-2 4s2 2 2 4-2 2-2 4 2 2 2 4M12 0c0 2-2 2-2 4s2 2 2 4-2 2-2 4 2 2 2 4M16 0c0 2-2 2-2 4s2 2 2 4-2 2-2 4 2 2 2 4"><animateMotion calcMode="linear" dur="4.5s" path="M0 0v-8" repeatCount="indefinite"/></path></mask><rect width="24" height="0" y="7" fill="currentColor" mask="url(#lineMdCoffeeTwotoneLoop0)"><animate fill="freeze" attributeName="y" begin="1.2s" dur="0.9s" values="7;2"/><animate fill="freeze" attributeName="height" begin="1.2s" dur="0.9s" values="0;5"/></rect></svg>',
    iconSVG:
      '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><mask id="lineMdBuyMeACoffeeTwotone0"><path fill="#fff" d="M5 6C5 4 7 6 11.5 6C16 6 19 4 19 6L19 7C19 8.5 17 9 12.5 9C8 9 5 9 5 7L5 6Z"/></mask><mask id="lineMdBuyMeACoffeeTwotone1"><path fill="#fff" d="M10.125 18.15C10.04 17.29 9.4 11.98 9.4 11.98C9.4 11.98 11.34 12.31 12.5 11.73C13.66 11.16 14.98 11 14.98 11C14.98 11 14.4 17.96 14.35 18.46C14.3 18.96 13.45 19.3 12.95 19.3L11.23 19.3C10.73 19.3 10.21 19 10.125 18.15Z"/></mask><g fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5"><path stroke-dasharray="32" stroke-dashoffset="32" d="M7.5 10.5C7.5 10.5 8.33 17.43 8.5 19C8.67 20.57 10 21 11 21L13 21C14.5 21 15.875 19.86 16 19C16.125 18.14 17 7 17 7"><animate fill="freeze" attributeName="stroke-dashoffset" dur="0.8s" values="32;0"/></path><path stroke-dasharray="12" stroke-dashoffset="12" d="M16.5 6C16.5 3.5 14 3 12 3C10 3 9.1 3.43 8 4"><animate fill="freeze" attributeName="stroke-dashoffset" begin="1.6s" dur="0.4s" values="12;24"/></path></g><rect width="16" height="5" x="20" y="4" fill="currentColor" mask="url(#lineMdBuyMeACoffeeTwotone0)"><animate fill="freeze" attributeName="x" begin="0.8s" dur="0.8s" values="20;4"/></rect><rect width="8" height="10" x="8" y="20" fill="currentColor" fill-opacity="0.5" mask="url(#lineMdBuyMeACoffeeTwotone1)"><animate fill="freeze" attributeName="y" begin="2s" dur="0.8s" values="20;10"/></rect></svg>',
  },
  filledTonal: {
    name: 'Download',
    loaderSVG:
      '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><g fill="none" stroke="currentColor" stroke-linecap="round" stroke-width="1.5"><path stroke-dasharray="2 4" stroke-dashoffset="6" d="M12 3C16.9706 3 21 7.02944 21 12C21 16.9706 16.9706 21 12 21"><animate attributeName="stroke-dashoffset" dur="0.9s" repeatCount="indefinite" values="6;0"/></path><path stroke-dasharray="30" stroke-dashoffset="30" d="M12 21C7.02944 21 3 16.9706 3 12C3 7.02944 7.02944 3 12 3"><animate fill="freeze" attributeName="stroke-dashoffset" begin="0.15s" dur="0.45s" values="30;0"/></path><path stroke-dasharray="10" stroke-dashoffset="10" d="M12 8v7.5"><animate fill="freeze" attributeName="stroke-dashoffset" begin="0.75s" dur="0.3s" values="10;0"/></path><path stroke-dasharray="6" stroke-dashoffset="6" d="M12 15.5l3.5 -3.5M12 15.5l-3.5 -3.5"><animate fill="freeze" attributeName="stroke-dashoffset" begin="1.05s" dur="0.3s" values="6;0"/></path></g></svg>',
    iconSVG:
      '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><g fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5"><path stroke-dasharray="14" stroke-dashoffset="14" d="M6 19h12"><animate fill="freeze" attributeName="stroke-dashoffset" begin="0.75s" dur="0.6s" values="14;0"/></path><path stroke-dasharray="18" stroke-dashoffset="18" d="M12 4 h2 v6 h2.5 L12 14.5M12 4 h-2 v6 h-2.5 L12 14.5"><animate fill="freeze" attributeName="stroke-dashoffset" dur="0.6s" values="18;0"/></path></g></svg>',
  },
  outlined: {
    name: 'Add to Cart',
  },
  text: {
    name: 'Upload',
    loaderSVG:
      '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><g fill="none" stroke="currentColor" stroke-linecap="round" stroke-width="1.5"><path stroke-dasharray="2 4" stroke-dashoffset="6" d="M12 21C7.02944 21 3 16.9706 3 12C3 7.02944 7.02944 3 12 3"><animate attributeName="stroke-dashoffset" dur="0.6s" repeatCount="indefinite" values="6;0"/></path><path stroke-dasharray="30" stroke-dashoffset="30" d="M12 3C16.9706 3 21 7.02944 21 12C21 16.9706 16.9706 21 12 21"><animate fill="freeze" attributeName="stroke-dashoffset" begin="0.1s" dur="0.3s" values="30;0"/></path><path stroke-dasharray="10" stroke-dashoffset="10" d="M12 16v-7.5"><animate fill="freeze" attributeName="stroke-dashoffset" begin="0.5s" dur="0.2s" values="10;0"/></path><path stroke-dasharray="6" stroke-dashoffset="6" d="M12 8.5l3.5 3.5M12 8.5l-3.5 3.5"><animate fill="freeze" attributeName="stroke-dashoffset" begin="0.7s" dur="0.2s" values="6;0"/></path></g></svg>',
    iconSVG:
      '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><g fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5"><path stroke-dasharray="14" stroke-dashoffset="14" d="M6 19h12"><animate fill="freeze" attributeName="stroke-dashoffset" begin="0.75s" dur="0.6s" values="14;0"/></path><path stroke-dasharray="18" stroke-dashoffset="18" d="M12 15 h2 v-6 h2.5 L12 4.5M12 15 h-2 v-6 h-2.5 L12 4.5"><animate fill="freeze" attributeName="stroke-dashoffset" dur="0.6s" values="18;0"/></path></g></svg>',
  },
};

render(
  html`
    <main class="p-4" role="main">
    <div class="flex flex-col gap-4 p-4">
        ${map(this, buttonTypes, (type) =>
          gecutButton({
            type,
            loader: buttonsContents[type].loaderSVG
              ? {
                  svg: buttonsContents[type].loaderSVG!,
                }
              : undefined,
            icon: buttonsContents[type].iconSVG
              ? {
                  // eslint-disable-next-line max-len
                  svg: buttonsContents[type].iconSVG!,
                }
              : undefined,
            events: {
              click: (event) => {
                const target = (event.currentTarget || event.target) as HTMLButtonElement | null;

                target?.setAttribute('loading', '');

                setTimeout(() => {
                  target?.removeAttribute('loading');
                }, 5120);
              },
            },
            label: buttonsContents[type].name,

            ...buttonsContents[type],
          }),
        )}
      </div>
      <div class="flex gap-4 p-4">
        ${map(this, buttonTypes, (type) =>
          gecutButton({
            type,
            loader: buttonsContents[type].loaderSVG
              ? {
                  svg: buttonsContents[type].loaderSVG!,
                }
              : undefined,
            icon: buttonsContents[type].iconSVG
              ? {
                  // eslint-disable-next-line max-len
                  svg: buttonsContents[type].iconSVG!,
                }
              : undefined,
            events: {
              click: (event) => {
                const target = (event.currentTarget || event.target) as HTMLButtonElement | null;

                target?.setAttribute('loading', '');

                setTimeout(() => {
                  target?.removeAttribute('loading');
                }, 5120);
              },
            },
            ...buttonsContents[type],
          }),
        )}
      </div>
    </main>
  `,
  document.body,
);
