import type {ButtonContent} from '../button/button.js';
import type {IconButtonContent} from '../icon-button/icon-button.js';
import type {ContextSignal} from '@gecut/signal';

export type EndIconType = (IconButtonContent & {element: 'icon-button'}) | (ButtonContent & {element: 'button'});

export interface TopBarContent {
  title: string | ContextSignal<string>;

  startIcon?: IconButtonContent;
  endIconList?: EndIconType[];
}
