import { defineConfig } from 'vitepress'
import { MermaidPlugin,MermaidMarkdown,withMermaid } from "vitepress-plugin-mermaid";

// https://vitepress.dev/reference/site-config
export default withMermaid(defineConfig({
  base:'/v3/',
  title: "JKevin's Notes",
  description: "",
  themeConfig: {
    // https://vitepress.dev/reference/default-theme-config
    nav: [
      { text: 'Home', link: '/' },
      { text: 'Examples', link: '/examples/' },
      { text: 'Test', link: '/test' }
    ],
    sidebar: {
      "/examples/":[
        {
          text: 'examples',
          items: [
            { text: 'Markdown Examples', link: '/examples/markdown-examples' },
            { text: 'Runtime API Examples', link: '/examples/api-examples' }
          ]
        }
      ]
    },

    socialLinks: [
      { icon: 'github', link: 'https://github.com/JKevin-5' }
    ],
    // 页脚
    footer: {
      message: '',
      copyright: 'Copyright © 2023-2024 JKevin'
    },
    // 搜索
    search: {
      // 测试webhook
      provider: 'local'
      // provider: 'algolia',
      // options: {
      //   appId: '3G9YA5HJFG',
      //   apiKey: '774133dcae945ede2a86767aeb85af57',
      //   indexName: 'jkevin-5io',
      // }
    },
    outline: {
      label: 'Title'
    },
    
  }
}))
