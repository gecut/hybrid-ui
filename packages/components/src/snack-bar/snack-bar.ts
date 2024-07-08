import {GecutDirective} from '@gecut/lit-helper/directives/directive.js';
import {directive} from 'lit/directive.js';
import {classMap} from 'lit/directives/class-map.js';
import {ref, type Ref} from 'lit/directives/ref.js';
import {nothing, html, noChange} from 'lit/html.js';

import {gecutButton} from '../button/button.js';
import {gecutIconButton} from '../components.js';

import type {ButtonContent} from '../button/button.js';
import type {IconButtonContent} from '../components.js';
import type {PartInfo} from 'lit/directive.js';
import type {ClassInfo} from 'lit/directives/class-map.js';

export interface SnackBarContent {
  message: string;

  open?: boolean;
  action?: Omit<ButtonContent, 'type'>;
  close?: boolean | Omit<IconButtonContent, 'type'>;
}

export class GecutSnackBarDirective extends GecutDirective {
  constructor(partInfo: PartInfo) {
    super(partInfo, 'gecut-snack-bar');
  }

  private static readonly closeIconSVG =
    // eslint-disable-next-line max-len
    '<svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 24 24"><path fill="none" stroke="currentColor" stroke-dasharray="12" stroke-dashoffset="12" stroke-linecap="round" stroke-width="2" d="M12 12L19 19M12 12L5 5M12 12L5 19M12 12L19 5"><animate fill="freeze" attributeName="stroke-dashoffset" dur="1.2s" values="12;0"/></path></svg>';

  content?: SnackBarContent;

  render(content: SnackBarContent, ref: Ref<HTMLDivElement>): unknown {
    this.log.methodArgs?.('render', content);

    if (content && content != this.content) {
      this.content = content;

      return this.renderSnackBar(this.content, ref);
    }

    return noChange;
  }

  protected renderSnackBar(content: SnackBarContent, _ref: Ref<HTMLDivElement>) {
    this.log.method?.('renderSnackBar');

    return html`
      <div class=${classMap(this.getRenderClasses())} ${ref(_ref)}>
        <span class="gecut-snack-bar-message">${content.message}</span>
        <div class="actions">${this.renderAction(content.action)} ${this.renderClose(content.close)}</div>
      </div>
    `;
  }
  protected renderAction(content: SnackBarContent['action']): unknown {
    if (!content) return nothing;

    this.log.method?.('renderAction');

    return gecutButton({
      ...content,
      type: 'text',
    });
  }
  protected renderClose(content: SnackBarContent['close']): unknown {
    if (!content) return nothing;

    this.log.method?.('renderClose');

    const _content: Omit<IconButtonContent, 'type'> =
      typeof content !== 'boolean'
        ? content
        : {
          svg: GecutSnackBarDirective.closeIconSVG,
        };

    return gecutIconButton(_content);
  }

  protected override getRenderClasses(): ClassInfo {
    if (!this.content) return super.getRenderClasses();

    return {
      ...super.getRenderClasses(),

      'longer-action': (this.content.action?.label?.length ?? 0) > 10,
      open: this.content.open ?? false,
      close: !(this.content.open ?? false),
    };
  }
}

export const gecutSnackBar = directive(GecutSnackBarDirective);
