
import type {ButtonContent} from '../button/button.js';
import type {IconContent} from '../icon/icon.js';
import type {TopBarContent} from '../top-bar/_type.js';
import type {ContextSignal} from '@gecut/signal';
import type {RenderResult} from '@gecut/types';

type CssSize = `${number}${string}`;

interface _BasicDialog {
  fullscreen: false;

  icon?: IconContent;
  headline: string;
  divider?: false;

  buttons?: ((Omit<ButtonContent, 'onClick' | 'onDblClick'> & {value: string}) | 'separator')[];

  content?: RenderResult | string;

  options?: {
    maxWidth?: CssSize;
  };
}

interface _FullscreenDialog {
  fullscreen: true;

  topBar: Omit<TopBarContent, 'startIcon'>;

  content?: RenderResult;
}

export interface DialogSignals {
  controller: ContextSignal<'open' | 'close'>;

  provider: ContextSignal<string>;
}

export type DialogBaseContent<T> = DialogSignals & T;

export type BasicDialog = DialogBaseContent<_BasicDialog>;
export type FullscreenDialog = DialogBaseContent<_FullscreenDialog>;
export type DialogContent = BasicDialog | FullscreenDialog;
export type DialogHelperContent = _BasicDialog | _FullscreenDialog;
