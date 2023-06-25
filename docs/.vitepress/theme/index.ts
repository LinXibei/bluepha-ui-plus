import BluephaPlus from 'bluepha-plus'
import DefaultTheme from 'vitepress/theme'
import 'vitepress-theme-demoblock/dist/theme/styles/index.css'

// import VPApp, { NotFound, globals } from '../vitepress'
import 'uno.css'
import './style.css'
import type { Theme } from 'vitepress'

export default {
  ...DefaultTheme,
  enhanceApp: ({ app }) => {
    app.use(BluephaPlus)

    // globals.forEach(([name, Comp]) => {
    //   app.component(name, Comp)
    // })
  },
}
