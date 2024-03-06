import {css, html} from 'lit';
import {asyncAppend} from 'lit/directives/async-append.js';

import {PageData} from './data.js';
import {mapFilter} from '../utilities/map-filter.js';

import type {DataManager} from '@gecut/data-manager/index.js';
import type {RenderResult, UnknownRecord} from '@gecut/types';
import type {ConditionalKeys} from 'type-fest';

export abstract class PageList<
  Name extends ConditionalKeys<GecutReceiverServices, UnknownRecord[]>,
  LocalDataManager extends DataManager,
  Data extends UnknownRecord[] = GecutReceiverServices[Name],
> extends PageData<Name, LocalDataManager, Data> {
  static override styles = [
    css`
      md-list-item {
        --_label-text-size: 0.85rem;
        --_supporting-text-size: 0.8rem;

        display: block;
        overflow: hidden;
        overflow: clip;
      }
    `,
  ];

  protected override renderData(data: Data): RenderResult {
    super.renderData(data);

    return html`
      <surface-card type="filled" scroller>
        ${asyncAppend(
          mapFilter(this, data, this.filter.bind(this), this.renderItem.bind(this)) as AsyncIterable<unknown>,
        )}
      </surface-card>
    `;
  }
  protected renderItem(item: Data[number]): RenderResult {
    this.log.methodArgs?.('renderItem', {item});

    return html`${item}`;
  }
  protected filter(item: Data[number]): boolean {
    this.log.methodArgs?.('filter', {item});

    return true;
  }
}
