---
title: Gsap使用
date: 2025-05-10
categories:
    - code
tags:
    - FrontEnd
---

# GSAP

> [GSAP](https://gsap.com/) 开放免费使用了，所以开始学习这个前端出名的动画库。

## 引入项目
> 使用pnpm引入

```bash
pnpm install gsap
```

## 基本使用
::: code-group
```html
<div class="layout">
    <div class="box green"></div>
</div>
<n-button @click="move">Play</n-button>
```
```js
import { gsap } from 'gsap'
import { NButton } from 'naive-ui'

const move = () =>{
    gsap.from(".box", {
        opacity: 0, 
        y: 100, 
        duration: 1
    });
}
```
```css
.layout{
    display:flex;
    align-items:center;
    justify-content:center;
    min-height:30vh;
    background-color: black;
    margin: 20px;
    border-radius: 10px;
}
.box{
    height: 100px;
    width: 100px;
}
.green{
    background-color:#0ae448;
}
```
:::

**Demo**
<div class="layout">
    <div class="box green"></div>
</div>
<n-button @click="move">Play</n-button>

<script setup>
import { gsap } from 'gsap'
import { NButton } from 'naive-ui'

const move = () =>{
    gsap.from(".box", {
        opacity: 0, 
        y: 100, 
        duration: 1
    });
}
</script>
<style scoped>
.layout{
    display:flex;
    align-items:center;
    justify-content:center;
    min-height:30vh;
    background-color: black;
    margin: 20px;
    border-radius: 10px;
}
.box{
    height: 100px;
    width: 100px;
}
.green{
    background-color:#0ae448;
}
</style>