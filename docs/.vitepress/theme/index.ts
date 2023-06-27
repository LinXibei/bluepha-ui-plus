// import BluephaPlus from 'bluepha-plus'
import { BlButton } from "../../../packages/components/button"
import DefaultTheme from 'vitepress/theme'
import 'vitepress-theme-demoblock/dist/theme/styles/index.css'
import { useComponents } from './useComponents'
// import VPApp, { NotFound, globals } from '../vitepress'
// import 'uno.css'
// import './style.css'
import type { Theme } from 'vitepress'

export default {
  ...DefaultTheme,
  enhanceApp: ({ app }) => {
    app.use("bl-button", BlButton)
    useComponents(app)
    // globals.forEach(([name, Comp]) => {
    //   app.component(name, Comp)
    // })
  },
}
