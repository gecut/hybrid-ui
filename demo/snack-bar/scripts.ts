import {SnackBarManager, gecutButton} from '@gecut/components';
import {numberUtils} from '@gecut/utilities/data-types/number.js';
import {render, html} from 'lit/html.js';

const manager = new SnackBarManager({
  style: {
    position: 'fixed',
    right: 0,
    left: 0,
    maxWidth: '640px',
    margin: '0 auto',
    bottom: '5rem',
  },
});

manager.connect('hello', {
  message: 'Hello',
});

for (let index = 0; index < 3; index++) {
  manager.notify({
    message: 'Fuck you ' + index,
    close: numberUtils.random.number(1, 0) > 0,
  });
  manager.notify({
    message:
      // eslint-disable-next-line max-len
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Diam maecenas ultricies mi eget mauris pharetra et.',

    textMultiLine: true,
    action: {
      label: 'Save',
    },
  });
}

render(
  html`
    <div class="mx-auto max-w-sm flex flex-col gap-4 relative h-full w-full">
      ${manager.html}
      ${gecutButton({
        type: 'filled',
        label: 'Open',
        events: {
          click: () => {
            manager.open('hello');
          },
        },
      })}
      ${gecutButton({
        type: 'filled',
        label: 'Notify',
        events: {
          click: () => {
            manager.notify({
              message: 'Snackbars shouldn’t interrupt the user’s experience and Usually appear at the bottom of the UI',
              close: true,
            });
          },
        },
      })}
    </div>
  `,
  document.body,
);
