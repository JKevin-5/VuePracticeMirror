---
title: QMS管理系统
description: 
editLink: false
---

# QMS管理系统

## 一、项目设计

## 二、功能点

1. 统一的附件管理插件（前端）

2. excel文件生成

3. 内部转发外部系统请求

4. pdf文件生成
    - 特殊符号使用
    - pdf文件的拼接
    - 图片插入
    - 内容循环
    - 共通函数

5. 多线程并发处理接口数据
    - 主线程等待子线程执行并返回结果

6. aop实现统一访问日志注解

7. 前后端字符集的制作与使用
    - 前端使用svg在线生成tff等格式的字体文件
    - 后端使用svg在FontForge工具，利用python脚本生成ttf文件
    ::: details 点击查看参考网站
    1. [前端如何制作字体](https://blog.csdn.net/Renners/article/details/125540555)
    2. [png自动转ttf字体](https://blog.csdn.net/qianbin3200896/article/details/125177765)
    3. [itextPdf使用中文字体](https://www.cnblogs.com/whalesea/p/11752086.html)
    4. [itextPdf如何在一行中使用两种不同的字体](https://blog.csdn.net/weixin_44976057/article/details/124099648)
    :::
## 三、实现过程