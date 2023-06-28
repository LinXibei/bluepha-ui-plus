import DefaultTheme from "vitepress/theme";
import "element-plus/dist/index.css";
import elementplus from "element-plus";
import { BlButton } from "../../../dist/bluepha-plus/es/components/index.mjs";
export default {
  ...DefaultTheme,
  enhanceApp: async ({ app, router, siteData }) => {
    // app is the Vue 3 app instance from `createApp()`. router is VitePress'
    // custom router. `siteData`` is a `ref`` of current site-level metadata.
    // app.use(elementplus);
    console.log(12121, app);
    console.log(1111, BlButton);
    app.use(BlButton);
  },
};