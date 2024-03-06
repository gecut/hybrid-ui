import type { IconButtonContent } from '../icon-button/icon-button.js';

export interface TopBarContent {
  title: string;

  startIcon?: IconButtonContent;
  endIconList?: IconButtonContent[];

  tinted?: number;
  elevated?: number;
}
