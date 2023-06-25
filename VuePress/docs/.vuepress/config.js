import { defineUserConfig, defaultTheme } from "vuepress";
import vuepressPluginAnchorRight from 'vuepress-plugin-anchor-right';
import { searchPlugin } from '@vuepress/plugin-search'
import codeCopy from './vuepress-plugin-code-copy'
// import vuepressPluginPage from './plugins/page.js'
// git pages
import { usePagesPlugin } from "vuepress-plugin-use-pages"
import { themeConfig } from './config/index'
import { registerComponentsPlugin } from '@vuepress/plugin-register-components'
import { getDirname, path } from '@vuepress/utils'

const __dirname = getDirname(import.meta.url)
export default defineUserConfig({
  plugins: [
    searchPlugin({
      // 配置项
    }),
    vuepressPluginAnchorRight(),
    codeCopy({
      // copybuttonText: '复制',
      // copiedButtonText: '已复制！'
    }),
    registerComponentsPlugin({
      // 配置项
    }),
    // vuepressPluginPage(),
    usePagesPlugin({
			// 配置项
			startsWith: "/", // fetch only matched paths
			filter: page => page.data.lang === "zh-CN" && page.path !== "/404.html", // fetch only filtered pages
			sort: (a, b) => b.data.git.updatedTime - a.data.git.updatedTime,
			limit: 20, // maximum cached size
			file: "pages.js",
		})
  ],
  lang: "zh-CN",
  title: "Kevin's Notes",
  port:8090,
  description: "Welcome to my blog! ",
  head: [['link', { rel: 'icon', href: 'https://vuejs.org/images/logo.png' }]],
  //新增导航条的配置
  theme: defaultTheme(themeConfig),
  alias: {
    '@theme/Home.vue':path.resolve(__dirname, './theme/components/Home.vue')
  }
});
