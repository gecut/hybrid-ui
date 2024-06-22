import {SnackBarManager, gecutButton} from '@gecut/components';
import {render, html} from 'lit/html.js';

const sbm = new SnackBarManager({
  position: {
    bottom: '0px',
    left: '0px',
    right: '0px',
  },
});

const id1 = 'id1';
const id2 = 'id2';

sbm.connect(id1, {
  message: 'Hello ' + id1,
  close: true,
});

sbm.connect(id2, {
  message:
    // eslint-disable-next-line max-len
    'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum. ' +
    id2,
  action: {
    label: 'Longer Action',
  },
});

render(
  html`
    <div class="mx-auto max-w-sm flex flex-col gap-4 relative h-full w-full">
      ${sbm.html}
      ${gecutButton({
        type: 'filled',
        label: 'Push 1',
        events: {
          click: () => {
            sbm.open(id1);
          },
        },
      })}
      ${gecutButton({
        type: 'filled',
        label: 'Push 2',
        events: {
          click: () => {
            sbm.open(id2);
          },
        },
      })}
      ${gecutButton({
        type: 'filled',
        label: 'Remove 1',
        events: {
          click: () => {
            sbm.disconnect(id1);
          },
        },
      })}
    </div>
  `,
  document.body,
);
