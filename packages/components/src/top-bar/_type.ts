import type {ButtonContent} from '../button/button.js';
import type {IconButtonContent} from '../icon-button/icon-button.js';

export interface TopBarContent {
  title: string;

  startIcon?: IconButtonContent;
  endIconList?: (IconButtonContent | ButtonContent)[];
}
