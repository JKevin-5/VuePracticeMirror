import { defineConfig } from 'vitepress'
import { MermaidPlugin,MermaidMarkdown,withMermaid } from "vitepress-plugin-mermaid";
// https://vitepress.dev/reference/site-config
export default withMermaid(defineConfig({
  base:'/v3',
  title: "JKevin's Notes",
  description: "",
  head: [
    ['link', { rel: 'icon', type: 'image/svg+xml', href: '/v3/logo.svg' }]
  ],
  themeConfig: {
    // https://vitepress.dev/reference/default-theme-config
    nav: [
      { text: 'Posts', link: '/posts/' },
      { 
        text: 'Demos',
        link: '/demos/java',
        activeMatch: '/demos/'
      },
      { text: 'Projects', link: '/projects/' },
      {
        text: 'More',
        items: [
          { 
            text: '后端',
            items:[          
              { text: 'Java', link: '/notes/java/' }
            ] 
          },
          { 
            text: '前端',
            items:[          
              { text: 'JavaScript', link: '/notes/js' },
              { 
                text: 'Vue2',
                link: '/notes/vue2/vuex',
                activeMatch: '/notes/vue2/' 
              }
            ] 
          },
        ]
      }
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
      ],
      "/posts/":[
        {
          items: [
            { text: 'test', link: '/posts/test'}
          ]
        }
      ],
      "/demos/":[
        { text: 'java', link: '/demos/java'},
        { text: 'javaScript', link: '/demos/js'}
      ],
      "/notes/java/":[
        {
          items: [
            { text: 'Overview 概览', link: '/notes/java/'},
            { 
              text: 'Collections 集合',
              collapsed: false,
              items: [
                { text: 'list', link: '/notes/java/collections/list' },
                { text: 'set', link: '/notes/java/collections/set' }
              ]
            },
          ]
        }
      ],
      "/notes/vue2/":[
        {
          items:[
            {
              text:'Vue2',
              collapsed: false,
              items:[
                { text: 'vuex', link: '/notes/vue2/vuex'},
              ]
            }
          ]
        }
      ]
    },
    socialLinks: [
      { icon: 'github', link: 'https://github.com/JKevin-5' },
      { icon:{
          svg: '<svg t="1717147049628" class="icon" viewBox="0 0 1329 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="4334" width="200" height="200"><path d="M553.389714 268.909714h0.082286l99.565714-79.186285-99.565714-79.899429L553.307429 109.714286l-99.401143 79.844571 99.401143 79.268572 0.054857 0.082285z m0.082286 249.792l0.054857-0.054857 256.868572-202.642286-69.668572-55.954285-187.2 147.702857-0.054857 0.054857-0.054857 0.054857-187.227429-147.702857-69.586285 55.954286 256.813714 202.642285 0.054857-0.054857z m-0.109714 138.514286l0.109714-0.054857 343.899429-271.350857 69.668571 55.954285-156.48 123.428572L553.472 768 146.651429 447.222857 139.958857 441.929143l69.668572-55.954286 343.734857 271.268572z" fill="#1E80FF" p-id="4335"></path></svg>'
        },
        link: 'https://juejin.cn/user/2154698523021608'
      }
    ],
    // 页脚
    footer: {
      message: 'Keep Leaning',
      copyright: `Copyright © 2023-${new Date().getFullYear()} JKevin`
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
      label: 'Menu',
      level: [2,4]
    },
  },
}))
