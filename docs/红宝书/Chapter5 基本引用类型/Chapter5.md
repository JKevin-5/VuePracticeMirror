# Chapter5 基本引用类型

[TOC]

> 本章内容：
>
> - 理解对象
> - 基本JavaScript数据类型
> - 原始值与原始值包装类型

引用值（或者对象）是某个特定引用类型的实例。和类并不是一个概念。

对象被认为是某个特定引用类型的实例。新对象通过使用new操作符后跟一个构造函数来创建。构造函数就是用来创建新对象的函数。

==函数也是一种引用类型，第10章专门用来介绍函数。==

## 5.1 Date

创建日期对象

```js
let now = new Date();
```

日期对象格式化（String字符串转Date对象）

- 月/日/年
- 月名 日，年
- 周几 月名 日 年 时:分:秒 时区

```js
let someDate = new Date(Date.parse("May 23, 2019"));
// 等同于
let someDate = new Date("May 23, 2019");
```

### 5.1.1 继承的方法

与其他类型一样，Date 类型重写了 toLocaleString()、toString()和 valueOf()方法。但与 其他类型不同，重写后这些方法的返回值不一样。

...

### 5.1.2 日期格式化方法

...

### 5.1.3 日期/时间组件方法

...

## 5.2 RegExp

> ECMAScript 通过 RegExp 类型支持正则表达式。



## 5.3 原始值包装类型

ECMAScript提供了3种引用类型：Boolean、Number和String。

```js
let s1 = "some text";
let s2 = s1.substring(2);// s1对象仅存活在该代码的执行生命周期
```

原始值本身不是对象，因此在逻辑上也不应有方法。

后台执行三个步骤：

1. 创建一个String类型的实例；
2. 调用实例上的特定方法；
3. 销毁实例；

```js
// 可想象为以下执行过程
let s1 = new String("some text");
let s2 = s1.substring(2);
s1 = null;
```



### 5.3.1

