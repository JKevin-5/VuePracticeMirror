import * as zhConfig from './zh'

export const themeConfig = {
    // tab栏的图标; 图片 / 会自动去public文件夹里找图片
    logo: "./images/logo.svg", // 顶部导航条
    navbar: zhConfig.navbar,
    sidebar: zhConfig.sidebar,
    sidebarDepth: 4,
    editLink: false,
    // github地址
    repo: "https://github.com/JKevin-5",
    // 搜索框
    search: true,
    searchMaxSuggestions: 10,
    pagePatterns: ['!**/_*.md','!node_modules']
}