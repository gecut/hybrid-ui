import {gecutButton, type ButtonContent} from '../button/button.js';
import {iconButton} from '../icon-button/icon-button.js';

import type {IconButtonContent} from '../icon-button/icon-button.js';

export const endIconListTemplate = (_list?: (IconButtonContent | ButtonContent)[]) => {
  return _list?.map((content) => {
    if ('type' in content) {
      return gecutButton(content);
    }

    return iconButton(content);
  });
};
