/* eslint-disable max-len */
import {map} from '@gecut/lit-helper';
import {html, render} from 'lit/html.js';

const cards = ['elevated', 'filled', 'outlined'];
const cardsStyles: Record<string, string> = {
  elevated: 'gecut-card-elevated',
  filled: 'gecut-card-filled',
  outlined: 'gecut-card-outlined',
};
const cardsSelectableStyles: Record<string, string> = {
  elevated: 'gecut-card-elevated-selectable',
  filled: 'gecut-card-filled-selectable',
  outlined: 'gecut-card-outlined-selectable',
};

render(
  html`
    <main class="p-4" role="main">
      <div class="flex flex-col gap-2 p-4">
        <h2 class="text-titleLarge text-onSurfaceVariant">Normal Cards</h2>

        ${map(
          this,
          cards,
          (type) => html`
            <div
              class="${cardsStyles[
                type
              ]} capitalize flex flex-col h-24 w-full p-4 text-titleSmall justify-end items-start"
            >
              ${type}
            </div>
          `,
        )}
      </div>
      <div class="flex flex-col gap-2 p-4">
        <h2 class="text-titleLarge text-onSurfaceVariant">Selectable Cards</h2>

        ${map(
          this,
          cards,
          (type) => html`
            <div
              class="${cardsSelectableStyles[
                type
              ]} capitalize flex flex-col h-24 w-full p-4 text-titleSmall justify-end items-start"
            >
              ${type} selectable
            </div>
          `,
        )}
      </div>
    </main>
  `,
  document.body,
);
