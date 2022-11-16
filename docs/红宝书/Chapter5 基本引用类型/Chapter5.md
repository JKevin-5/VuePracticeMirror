# Chapter5 基本引用类型

[TOC]

> 本章内容：
>
> - 理解对象
> - 基本JavaScript数据类型
> - 原始值与原始值包装类型

引用值（或者对象）是某个特定引用类型的实例。和类并不是一个概念。

对象被认为是某个特定引用类型的实例。新对象通过使用new操作符后跟一个构造函数来创建。构造函数就是用来创建新对象的函数。

<b>函数也是一种引用类型，第10章专门用来介绍函数。</b>

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



### 5.3.1 Boolean

创建Boolean对象。

```js
let booleanObject = new Boolean(true);
```

区别1：

```js
let falseObject = new Boolean(false);
let result = falseObject && true;
console.log(result); // true
```

<b>所有对象在布尔表达式中都会自动转换为true。</b>

区别2:

```js
typeof falseObject; // object
typeof falseValue;	// boolean
falseObject instanceof Boolean; // true
falseValue instanceof Boolean;	// false
```

ps：强烈建议不要使用Boolean包装类型。

### 5.3.2 Number

创建Number对象

```js
let numberObject = new Number(10);
```

isInteger()方法

Es6新增了这个方法，用于判断是否为整数。

### 5.3.3 String

创建String对象

```js
let stringObject = new String(“hello world”)；
```

| 方法名、属性                            | 作用                                             |
| --------------------------------------- | ------------------------------------------------ |
| valueOf()、toLocaleString()、toString() | 返回对象原始字符串值                             |
| length                                  | 字符串中字符的数量                               |
| chartAt(x)                              | 返回索引位置对应的字符                           |
| fromCharCode()                          | 方法用于根据给定的 UTF-16 码元创建字符串中的字符 |
| ....                                    | 一些跟字符字符串码有关的函数                     |

#### 3. 字符串操作方法（重要）

- concat()

​	用于将一个或多个字符串拼接成一个新的字符串。

```js
let stringValue = "hello ";
let result = stringValue.concat("world");
console.log(result); 			// "hello world"
console.log(stringValue); // "hello" 
```

​	不会修改原有的字符串，可以同时拼接多个字符串。

- slice()
- substr()
- substring()

第一个参数标识子字符串开始的位置，第二个参数标识子字符串结束的位置。任何情况下，省略第二个参数都意味着提取到字符串末尾。和concat一样，不会修改调用它们的字符串。

第二个参数是正数的情况下是差不多的，如果是负数的情况。

```js
let stringValue = "hello world"; 
// slice 字符串的长度加上负数条件
console.log(stringValue.slice(-3)); // "rld"
// substring 方法会将所有负值都转换为0
console.log(stringValue.substring(-3)); // "hello world"
// substr 方法会将第一个负值当作字符串长度加上负值，将第二个负参数值转换为0
console.log(stringValue.substr(-3)); // "rld" 
```

#### 4.字符串位置方法

- indexOf()
- lastIndexOf()

两个方法从字符串中搜索传入的字符串，并返回位置，如果没找到，则返回-1。

区别在于：indexOf是正向查询，lastIndexOf是反向查询。

indexOf('目标字符串',)

...(有空需要将这些方法进行汇总)

### 5.4 单例内置对象

#### 5.4.1 Global

代码不会显式访问，在全局作用域中定义的变量和函数都会变成Global对象的属性。

#### 5.4.2 window对象

虽然没有直接访问Global对象的方式，浏览器将window对象实现为Global对象的代理。

方法1：直接使用window对象可以直接调用Global对象的属性和函数。

方法2：

```js
let global = function(){
  return this;
}();
```

#### 5.4.3 Math

各种数学计算的函数和数值。

### 5.5 小结

js中的对象称为引用值，几种内置的引用类型可以用来创建特定类型的对象：

- 引用值与传统面向对象编程语言中的类相似，但实现不同
- Date类型提供关于日期和时间的信息，包括当前日期、时间及相关计算
- RegExp类型是ECMAScript支持正则表达式的接口，提供了大多数基础的和部分高级的正则表达式功能。

函数实际上也是Function类型的实例，函数也是对象，所以函数也有方法。

由于有原始值包装类型的存在，js中原始值可以被当成对象来使用。有三种原始值包装类型：Boolean、Number、String，具备以下特点：

- 每种包装类型都映射到同名的原始类型；
- 以读模式访问原始值时，后台会实例化一个原始值包装类型的对象，借助这个对象可以操作响应的数据。
- 涉及原始值的语句执行完毕后，包装对象就会被销毁。

当代码开始执行时，全局上下文中会存在两个内置对象：Global、Math。

- Global对象在大多数CMAScript实现中无法直接访问
- 浏览器将Global对象实现为window对象。
- 所有全局变量和函数都是Global对象的属性。
- Math对象包含辅助完成复杂计算的属性和方法。

















