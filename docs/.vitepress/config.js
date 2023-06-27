import { defineConfig } from 'vitepress'
import { demoblockPlugin, demoblockVitePlugin } from 'vitepress-theme-demoblock'
import vueJsx from '@vitejs/plugin-vue-jsx'
import path from 'path'
import fs from 'fs'
import MarkdownIt from 'markdown-it'
import mdContainer from 'markdown-it-container'
import { highlight } from './plugin/highlight'
// import type Token from 'markdown-it/lib/token'
// import type Renderer from 'markdown-it/lib/renderer'

// export const tag  = (md): void => {
//   /**
//    * To enable the plugin to be parsed in the demo description, the content is rendered as span instead of ElTag.
//    */
//   md.renderer.rules.tag = (tokens, idx) => {
//     const token = tokens[idx]
//     const value = token.content
//     /**
//      * Add styles for some special tags
//      * vitepress/styles/content/tag-mark-content.scss
//      */
//     const tagClass = ['beta', 'deprecated', 'a11y'].includes(value) ? value : ''
//     return `<span class="vp-tag ${tagClass}">${value}</span>`
//   }

//   md.inline.ruler.before('emphasis', 'tag', (state, silent) => {
//     const tagRegExp = /^\^\(([^)]*)\)/
//     const str = state.src.slice(state.pos, state.posMax)

//     if (!tagRegExp.test(str)) return false
//     if (silent) return true

//     const result = str.match(tagRegExp)

//     if (!result) return false

//     const token = state.push('tag', 'tag', 0)
//     token.content = result[1].trim()
//     token.level = state.level
//     state.pos += result[0].length

//     return true
//   })
// }
// const localMd = MarkdownIt().use(tag)

// interface ContainerOpts {
//   marker?: string | undefined
//   validate?(params: string): boolean
//   render?(
//     tokens: Token[],
//     index: number,
//     options: any,
//     env: any,
//     self: Renderer
//   ): string
// }

// export const mdPlugin = (md: MarkdownIt) => {
//   md.use(mdContainer, 'demo', {
//     validate(params) {
//       return !!params.trim().match(/^demo\s*(.*)$/)
//     },

//     render(tokens, idx) {
//       const m = tokens[idx].info.trim().match(/^demo\s*(.*)$/)
//       if (tokens[idx].nesting === 1 /* means the tag is opening */) {
//         const description = m && m.length > 1 ? m[1] : ''
//         const sourceFileToken = tokens[idx + 2]
//         let source = ''
//         const sourceFile = sourceFileToken.children?.[0].content ?? ''

//         if (sourceFileToken.type === 'inline') {
//           source = fs.readFileSync(
//             path.resolve('.', 'examples', `${sourceFile}.vue`),
//             'utf-8'
//           )
//         }
//         if (!source) throw new Error(`Incorrect source file: ${sourceFile}`)

//         return `<Demo :demos="demos" source="${encodeURIComponent(
//           highlight(source, 'vue')
//         )}" path="${sourceFile}" raw-source="${encodeURIComponent(
//           source
//         )}" description="${encodeURIComponent(localMd.render(description))}">`
//       } else {
//         return '</Demo>'
//       }
//     },
//   } as ContainerOpts)

//   // md.use(ApiTableContainer)
// }

// https://vitepress.dev/reference/site-config
export default defineConfig({
  title: "Bluepha UI Plus",
  description: "This is bluepha ui plus",
  themeConfig: {
    // https://vitepress.dev/reference/default-theme-config
    nav: [
      { text: 'Home', link: '/' },
      { text: 'Examples', link: '/markdown-examples' }
    ],

    sidebar: [
      {
        text: 'Examples',
        items: [
          { text: 'Markdown Examples', link: '/markdown-examples' },
          { text: 'Runtime API Examples', link: '/api-examples' }
        ]
      },
      {
        text: 'Guide',
        items: [
          { text: 'Button', link: '/button' },
          { text: 'Configuration', link: '/config' },
          { text: 'Asset Handling', link: '/assets' },
        ]
      }
    ],

    socialLinks: [
      { icon: 'github', link: 'https://github.com/vuejs/vitepress' }
    ]
  },
  markdown: {
    theme: { light: 'github-light', dark: 'github-dark' },

    config: (md) => {
      md.use(demoblockPlugin, {
        customClass: 'demoblock-custom'
      })
    }
  },
  vite: {
    plugins: [demoblockVitePlugin(), vueJsx()],
  },
})
