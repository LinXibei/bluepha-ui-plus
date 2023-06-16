import { defineBuildConfig } from 'unbuild'

export default defineBuildConfig({
  entries: ['./rollup.ts'],
  clean: true,
  declaration: true,
  rollup: {
    emitCJS: true,
  },
})
