import { defineUserConfig, defaultTheme } from "vuepress";
import { searchPlugin } from '@vuepress/plugin-search'
import { mediumZoomPlugin } from '@vuepress/plugin-medium-zoom'

export default defineUserConfig({
  plugins: [
    searchPlugin({
      // 配置项
      // 排除首页
      isSearchable: (page) => page.path !== '/',
      test:['/guide/','pages']
    }),
    mediumZoomPlugin({
    })
  ],
  lang: "zh-CN",
  title: "Kevin's Notes",
  port:8090,
  description: "这是我的第一个 VuePress 站点",
  //新增导航条的配置
  theme: defaultTheme({
    // tab栏的图标; 图片 / 会自动去public文件夹里找图片
    logo: "https://vuejs.org/images/logo.png", // 顶部导航条

    navbar: [
      {
        text: "介绍",
        link: "/guide/",
      }, // NavbarGroup
      {
        text: "红宝书学习笔记",
        children: [
          {
            text: "介绍",
            link: "/redBook/", // 该元素将一直处于激活状态
            activeMatch: "/redBook/"
          }
        ],
      },
    ],
    sidebar: {
      "/guide/": [
        {
          text: "guide",
          collapsible: true,
          children: ["/guide/README.md", "/guide/getting-started.md"],
        },
        {
          text: "guide",
          collapsible: true,
          children: ["/guide/README.md", "/guide/getting-started.md"],
        },
      ],
      "/redBook/": [
        {
          text: "Chapter3",
          collapsible: true,
          children: ["/redBook/Chapter3.md"],
        },{
          text: "Chapter4",
          collapsible: true,
          children: ["/redBook/Chapter4.md"],
        },{
          text: "Chapter5",
          collapsible: true,
          children: ["/redBook/Chapter5.md"],
        }
      ]
    },
    // github地址
    repo: "https://github.com/JKevin-5/Font-endPractice",
    // 搜索框
    search: true,
    searchMaxSuggestions: 10
  }),
});
