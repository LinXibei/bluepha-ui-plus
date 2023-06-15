import vue from 'rollup-plugin-vue'
import typescript from 'rollup-plugin-typescript2'
import {nodeResolve} from '@rollup/plugin-node-resolve'
import esbuild, { minify as minifyPlugin } from 'rollup-plugin-esbuild'
import VueMacros from 'unplugin-vue-macros/rollup'
import vueJsx from '@vitejs/plugin-vue-jsx'
const name = 'play'
import commonjs from '@rollup/plugin-commonjs'

const file = type => `dist/${name}.${type}.js`

const plugins = [
  VueMacros({
    setupComponent: false,
    setupSFC: false,
    plugins: {
      vue: vue({
        isProduction: true,
      }),
      vueJsx: vueJsx(),
    },
  }),
  nodeResolve({
    extensions: ['.mjs', '.js', '.json', '.ts'],
  }),
  commonjs(),
  esbuild({
    exclude: [],
    sourceMap: true,
    // target,
    loaders: {
      '.vue': 'ts',
    },
    define: {
      'process.env.NODE_ENV': JSON.stringify('production'),
    },
    treeShaking: true,
    legalComments: 'eof',
  }),
]
// if (minify) {
//   plugins.push(
//     minifyPlugin({
//       target,
//       sourceMap: true,
//     })
//   )
// }
export {name, file}
export default {
  input: './packages/components/index.ts',
  output: {
    name,
    file: file('esm'),
    format: 'esm'
  },
  plugins,
  external: ['vue', '@vue/shared', 'dom-event-types']
}

    
