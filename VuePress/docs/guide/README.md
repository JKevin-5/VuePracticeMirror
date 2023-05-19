---
title: Vuepress 操作手册
description: vuepress
sidebar: auto
editLink: false
---
[[toc]]
 ## 一、初始化
 ### 1.1 官网地址
> 每次更新beta版本，都需要留意是否发生变化。
 - [VuePress框架官网地址](https://v2.vuepress.vuejs.org/zh/)

 ### 1.2 当前博客使用的版本
 | 依赖 | 版本号 |
 | --- | ---|
 |node.js|v16.13.0|
 |VuePress|v2.0.0-beta.61(last)|

 在`package.json`中使用固定版本`"vuepress": "2.0.0-beta.61"`

## 二、Vuepress config结构

整体配置内容：
```json
export default defineUserConfig({

})
```

配置某个页面的侧边栏：
```json
theme: defaultTheme({
    sidebar: {
        "/画面地址/":[{
            text: "画面名称",
            collapsible: false, // 是否折叠
            children: []
        }]
})
```

配置顶部导航栏：
```json
theme: defaultTheme({
    navbar: [
        '页面路径', // 显示的名称是页面的介绍
        {
            text:'菜单名称',
            children: ['子页面路径']
        }
    ]
})
```