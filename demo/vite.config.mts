import {defineConfig} from 'vite';

const entrys = ['dialog', 'top-bar'];
const DIST_PATH = './dist/';
const pages = entrys.reduce((result, name) => {
  result[name] = `src/${name}/index.html`;

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
  };
});
