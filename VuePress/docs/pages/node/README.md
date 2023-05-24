---
title: node
description: 记录关于node相关的所有知识点
sidebar: auto
editLink: false
---
## 在windows上对node进行管理
[如何在windows下更换node版本](https://blog.csdn.net/qq_33745371/article/details/109039414)

```bash
    # 查看当前node版本
    nvm current
    # 查看所有可用的node版本
    nvm list available
    # 下载具体哪个版本的node
    nvm install 16.20.0
    # 切换node版本
    nvm use 16.20.0
    # 查看本地哪些版本
    nvm ls
```

## vuepress 2.x版本与node版本对应关系

使用node v18 vite编译会出错，切换为node v16就不会出错。

## npm
### npm下载指定版本的包
```bash
    # 下载指定具体版本号
    npm install vue@1.1.0
    # 下载1版本中目前最新的版本
    npm install vue@1
```