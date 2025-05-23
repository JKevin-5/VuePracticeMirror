import { defineConfig } from 'vitepress'

const fileAndStyles: Record<string, string> = {}

export default defineConfig({
  base:'',
  title: "JKevin's Notes",
  description: "",
  head: [
    ['link', { rel: 'icon', type: 'image/svg+xml', href: '/logo.svg' }]
  ],
  themeConfig: {
    // https://vitepress.dev/reference/default-theme-config
    nav: [
      { text: 'Posts', link: '/posts/gsap' },
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
              },
              { 
                text: 'vitepress',
                link: '/notes/vitepress/',
                activeMatch: '/notes/vitepress/',
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
            { text: 'gsap', link: '/posts/gsap'}
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
      message: 'ICP备案/许可证号：<a href="https://beian.miit.gov.cn/" target="_blank">闽ICP备2025091580号-1</a> <br/> <a href="https://beian.mps.gov.cn/#/query/webSearch?code=35021102002269" rel="noreferrer" target="_blank">闽公网安备35021102002269号</a>',
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
  vite: {
    ssr: {
      noExternal: ['naive-ui', 'date-fns', 'vueuc']
    }
  },
  postRender(context) {
    const styleRegex = /<css-render-style>((.|\s)+)<\/css-render-style>/
    const vitepressPathRegex = /<vitepress-path>(.+)<\/vitepress-path>/
    const style = styleRegex.exec(context.content)?.[1]
    const vitepressPath = vitepressPathRegex.exec(context.content)?.[1]
    if (vitepressPath && style) {
      fileAndStyles[vitepressPath] = style
    }
    context.content = context.content.replace(styleRegex, '')
    context.content = context.content.replace(vitepressPathRegex, '')
  },
  transformHtml(code, id) {
    const html = id.split('/').pop()
    if (!html)
      return
    const style = fileAndStyles[`/${html}`]
    if (style) {
      return code.replace(/<\/head>/, `${style}</head>`)
    }
  }
})
