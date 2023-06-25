import { parallel, series } from 'gulp'
import { copyFile, mkdir } from 'fs/promises'
import * as fse from 'fs-extra'
import * as path from 'path'
import { blOutput, buildConfig, withTaskName, runTask, run } from './src'

export const projRoot = path.resolve(__dirname, '..')
const blPackage = path.resolve(projRoot, 'package.json')
export const copyFiles = () =>
  Promise.all([
    copyFile(blPackage, path.join(blOutput, 'package.json')),
    copyFile(
      path.resolve(blOutput, 'README.md'),
      path.resolve(blOutput, 'README.md')
    ),
    copyFile(
      path.resolve(projRoot, 'global.d.ts'),
      path.resolve(blOutput, 'global.d.ts')
    ),
  ])


export const copyTypesDefinitions: Function = (done) => {
  const src = path.resolve(blOutput, 'types', 'packages')
  const copyTypes = (module) =>
    withTaskName(`copyTypes:${module}`, () =>
      fse.copy(src, buildConfig[module].output.path, { recursive: true })
    )

  return parallel(copyTypes('esm'), copyTypes('cjs'))(done)
}

export default series(
  withTaskName('clean', () => run('pnpm run clean')),
  withTaskName('createOutput', () => mkdir(blOutput, { recursive: true })),
  runTask('buildModules'),

  parallel(copyTypesDefinitions, copyFiles)
)
export * from './src'