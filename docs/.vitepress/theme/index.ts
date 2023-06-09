import DefaultTheme from "vitepress/theme";
import "../../../dist/bluepha-plus/es/index.css";
import elementplus from "element-plus";
import { BlButton } from "../../../dist/bluepha-plus/es/components/index.mjs";
export default {
  ...DefaultTheme,
  enhanceApp: async ({ app, router, siteData }) => {
    // app is the Vue 3 app instance from `createApp()`. router is VitePress'
    // custom router. `siteData`` is a `ref`` of current site-level metadata.
    // app.use(elementplus);
    app.use(BlButton);
  },
};