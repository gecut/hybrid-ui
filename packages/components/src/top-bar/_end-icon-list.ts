import { iconButton } from '../icon-button/icon-button.js';

import type { IconButtonContent } from '../icon-button/icon-button.js';

export const endIconListTemplate = (iconList?: IconButtonContent[]) =>
  iconList?.map((icon) => iconButton(icon));
