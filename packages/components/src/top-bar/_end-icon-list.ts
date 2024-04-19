import {gecutButton} from '../button/button.js';
import {gecutIconButton} from '../icon-button/icon-button.js';

import type {EndIconType} from './_type.js';

export const endIconListTemplate = (_list?: EndIconType[]) => {
  return _list?.map((content) => {
    if (content.element === 'icon-button') {
      return gecutIconButton(content);
    }

    return gecutButton(content);
  });
};
