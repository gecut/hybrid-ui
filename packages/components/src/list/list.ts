import {GecutDirective} from '@gecut/lit-helper/directives/directive.js';
import {directive} from 'lit/directive.js';
import {classMap, type ClassInfo} from 'lit/directives/class-map.js';
import {repeat} from 'lit/directives/repeat.js';
import {html, noChange} from 'lit/html.js';

import {gecutItem, type ItemContent} from './item';

import type {PartInfo} from 'lit/directive.js';

export type KeyFn<T> = (item: T, index: number) => unknown;
export type ItemTemplate<T> = (item: T, index: number) => ItemContent;
export interface GecutListDirectiveFn {
  <T>(content: ListContent, items: Iterable<T>, template?: ItemTemplate<T>): unknown;
  <T>(content: ListContent, items: Iterable<T>, template: ItemTemplate<T>): unknown;
  <T>(content: ListContent, items: Iterable<T>, keyFn: KeyFn<T> | ItemTemplate<T>, template: ItemTemplate<T>): unknown;
}
export interface ListContent {
  scrollable?: boolean;
  box?: 'elevated' | 'filled' | 'outlined';
  fade?: 'auto' | 'top' | 'bottom' | boolean;
}

export class GecutListDirective extends GecutDirective {
  constructor(partInfo: PartInfo) {
    super(partInfo, 'gecut-list');
  }

  protected content?: ListContent;

  render<T>(content: ListContent, items: Iterable<T>, template: ItemTemplate<T>): unknown;
  render<T>(
    content: ListContent,
    items: Iterable<T>,
    keyFn: KeyFn<T> | ItemTemplate<T>,
    template: ItemTemplate<T>,
  ): unknown;
  render<T>(
    content: ListContent,
    items: Iterable<T>,
    keyFnOrTemplate: KeyFn<T> | ItemTemplate<T>,
    template?: ItemTemplate<T>,
  ): unknown {
    this.log.methodArgs?.('render', {content, items});

    if (content === undefined) return noChange;

    this.content = content;

    return html`
      <div class=${classMap(this.getRenderClasses())}>
        <div class="gecut-list-body">
          ${repeat(items, keyFnOrTemplate, (item, index) =>
            gecutItem(template?.(item, index) || (keyFnOrTemplate(item, index) as ItemContent)),
          )}
        </div>
      </div>
    `;
  }

  protected override getRenderClasses(): ClassInfo {
    if (!this.content) return super.getRenderClasses();

    return {
      ...super.getRenderClasses(),

      'gecut-card-elevated': this.content.box === 'elevated',
      'gecut-card-filled': this.content.box === 'filled',
      'gecut-card-outlined': this.content.box === 'outlined',

      card: this.content.box != null,
      scrollable: this.content.scrollable ?? false,

      'top-fade': this.content.fade === 'top' || this.content.fade === true,
      'bottom-fade': this.content.fade === 'bottom' || this.content.fade === true,
    };
  }
}

export const gecutList = directive(GecutListDirective) as GecutListDirectiveFn;
