---
title: VueRouter路由
description: 
editLink: false
---

# VueRouter

## 路由跳转

> 路由跳转的方式有两种，一种根据name进行隐式的params传递，另一种是根据path路径进行的显式query传递。

### 1、name跳转页面
:::: code-group
::: code-group-item 跳转动作
```js
this.$router.push({name:'anotherPage',params:{id:1}});
```
:::
::: code-group-item 接收动作
```js
this.$route.params.id
```
:::
::::

### 2、path跳转页面
path跳转会将参数显示到url上。
:::: code-group
::: code-group-item 跳转动作
```js
this.$router.push({path:'/anotherPage',query:{id:1}});
```
:::
::: code-group-item 接收动作
```js
this.$route.query.id
```
:::
::::