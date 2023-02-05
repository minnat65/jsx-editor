import * as esbuild from 'esbuild-wasm';

import { unpkgPathPlugin } from './plugins/unpkg-path-plugin';
import { fetchPlugins } from './plugins/frtch-plugins';

let service: esbuild.Service;
const bundle = async (rawCode: string) => {
  
  if(!service) {
    service = await esbuild.startService({
      worker: true,
      wasmURL: 'https://unpkg.com/esbuild-wasm@0.8.27/esbuild.wasm'
      // wasmURL: '/esbuild.wasm'
    });
  }

  try {
    // building & transpiling the code
    const res = await service.build({
      entryPoints: ['index.js'],
      bundle: true,
      write: false,
      plugins: [unpkgPathPlugin(), fetchPlugins(rawCode)],
      define: {
        'process.env.NODE_ENV': '"production"',
        global: 'window',
      },
      jsxFactory: '_React.createElement',
      jsxFragment: '_React.Fragment',
    })
    
    return {
      code: res.outputFiles[0].text,
      err: '',
    }
  } catch(err) {
    if(err instanceof Error) {
      return {
        code: '',
        err: err.message,
      }
    } else {
      throw err;
    }
  }
}

export default bundle;