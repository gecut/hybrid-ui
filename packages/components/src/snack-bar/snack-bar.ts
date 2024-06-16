import {GecutDirective} from '@gecut/lit-helper/directives/directive.js';
import {noChange, nothing, html} from 'lit/html.js';
import {type PartInfo, directive} from 'lit/directive.js';
import {gecutButton, type ButtonContent} from '../button/button.js';
import {gecutIconButton, type IconButtonContent} from '../components.js';
import {classMap, type ClassInfo} from 'lit/directives/class-map.js';

export interface SnackBarContent {
  message: string;

  action?: Omit<ButtonContent, 'type'>;
  close?: boolean | Omit<IconButtonContent, 'type'>;
}

export class GecutSnackBarDirective extends GecutDirective {
  constructor(partInfo: PartInfo) {
    super(partInfo, 'gecut-snack-bar');
  }

  protected content?: SnackBarContent;

  render(content?: SnackBarContent): unknown {
    this.log.methodArgs?.('render', content);

    if (content === undefined) return noChange;

    this.content = content;

    return this.renderSnackBar();
  }

  protected renderSnackBar() {
    if (!this.content) return nothing;

    this.log.method?.('renderSnackBar');

    return html`
      <div class=${classMap(this.getRenderClasses())}>
        <span class="gecut-snack-bar-message">${this.content.message}</span>
        ${this.renderAction()} ${this.renderClose()}
      </div>
    `;
  }
  protected renderAction(): unknown {
    if (!this.content?.action) return nothing;

    this.log.method?.('renderAction');

    return gecutButton({...this.content.action, type: 'text'});
  }
  protected renderClose(): unknown {
    if (!this.content?.close) return nothing;

    this.log.method?.('renderClose');

    return gecutIconButton({
      svg: '<svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 24 24"><path fill="none" stroke="currentColor" stroke-dasharray="12" stroke-dashoffset="12" stroke-linecap="round" stroke-width="2" d="M12 12L19 19M12 12L5 5M12 12L5 19M12 12L19 5"><animate fill="freeze" attributeName="stroke-dashoffset" dur="1.2s" values="12;0"/></path></svg>',

      ...(typeof this.content.close !== 'boolean' ? this.content.close : {}),
    });
  }

  protected override getRenderClasses(): ClassInfo {
    return {
      ...super.getRenderClasses(),

      'longer-action': (this.content?.action?.label?.length ?? 0) > 10,
    };
  }
}

export const gecutSnackBar = directive(GecutSnackBarDirective);
