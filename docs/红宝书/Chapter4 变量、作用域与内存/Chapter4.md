# Chapter4 变量、作用域与内存

[TOC]

> 本章内容：
>
> - 通过变量使用原始值与引用值
> - 理解执行上下文
> - 理解垃圾回收

JavaScript的变量是松散类型，变量是特定时间点一个特定值的名称而已。

## 4.1 原始值与引用值

**原始值：**最简单的数据。

6种原始值：Undefined、Null、Boolean、Number、String和Symbol。

**引用值：**由多个值构成的对象。

引用值是保存在内存中的对象，操作对象实际上操作的是对该对象的引用而非对象本身。

### 4.1.1 动态属性

原始值不能有属性，尽管尝试给原始值添加属性不会报错。

```js
let name = "Nicholas";
name.age = 27;
console.log(name.age); // undefined
```

使用new关键字，Js会创建一个Object类型的实例，但其行为类似原始值。

```js
let name1 = "Nicholas";
let name2 = new String("Matt");
name1.age = 27;
name2.age = 26;
console.log(name1.age); // undefined
console.log(name2.age); // 26
console.log(typeof name1); // string
console.log(typeof name2); // object
```

### 4.1.2 复制值

原始值的复制是将一个原始值复制到新变量的位置（地址），是一个全新的变量，互不干扰。

引用值的复制是将一个引用值的地址复制到新变量的地址上，实际复制的值是一个指针，两个变量指向的是同一个对象，因此一个对象上面的变化会再另一个对象上反映出来。

### 4.1.3 传递参数

ECMAScript中所有函数的参数都是按值传递的。这意味着函数外的值会被复制到函数内部的参数中，会遵循原始值或引用值的复制规则进行。

- 函数中的原始值传递，不会影响到外部变量；

  ```js
  function addTen(num) {
     num += 10;
     return num;
  }
  let count = 20;
  let result = addTen(count);
  console.log(count); // 20，没有变化
  console.log(result); // 30
  ```

- 函数中的引用值传递，也是按值传递的，会影响到外部变量

  ```js
  function setName(obj) {
    obj.name = "Nicholas";
  }
  let person = new Object();
  setName(person);
  console.log(person.name); // "Nicholas"
  ```

- ES中函数的参数是局部变量（本地对象），在函数执行结束时就被销毁。

  ```js
  function setName(obj) {
    obj.name = "Nicholas";
    obj = new Object();
    obj.name = "Greg";
  }
  let person = new Object();
  setName(person);
  console.log(person.name); // "Nicholas" 
  ```

### 4.1.4 确定类型

**typeof**

- 可以用来判断原始值：字符串、数值、布尔值或undefined。

- 如果是null或对象，typeof返回object。
- 如果是函数，typeof返回function

**instanceof**

- 可以判断一个对象是什么类型的对象。
- 检测原始值，始终返回false；
- 检查引用值，始终返回true；



## 4.2 执行上下文与作用域

每个上下文都有一个关联的**变量对象**，这个上下文中定义的所有变量和函数都会存在这个对象上，但无法通过代码访问**变量对象**。

**全局上下文：**

最外层的上下文，不同宿主环境中，全局上下文的对象可能不一样。在浏览器中，window对象就是全局上下文，因此所有通过var
