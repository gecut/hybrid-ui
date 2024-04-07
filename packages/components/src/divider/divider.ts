import {classMap} from 'lit/directives/class-map.js';
import {styleMap} from 'lit/directives/style-map.js';
import {html} from 'lit/html.js';

export interface DividerContent {
  inset?: boolean | string;
  insetStart?: boolean | string;
  insetEnd?: boolean | string;

  gap?: boolean | string;
  gapTop?: boolean | string;
  gapBottom?: boolean | string;
}

export const divider = (content: DividerContent) => {
  if (content.inset) {
    content.insetStart ??= content.inset;
    content.insetEnd ??= content.inset;
  }
  if (content.gap) {
    content.gapTop ??= content.gap;
    content.gapBottom ??= content.gap;
  }

  return html`<hr
    class="border-0 border-t border-outlineVariant ${classMap({
      'mt-2': content.gapTop === true,
      'mb-2': content.gapBottom === true,
      'ms-4': content.insetStart === true,
      'me-4': content.insetEnd === true,
    })}"
    style=${styleMap({
      marginTop: typeof content.gapTop === 'string' ? content.gapTop : undefined,
      marginBottom: typeof content.gapBottom === 'string' ? content.gapBottom : undefined,
      marginInlineStart: typeof content.insetStart === 'string' ? content.insetStart : undefined,
      marginInlineEnd: typeof content.insetEnd === 'string' ? content.insetEnd : undefined,
    })}
  />`;
};
