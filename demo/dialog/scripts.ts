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

const dialogHelpers = [simpleDialog, alertDialog];

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
              onClick: () => helper.open(),
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
