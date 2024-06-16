import {gecutContext} from '@gecut/lit-helper/directives/context.js';
import {ContextSignal} from '@gecut/signal';

import {gecutSnackBar, type SnackBarContent} from './snack-bar.js';

import {repeat} from 'lit/directives/repeat.js';

export interface SnackBarManagerContent {
  gapBottom: string;
}

export class SnackBarManager {
  constructor(content: SnackBarManagerContent) {
    this.content = content;
    this.snackBars.value = [];

    // this.html = html`${gecutContext<'open' | 'close'>(this.controller, (status) => {
    //   const dialogContent: DialogContent = {...this.content, controller: this.controller, provider: this.provider};

    //   return gecutDialog(dialogContent, status === 'open');
    // })}`;

    // this.controller.value = 'close';
  }

  content: SnackBarManagerContent;
  snackBars = new ContextSignal<[string, SnackBarContent, {open: true}][]>('snack-bars');
  html = gecutContext(this.snackBars, (snackBars) =>
    repeat(
      snackBars,
      (snackBar) => snackBar[0],
      (snackBar) => gecutSnackBar(snackBar[1]),
    ),
  );

  open(id: string, content: SnackBarContent) {
    this.snackBars.functionalValue((old) => [[id, content, {open: true}], ...(old ?? [])]);
  }

  // onAfterClose() {
  //   return new Promise<string>((resolve) => {
  //     this.provider.subscribe(resolve, {
  //       receivePrevious: false,
  //       once: true,
  //       priority: 1000,
  //     });
  //   });
  // }
}
