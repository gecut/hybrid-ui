import plugin from 'tailwindcss/plugin.js';

export const translucentPlugin = plugin(({addUtilities}) => {
  addUtilities({
    '@supports (backdrop-filter: blur(0.75rem))': {
      '.translucent': {
        '--tw-bg-opacity': '0.7 !important',
        'backdrop-filter': 'saturate(120%) blur(0.75rem)',
      },
    },
  });
});
