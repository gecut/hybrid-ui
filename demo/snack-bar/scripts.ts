import {SnackBarManager} from '@gecut/components';
import {render, html} from 'lit/html.js';

const sbm = new SnackBarManager({gapBottom: '0'});
let index = 0;

const x = setInterval(() => {
  sbm.open('s-' + index++, {
    message: 'Hello ' + index,
  });

  if (x > 5) clearInterval(x);
}, 5000);

render(html` <div class="mx-auto max-w-sm flex flex-col gap-4">${sbm.html}</div> `, document.body);
