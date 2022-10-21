import { defineUserConfig, defaultTheme } from "vuepress";
import { searchPlugin } from '@vuepress/plugin-search'

export default defineUserConfig({
  plugins: [
    searchPlugin({
      // 配置项
      // 排除首页
      isSearchable: (page) => page.path !== '/',
      test:['/guide/','pages']
    }),
  ],
  lang: "zh-CN",
  title: "你好， VuePress ！",
  port:8090,
  description: "这是我的第一个 VuePress 站点",
  //新增导航条的配置
  theme: defaultTheme({
    // tab栏的图标; 图片 / 会自动去public文件夹里找图片
    logo: "https://vuejs.org/images/logo.png", // 顶部导航条

    navbar: [
      {
        text: "介绍",
        link: "/pages/introduce.md",
      }, // NavbarGroup
      {
        text: "教程",
        children: [
          {
            text: "安装指南",
            link: "/pages/learnJTs/install_guide.md", // 该元素将一直处于激活状态
            activeMatch: "/pages/learnJTs/install_guide.md",
          },
          {
            text: "API使用",
            link: "/pages/learnJTs/detail_usage.md",
            activeMatch: "/pages/learnJTs/detail_usage.md",
          },
          {
            text: "待定...",
            link: "/pages/other/other.md",
          },
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
    },
    // github地址
    repo: "https://github.com/JKevin-5/Font-endPractice",
    // 搜索框
    search: true,
    searchMaxSuggestions: 10
  }),
});
