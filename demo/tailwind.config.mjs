import {tailwindConfig} from '@gecut/styles/index.js';
import path from 'path';

export const systemFont = [
  'system-ui',
  '-apple-system',
  'BlinkMacSystemFont',
  '"Segoe UI"',
  '"Roboto"',
  '"Oxygen"',
  '"Ubuntu"',
  '"Cantarell"',
  '"Open Sans"',
  'Helvetica Neue',
  '"Arial"',
  '"Noto Sans"',
  '"Apple Color Emoji"',
  '"Segoe UI Emoji"',
  '"Segoe UI Symbol"',
  '"Noto Color Emoji"',
];

/** @type {import('tailwindcss').Config} */
export default {
  ...tailwindConfig,

  theme: {
    ...tailwindConfig.theme,

    fontFamily: {
      ...tailwindConfig.theme.fontFamily,

      roboto: [
        ['Roboto', ...systemFont],
        {
          fontFeatureSettings: '"calt" 1, "tnum" 0',
        },
      ],
    },
  },

  content: ['index.html', '**/*.html', '**/*.ts', path.dirname(require.resolve('@gecut/components')) + '/**/*.ts'],

  plugins: [...tailwindConfig.plugins, require('@tailwindcss/aspect-ratio')],
};
