/* eslint-disable max-len */
import {GecutDirective} from '@gecut/lit-helper/directives/directive.js';
import {directive} from 'lit/directive.js';
import {html, noChange} from 'lit/html.js';

import type {ItemContent} from './item';
import type {PartInfo} from 'lit/directive.js';

export interface ListContent {
  scrollable?: boolean;
  box?: 'elevated' | 'filled' | 'outlined';
  items: ItemContent[];
}

export class GecutListDirective extends GecutDirective {
  constructor(partInfo: PartInfo) {
    super(partInfo, 'gecut-button');
  }

  render(content?: ListContent): unknown {
    this.log.methodArgs?.('render', content);

    if (content === undefined) return noChange;

    return html``;
  }
}

export const gecutList = directive(GecutListDirective);
