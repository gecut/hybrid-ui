import {animationTheme} from './configs/animation.js';
import {roundedTheme} from './configs/rounded.js';
import {screenTheme} from './configs/screen.js';
import {typographyTheme} from './configs/typography.js';
import {zIndexTheme} from './configs/z-index.js';
import {colorTheme, colorPlugin} from './plugins/color-scheme.js';
import {elevationPlugin} from './plugins/elevation.js';
import {stateLayerPlugin} from './plugins/state-layer.js';
import {translucentPlugin} from './plugins/translucent.js';

import type {Config} from 'tailwindcss';

export const tailwindConfig: Omit<Config, 'content'> = {
  darkMode: 'media',
  theme: {
    extend: {
      ...colorTheme,
      ...typographyTheme,
      ...zIndexTheme,
      ...screenTheme,
      ...animationTheme,
      ...roundedTheme,
    },
  },
  plugins: [colorPlugin, elevationPlugin, stateLayerPlugin, translucentPlugin],
};
