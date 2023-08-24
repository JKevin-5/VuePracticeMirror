---
title: Vuepress 操作手册
description: vuepress
sidebar: false
editLink: false
---

# Vuepress配置

 ## 一、初始化
 ### 1.1 官网地址
> 每次更新beta版本，都需要留意是否发生变化。
 - [VuePress框架官网地址](https://v2.vuepress.vuejs.org/zh/)

 ### 1.2 当前博客使用的版本
 | 依赖 | 版本号 |
 | --- | ---|
 |node.js|v16.13.0|
 |VuePress|v2.0.0-beta.61(last)|

 在`package.json`中推荐以下配置：
 ```json
 {
  "devDependencies": {
    "@vuepress/plugin-search": "2.0.0-beta.61",
    "vuepress": "2.0.0-beta.61",
    "vuepress-plugin-anchor-right": "^0.0.1-beta.18"
  },
  "scripts": {
    "docs:dev": "vuepress dev docs",
    "docs:build": "vuepress build docs"
  }
}
 ```
例如，想要手动引入一个外部第三方的plugin，需要check该插件的所依赖的vuepress版本号，以`vuepress-plugin-use-pages`为例。
```bash
# 查看该依赖的最新信息
npm view vuepress-plugin-use-pages
# 查看该依赖的具体版本数据
npm view vuepress-plugin-use-pages@1.0.5

# 结果
...
dependencies:
@vuepress/core: ^2.0.0-beta.48 

maintainers:
- mon_sat <tanaka.kohji@gmail.com>

dist-tags:
latest: 1.0.5

published 11 months ago by mon_sat <tanaka.kohji@gmail.com>
```
可知所依赖的依赖版本号，并且选择使用小于等于当前vuepress版本的依赖版本即可。

## 二、Vuepress config结构

### 1、整体配置内容
```js
export default defineUserConfig({

})
```

### 2、配置某个页面的侧边栏
使用默认主题。
```js
theme: defaultTheme({
    sidebar: {
        "/画面地址/":[{
            text: "画面名称",
            collapsible: false, // 是否折叠
            children: []
        }]
})
```

### 3、配置顶部导航栏
使用默认主题。
```js
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

### 4、配置浏览器标签页icon
```js
export default defineUserConfig({
    ...
    head: [['link', { rel: 'icon', href: 'https://vuejs.org/images/logo.png' }]],
    ...
})
```

## 三、Vuepress插件开发-上手

### 1、前言
因为想要开发一个类似github的热力图记录博客的更新频率和数量，因此就花了一点时间搜索相关插件的开发流程。<br/>
根据查询的资料来看，整体分为两种：<br/>
1. 基于`vuepress 1.x`进行的插件开发，里面使用到vue2以及对应的vuepress版本的api；
2. 基于`vuepress 2.0.x`的开发，使用到的是vue3的api，需要特别说明的是`vuepress 2.0.x`中的api相比较于`vuepress1.x`，有了些许变化，围绕着ES6和vue3进行改动。

### 2、参考博客
- [从零实现一个VuePress插件](https://juejin.cn/post/7052994563295674405)
- [vuepress 右侧目录插件 vuepress-plugin-anchor-right](https://www.cnblogs.com/dingshaohua/p/16618802.html)<br/>
**第一篇博客**，介绍了`codecopy plugin`的`vuepress1.x`的实现过程，虽然博客中提及到了`vuepress2.x`的官方文档，但是实际开发的代码还是用的codecopy一代`vuepress 1.x`的内容。<br/>
**第二篇博客**，本blog使用的右侧目录插件，使用`vuepress2.x`进行开发，通过该插件的node_moudules中的代码，与第一篇博客进行了对比学习。

### 3、具体实现


## 四、Vuepress插件开发-进阶

### 1