import vue from 'rollup-plugin-vue'
import {nodeResolve} from '@rollup/plugin-node-resolve'
import * as path from 'path'
import * as fs from 'fs'
import esbuild, { minify as minifyPlugin } from 'rollup-plugin-esbuild'
import VueMacros from 'unplugin-vue-macros/rollup'
import vueJsx from '@vitejs/plugin-vue-jsx'
import commonjs from '@rollup/plugin-commonjs'
const PKG_NAME = 'bluepha-ui-plus'
const blOutput = path.resolve('dist', 'element-plus')
export const buildConfig = {
  esm: {
    module: 'ESNext',
    format: 'esm',
    ext: 'mjs',
    output: {
      name: 'es',
      path: path.resolve(blOutput, 'es'),
    },
    bundle: {
      path: `${PKG_NAME}/es`,
    },
  },
  cjs: {
    module: 'CommonJS',
    format: 'cjs',
    ext: 'js',
    output: {
      name: 'lib',
      path: path.resolve(blOutput, 'lib'),
    },
    bundle: {
      path: `${PKG_NAME}/lib`,
    },
  },
}
const buildConfigEntries = Object.entries(
  buildConfig
)

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
const componentsDir = 'packages/components'
const componentsName = fs.readdirSync(path.resolve(componentsDir))
const componentsEntry = componentsName.filter(
  (name) => !name.endsWith('.ts') && !name.endsWith('.json')
).map((name) => {
  return path.resolve(componentsDir, name, 'index.ts')
});
const inputOptions = {
  input: [...componentsEntry, 'packages/components/index.ts'],
  plugins,
  external: ['vue', '@vue/shared', 'dom-event-types'],
  treeshake: false,
}
const results = buildConfigEntries.map(([module, config]) => {
  return {
    ...inputOptions,
    output: Object.assign(config.output, {
      format: config.format,
      dir: config.output.path,
      exports: module === 'cjs' ? 'named' : undefined,
      preserveModules: true,
      preserveModulesRoot: blOutput,
      sourcemap: true,
      entryFileNames: `[name].${config.ext}`,
    }),
  }
});
export default results;

