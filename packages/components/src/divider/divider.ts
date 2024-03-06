import { html } from 'lit/html.js';

export interface DividerContent {
  inset?: boolean;
  insetStart?: boolean;
  insetEnd?: boolean;

  gapTop?: boolean;
  gapBottom?: boolean;
}

export const divider = (content: DividerContent) => {
  const inset = content.inset ? 'mx-4' : '';
  const insetStart = content.insetStart ? 'ms-4' : '';
  const insetEnd = content.insetEnd ? 'me-4' : '';
  const gapTop = content.gapTop ? 'mt-2' : '';
  const gapBottom = content.gapBottom ? 'mb-2' : '';

  return html`<hr
    class="border-0 border-t border-outlineVariant ${inset} ${insetStart} ${insetEnd} ${gapTop} ${gapBottom}"
  />`;
};
