import {gecutContext} from '@gecut/lit-helper/directives/context.js';
import {ContextSignal} from '@gecut/signal';
import {html} from 'lit/html.js';

import {gecutDialog} from './dialog.js';

import type {DialogContent, DialogHelperContent} from './_type.js';
import type {RenderResult} from '@gecut/types';

export class DialogHelper {
  constructor(content: DialogHelperContent) {
    this.content = content;

    this.html = html`${gecutContext<'open' | 'close'>()(this.controller, (status) => {
      const dialogContent: DialogContent = {...this.content, controller: this.controller, provider: this.provider};

      return gecutDialog(dialogContent, status === 'open');
    })}`;

    this.controller.setValue('close');
  }

  controller = new ContextSignal<'open' | 'close'>('dialog-controller');
  provider = new ContextSignal<string>('dialog-provider');
  html: RenderResult;
  content: DialogHelperContent;

  open(content: Partial<DialogHelperContent> = {}) {
    this.content = {...this.content, ...content} as DialogHelperContent;

    this.controller.setValue('open');
  }

  onAfterClose() {
    return new Promise<string>((resolve) => {
      this.provider.subscribe(resolve, {
        receivePrevious: false,
        once: true,
        priority: 1000,
      });
    });
  }
}
