---
title: 站内信管理系统
description: 
editLink: false
---

# 站内信管理系统

## 一、项目设计

## 二、功能点

1. 站内信推送（websocket）
    - nginx单独配置，需要单独对websocket路径进行配置
    - chrome如何调试ws
    - 前端websocket如何编写
    - 后端工具类以及config配置类
    - 站内信是否通知可配置

2. 站内信自定义模板
    - 使用freeMarker，利用模板实现站内信内容自定义
    - 使用一个模板文件，从数据库存取模板内容，实现多个规则模板自定义

3. 站内信插件实现
    - plugin如何引入其他系统（factory、configuration）
    - 利用注解aop的方式实现站内信生成，注解可传对象
    - jsonb字段的存取（非方言、对引入系统无限制）

4. 站内信前端
    - 通知按钮铃铛实现
    - 模板插件codemirror使用
    - 多选框以及选中结果的预览显示

## 三、实现过程