import { GecutDirective } from '@gecut/lit-helper/directives/directive.js';
import { directive, type PartInfo } from 'lit/directive.js';
import { html, noChange } from 'lit/html.js';

export class GecutDialogDirective extends GecutDirective {
  constructor(partInfo: PartInfo) {
    super(partInfo, 'gecut-dialog');
  }

  render(content?: unknown): unknown {
    this.log.methodArgs?.('render', content);

    if (content === undefined) return noChange;

    return html``;
  }
}

export const gecutDialog = directive(GecutDialogDirective);
