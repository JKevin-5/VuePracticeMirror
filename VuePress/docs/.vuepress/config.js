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
import { pwaPlugin } from '@vuepress/plugin-pwa'
import { pwaPopupPlugin } from '@vuepress/plugin-pwa-popup'
import { docsearchPlugin } from '@vuepress/plugin-docsearch'

const __dirname = getDirname(import.meta.url)
export default defineUserConfig({
  plugins: [
    // searchPlugin({
    //   // 配置项
    // }),
    docsearchPlugin({
      appId: '3G9YA5HJFG',
      apiKey: '774133dcae945ede2a86767aeb85af57',
      indexName: 'jkevin-5io',
      locales: {
        '/': {
          placeholder: '搜索文档',
          translations: {
            button: {
              buttonText: '搜索文档',
            },
          },
        },
        '/zh/': {
          placeholder: '搜索文档',
          translations: {
            button: {
              buttonText: '搜索文档',
            },
          },
        }
      }
    }),
    vuepressPluginAnchorRight(),
    codeCopy({
      // copybuttonText: '复制',
      // copiedButtonText: '已复制！'
    }),
    registerComponentsPlugin({
      // 配置项
      componentsDir: path.resolve(__dirname,'./components')
    }),
    // vuepressPluginPage(),
    usePagesPlugin({
			// 配置项
			startsWith: "/", // fetch only matched paths
			filter: page => page.data.lang === "zh-CN" && page.path !== "/404.html", // fetch only filtered pages
			sort: (a, b) => b.data.git.updatedTime - a.data.git.updatedTime,
			limit: 20, // maximum cached size
			file: "pages.js",
		}),
    pwaPlugin(),
    pwaPopupPlugin({
      // 配置项
    }),
  ],
  lang: "zh-CN",
  title: "Kevin's Notes",
  port:8090,
  description: "Welcome to my blog! ",
  // vue log https://vuejs.org/images/logo.png
  head: [
    ['link', { rel: 'icon', href: './images/logo.svg' }],
    ['link', { rel: 'manifest', href: '/manifest.webmanifest' }],
    ['meta', { name: 'theme-color', content: '#ffffff' }]
  ],
  // 新增导航条的配置
  theme: defaultTheme(themeConfig),
  // 替换默认主题中的Home.vue文件
  alias: {
    '@theme/Home.vue':path.resolve(__dirname, './theme/components/Home.vue')
  },
  markdown: {
    headers:{
      level: [2,3,4]
    }
  }
});
