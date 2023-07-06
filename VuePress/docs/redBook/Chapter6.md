---
title: Charpter6 集合引用类型
description: Charpter6
prev: /redBook/Chapter5.md
next: /redBook/Chapter11.md
---

# Chapter6 集合引用类型

>  本章内容：
>
> - 对象
> - 数组与定型数组
> - Map、WeakMap、Set以及WeakSet类型

## 6.1 Object

大多数引用值的示例使用的是Object类型，虽然Object实例没有多少功能，但很适合存储和在应用程序间交换数据。

### 创建Object实例

1. 使用new操作符和Object构造函数

   ```js
   let person = new Object();
   // 另一
   let person = {};
   person.name = "Tom";
   person.age = 29;
   ```

2. 使用对象字面量表示法。对象字面量是对象定义的简写形式，目的是为了简化包含大量的对象的创建。

   ```js
   let person = {
     name : 'Tom',
     age : 29
   }
   ```

有一些关注点：

- 最后一个属性后面加上逗号在非常老的浏览器中会导致报错；
- 在对象字面量表示法中，属性名可以是字符串或数值；

实际上开发者更倾向于使用对象字面量表示法：

```js
function displayInfo(args) {
   let output = "";
   if (typeof args.name == "string"){
   output += "Name: " + args.name + "\n";
   }
   if (typeof args.age == "number") {
   output += "Age: " + args.age + "\n";
   }
   alert(output);
}
displayInfo({
   name: "Nicholas",
   age: 29
});
displayInfo({
   name: "Greg"
}); 
```

**重点！！！：如何去判断一个对象中是否存在该属性?**

> 注意：这种模式非常适合函数有大量可选参数的情况。最好的方式是：对必选参数使用命名参数，再通过一个对象字面量来封装多个可选参数。

### 访问对象中的属性

1. person["name"]
2. person.name

可通过变量进行访问属性：

```js
let propertyName = "name";
// propertyName中允许属性名中可以包含非字母数字字符，通过中括号语法存取
person[propertyName]
```

> 第八章更全面、深入的介绍Object类型。

## 6.2 Array

> Array是除了Object外最常用的类型。Array数组也是一组有序数据，不同点在于==数组中每个槽位可以存储任意类型的数据，且是动态大小，会随着数据添加而自动增长。== 

### 6.2.1 创建数组

**创建方法**

1. 使用Array构造函数

   ```js
   let colors = new Array();
   // 已知数组中元素的数量
   let colors = new Array(20);
   // 也可以传入要保存的元素
   let colors = new Array("red","green","blue");
   // 可忽略new操作符
   let colors = Array(3);
   ```

2. 使用数组字面量表示法

   ```js
   let colors = ["red","blue","green"];
   let name = [];
   let values = [1,2,];
   ```

3. ES6新增静态方法：

   - from()：用于将类数组结构转换为数组实例

     第一个参数是一个类数组对象，即任何可迭代的结构。

     ```js
     // 字符串拆分为单字符数组
     Array.from("Matt");// ["M","a","t","t"]
     // 将集合和映射转换为一个新数组
     const m = new Map().set(1,2).set(3,4);
     const s = new Set().add(1).add(2).add(3);
     Array.from(m);// [[1,2],[3,4]]
     Array.from(s);// [1,2,3,4]
     // 对现有的数组执行浅复制
     const a1 = [1,2,3,4];
     const a2 = Array.from(a1);
     // 可以使用任何可迭代对象*
     // arguments对象可以被轻松地转换为数组*
     // from()也能转换带有必要属性的自定义对象*
     ```

     第二个可选的映射函数参数。这个函数可以直接增强新数组的值，无需调用一个Array.from().map()先创建一个中间数组。

     第三个可选参数，用于指定映射函数中this的值，这个重写this在箭头函数中不适用。

     ```js
     const a1 = [1, 2, 3, 4];
     const a2 = Array.from(a1, x => x**2);
     const a3 = Array.from(a1, function(x) {return x**this.exponent}, {exponent: 2});
     console.log(a2); // [1, 4, 9, 16]
     console.log(a3); // [1, 4, 9, 16] 
     ```

   - of()：用于将一组参数转换为数组实例

     ```js
     console.log(Array.of(1, 2, 3, 4)); // [1, 2, 3, 4]
     console.log(Array.of(undefined)); // [undefined] 
     ```

     

4. 

## 6.3 定型数组



## 6.4 Map



## 6.5 WeakMap



## 6.6 Set



## 6.7 迭代与扩展操作



## 6.8 小结

