---
title: Module 模块化
description: Module
---
> 本章为[红宝书 Chapter26](../Chapter26.md) 结合外部资料整理，主要聚焦在ES6与CommonJS的使用差异上。

## 一、before 模块化

- [参考文章](https://blog.csdn.net/qq_39903567/article/details/115325717)

在模块化正式出现之前，临时对策是使用全局对象、全局函数、闭包实现伪模块化。

:::tip
在ES6出现的class，其实不是一个全新的数据类型，实际上是`function`或`object`。
:::

### 1.1、全局函数
1. 实例：
    ```js
    // fun.js
    var fun = function(){
        console.log("this is fun")
    }
    // 全局使用
    fun();
    ```
2. 缺点：<br/>
    - 污染全局命名空间，无法明晰的查看模块之间的关系，容易重复混淆。

### 1.2、全局对象(namespace模式)
1. 实例：
    ```js
    // Object.js
    var Object = {
        A:'A',
        B:function(){}
    }
    // 全局使用
    console.log(Object.A);
    Object.A = 'B';// 可修改
    Object.B();
    ```
2. 缺点：<br/>
    - 虽然减少命名空间的冲突，但是仍然无法明晰的查看模块之间的关系，容易重复混淆。

### 1.3、IIFE模式：匿名函数自调用(闭包)
- [红宝书 Chapter26 模块定义-参考](../Chapter26.md#_26-2-2-命名空间)
- [红宝书 Chapter26 暴露公共API-参考](../Chapter26.md#_26-2-3-暴露公共api)
1. 实例：
    ```js
    myModule.js
    (function(window) {
        let data = ''; // data为内部数据
        function fun1(){
            console.log(data);
        }
        function fun2(){
            fun1();
        }
        window.myMoudule = {
            myFun1:fun1
        }
    })(window)
    // 全局调用
    myModule.myFun1();
    console.log(myModule.data); // 无法读取未暴露内容
    ```
2. 缺点
    - 需要单独暴露，不够灵活
    - 外部引入需要自行添加调用

## 二、 模块化ing
- AMD/CMD


## 三、ES6模块化


## 四、CommonJs模块化（node环境）

