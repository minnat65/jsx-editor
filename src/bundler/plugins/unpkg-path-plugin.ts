import * as esbuild from 'esbuild-wasm';
// import axios from 'axios';
// import loczalForage from 'localforage';

// const fileCache = localForage.createInstance({
//   name: 'filecache',
// });

export const unpkgPathPlugin = () => {
  return {
    name: 'unpkg-path-plugin',
    setup(build: esbuild.PluginBuild) {
      // handle root module
      build.onResolve({ filter: /(^index\.js$)/}, () => {
        return { path: 'index.js', namespace: 'a' }
      });

      // Handle relative path in module
      build.onResolve({ filter: /^\.+\//}, (args: any) => {
        return {
          namespace: 'a',
          path: new URL(
            args.path,
            'https://unpkg.com' + args.resolveDir + '/'
          ).href,
        };
      });

      build.onResolve({ filter: /.*/ }, async (args: any) => {
        // console.log('onResolve', args);

        return {
          namespace: 'a',
          path: `https://unpkg.com/${args.path}`,
        };
      });
    },
  };
};
