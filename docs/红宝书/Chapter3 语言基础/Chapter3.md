# Chapter3 语言基础

## 3.7 函数

> 第十章会进行详细介绍

```js
function functionName(arg0, arg1,...,argN) {
		statements
} 
```

ps：只要碰到return语句，函数就会立即停止执行并退出。

**常见的提前终止函数执行操作：**

```js
function sayHi(name, message) {
		return;
		console.log("Hello " + name + ", " + message); // 不会执行
} 
```

return语句可以不带返回值，默认会返回undefined。不写return语句的函数，默认也会返回undefined。

**严格模式对函数有一些限制：**

- 函数不能以eval或arguments作为名称；
- 函数参数也不能叫eval或arguments；
- 两个命名参数不能拥有同一个名称。

## 3.8 小结

- ECMAScript的基本类型包括：undefined、Null、Boolean、Number、String和Symbol。
- 不区分浮点数和整数，只有Number一种数值数据类型。
- 