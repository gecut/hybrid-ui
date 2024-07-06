import {GecutState} from '@gecut/lit-helper';
import {render, html} from 'lit/html.js';

const str = new GecutState('string', '');
const num = new GecutState('number', 0);
const bool = new GecutState('boolean', false);

render(
  html`
    <div class="mx-auto max-w-sm flex flex-col gap-4 relative h-full w-full">
      <ol class="*:cursor-pointer *:select-none">
        <li @click=${() => (str.value += 'Hello ')}>String: ${str.hydrate((data) => data)}</li>
        <li @click=${() => (num.value = (num.value ?? 0) + 1_000)}>
          Number: ${num.hydrate((data) => data.toLocaleString('Fa-Ir'))}
        </li>
        <li @click=${() => (bool.value = !bool.value)}>Boolean: ${bool.hydrate((data) => JSON.stringify(data))}</li>
      </ol>
    </div>
  `,
  document.body,
);
