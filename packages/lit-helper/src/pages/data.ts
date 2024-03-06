import { html } from 'lit';
import { guard } from 'lit/directives/guard.js';

import { GecutPWAPage } from './page.js';

import type { ReceiverController } from '@gecut/data-manager/controllers/receiver.js';
import type { DataManager } from '@gecut/data-manager/index.js';
import type { RenderResult } from '@gecut/types';

export abstract class PageData<
  Name extends keyof GecutReceiverServices,
  LocalDataManager extends DataManager,
  Data = GecutReceiverServices[Name],
> extends GecutPWAPage {
  data!: ReceiverController<Name, LocalDataManager, this>;

  override render(): RenderResult {
    super.render();

    return html` ${guard([this.data.value], () => this.data.render(true))}`;
  }

  protected renderData(data: Data): RenderResult {
    this.log.methodArgs?.('renderData', { data });

    return html``;
  }
}
