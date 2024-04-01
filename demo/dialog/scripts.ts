import {DialogHelper, gecutButton} from '@gecut/components';
import {gecutContext} from '@gecut/lit-helper/directives/context.js';
import {map} from 'lit/directives/map.js';
import {html, render} from 'lit/html.js';

const simpleDialog = new DialogHelper({
  fullscreen: false,
  headline: 'Simple Dialog',
  content: 'Just a Simple Dialog',
  buttons: [
    'separator',
    {
      type: 'text',
      value: 'cancel',
      label: 'Cancel',
    },
    {
      type: 'text',
      value: 'ok',
      label: 'Ok',
    },
  ],
});
const alertDialog = new DialogHelper({
  fullscreen: false,
  headline: 'Alert Dialog',
  content:
    'This is a standard alert dialog. Alert dialogs interrupt users with urgent information, details, or actions.',
  buttons: [
    'separator',
    {
      type: 'text',
      value: 'ok',
      label: 'Ok',
    },
  ],
});
const confirmDialog = new DialogHelper({
  fullscreen: false,
  options: {
    maxWidth: '320px',
  },
  headline: 'Confirm Dialog',
  content: 'Deleting the selected photos will also remove them from all synced devices.',
  icon: {
    // eslint-disable-next-line max-len
    svg: '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path fill="currentColor" d="M7 21q-.825 0-1.412-.587T5 19V6q-.425 0-.712-.288T4 5q0-.425.288-.712T5 4h4q0-.425.288-.712T10 3h4q.425 0 .713.288T15 4h4q.425 0 .713.288T20 5q0 .425-.288.713T19 6v13q0 .825-.587 1.413T17 21zM17 6H7v13h10zm-7 11q.425 0 .713-.288T11 16V9q0-.425-.288-.712T10 8q-.425 0-.712.288T9 9v7q0 .425.288.713T10 17m4 0q.425 0 .713-.288T15 16V9q0-.425-.288-.712T14 8q-.425 0-.712.288T13 9v7q0 .425.288.713T14 17M7 6v13z"/></svg>',
  },
  buttons: [
    'separator',
    {
      type: 'text',
      value: 'delete',
      label: 'Delete',
    },
    {
      type: 'filled',
      value: 'cancel',
      label: 'Cancel',
    },
  ],
});

const dialogHelpers = [simpleDialog, alertDialog, confirmDialog];

render(
  html`
    <main class="p-4" role="main">
      ${map(
        dialogHelpers,
        (helper) => html`
          <div
            class="flex items-center justify-around gap-4 text-bodyMedium text-onSurface text-pretty capitalize mb-6"
          >
            ${gecutButton({
              onClick: () =>
                helper.open({
                  headline: 'headline' in helper.content ? helper.content.headline + '*' : '',
                }),
              type: 'filled',
              label: 'headline' in helper.content ? helper.content.headline : 'Open',
            })}
            ${gecutContext<string>()(helper.provider, (value) => html`${value}`)}
          </div>
        `,
      )}
    </main>

    ${map(dialogHelpers, (helper) => helper.html)}
  `,
  document.body,
);
