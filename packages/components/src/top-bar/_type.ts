import type {ButtonContent} from '../button/button.js';
import type {IconButtonContent} from '../icon-button/icon-button.js';

export type EndIconType = (IconButtonContent & {element: 'icon-button'}) | (ButtonContent & {element: 'button'});

export interface TopBarContent {
  title: string;

  startIcon?: IconButtonContent;
  endIconList?: EndIconType[];
}
