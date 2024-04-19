import {defineConfig} from 'vite';
import Unfonts from 'unplugin-fonts/vite';
import tsconfigPaths from 'vite-tsconfig-paths';

const entries = ['dialog', 'top-bar', 'button', 'lists', 'cards', 'icon-button'];
const DIST_PATH = './dist/';
const pages = entries.reduce((result, name) => {
  result[name] = `./${name}/index.html`;

  return result;
}, {});

export default defineConfig(() => {
  return {
    css: {
      postcss: 'postcss.config.mjs',
    },

    build: {
      target: ['esnext', 'edge100', 'firefox100', 'chrome100', 'safari18'],
      outDir: DIST_PATH,
      reportCompressedSize: true,
      commonjsOptions: {
        transformMixedEsModules: true,
      },
      rollupOptions: {
        input: {main: 'index.html', ...pages},
      },
    },

    plugins: [
      tsconfigPaths(),
      Unfonts({
        google: {
          families: [
            {
              name: 'Roboto',
              styles: 'wght@400',
              defer: true,
            },
          ],
          display: 'swap',
          injectTo: 'head-prepend',
          preconnect: true,
        },
      }),
    ],
  };
});
