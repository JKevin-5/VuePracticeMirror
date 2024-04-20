import { defineConfig } from 'vitepress'

// https://vitepress.dev/reference/site-config
export default defineConfig({
  base:'/v3/',
  title: "JKevin's Notes",
  description: "",
  themeConfig: {
    // https://vitepress.dev/reference/default-theme-config
    nav: [
      { text: 'Home', link: '/' },
      { text: 'Examples', link: '/markdown-examples' },
      { text: 'Test', link: '/' }
    ],

    sidebar: [
      {
        text: 'Examples',
        items: [
          { text: 'Markdown Examples', link: '/markdown-examples' },
          { text: 'Runtime API Examples', link: '/api-examples' }
        ]
      }
    ],

    socialLinks: [
      { icon: 'github', link: 'https://github.com/JKevin-5' }
    ],
    // 页脚
    footer: {
      message: '',
      copyright: 'Copyright © 2023-present JKevin'
    },
    // 搜索
    search: {
      provider: 'local'
      // provider: 'algolia',
      // options: {
      //   appId: '3G9YA5HJFG',
      //   apiKey: '774133dcae945ede2a86767aeb85af57',
      //   indexName: 'jkevin-5io',
      // }
    }
  }
})
