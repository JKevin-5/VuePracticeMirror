---
title: Charpter4 变量、作用域与内存
description: Charpter4
prev: /redBook/Chapter3.md
next: /redBook/Chapter5.md
---
# Chapter4 变量、作用域与内存

> 本章内容：
>
> - 通过变量使用原始值与引用值
> - 理解执行上下文
> - 理解垃圾回收

JavaScript的变量是松散类型，变量是特定时间点一个特定值的名称而已。

## 4.1 原始值与引用值

**原始值**：最简单的数据。

6种原始值：Undefined、Null、Boolean、Number、String和Symbol。

**引用值**：由多个值构成的对象。

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

上下文在其所有的代码都执行完毕后会被销毁。

**全局上下文：**

- 最外层的上下文，不同宿主环境中，全局上下文的对象可能不一样。
- 在浏览器中，window对象就是全局上下文，因此所有通过var定义的全局变量和函数都会成为window对象的属性和方法。
- let和const的顶级声明不会定义在全局上下文中，但在作用域链解析上效果是一样的。
- 全局上下文在应用退出前才会被销毁，比如关闭网页或浏览器



每个上下文都可以到上一级上下文中去搜索变量和函数，但任何上下文都不能到下一级上下文中去搜索。

### 4.2.1 作用域增强

> 虽然执行上下文主要有全局上下文和函数上下文两种(eval()调用内部存在第三种上下文，但有其他方式来增强作用域链。

```js
function buildUrl() {
  let qs = "?debug=true";
  with(location){
    let url = href + qs;
  }
  return url;
} 
```

这里的location对象作为上下文，会添加到作用域链前端。引用的href其实是location.href。with语句中使用let声明的变量url，会被限制在块级作用域。

### 4.2.2 变量声明

1. 使用var的函数作用域声明

   使用var声明变量时，变量会被自动添加到最接近的上下文。

   var声明会被拿到函数或全局作用域的顶部，位于作用域中所有代码之前，这个现象叫作“提升“。==需要注意的是，提升的是声明而不是赋值。==

   ```js
   console.log(name); // undefined
   var name = 'Jake';
   function() {
     console.log(name); // undefined
     var name = 'Jake';
   } 
   ```

2. 使用let的块级作用域声明

   let关键字和var很相似，但是它的作用域是块级的{}。

   let和var另一个不同之处在于，在同一个作用域内不能声明两次，重复的var声明会被忽略，而重复的let声明会抛出SyntaxError。

   ```js
   var a;
   var a;
   // 不会报错
   {
    let b;
    let b;
   }
   // SyntaxError: 标识符 b 已经声明过了
   ```

   let的行为非常适合在循环中声明迭代变量，使用var声明会泄漏到循环外部。

   严格来讲，let 在 JavaScript 运行时中也会被提升，但由于“暂时性死区”（temporal dead zone）的 缘故，实际上不能在声明之前使用 let 变量。因此，从写 JavaScript 代码的角度说，let 的提升跟 var 是不一样的。<i>创建过程提升，但是初始化没有提升，所以不能被使用，因为var提升之后也初始化了undefined，但是let没有赋值，暂时还不能被访问。</i>

3. 使用const的变量声明

   使用const声明的变量必须同时初始化为某个值。且一经声明，在其生命周期的任何时候都不能再重新赋予新值。其他方面跟let一样。

   const声明只应用到顶级原语或对象，赋值为对象的congst变量不能被重新赋值为其他引用值，但是对象的键值不受限制。

   如果想要让整个对象不能修改，可以使用`Object.freeze()`。

   ```js
   const o3 = Object.freeze({});
   o3.name = 'Jake';// 不会报错，但静默失败
   console.log(o3.name); // undefined 
   ```

4. 标识符查找

   讲述变量的查找过程。



## 4.3 垃圾回收

> - 周期性，每隔一定时间或在代码执行过程中的某个预定的收集时间。
> - 浏览器发展史上，主要有两种标记策略：标记清理和引用计数

### 4.3.1 标记清理

> 当变量进入上下文时，变量会被加上一个【存在于上下文中的标记】，而在上下文中的变量，逻辑上讲，永远不应该释放它们的内存，因为只要上下文中的代码在运行，就可能用到它们。当变量离开上下文时，也会被加上【离开上下文的标记】。

给变量加标记的方法有多种：

- 当变量进入上下文时，反转某一位；
- 可以维护“在上下 文中”和“不在上下文中”两个变量列表，可以把变量从一个列表转移到另一个列表。

关键在于策略，各家的浏览器都采用标记清理（或变体），只是在运行垃圾回收的频率上有所差异。

### 4.3.2 引用计数

> 其思路是对每个值都记录它被 引用的次数。声明变量并给它赋一个引用值时，这个值的引用数为 1。如果同一个值又被赋给另一个变 量，那么引用数加 1。类似地，如果保存对该值引用的变量被其他值给覆盖了，那么引用数减 1。当一 个值的引用数为 0 时，就说明没办法再访问到这个值了，因此可以安全地收回其内存了。垃圾回收程序 下次运行的时候就会释放引用数为 0 的值的内存。

- 存在循环引用的问题，永远都无法清除内存。

  ```js
  function problem() {
     let objectA = new Object();
     let objectB = new Object();
     objectA.someOtherObject = objectB;
     objectB.anotherObject = objectA;
  } 
  ```

### 4.3.3 性能

- 如果数据不再必要，那么把它设置为null，从而释放其引用，这也叫作**解除引用**，最适合全局变量和全局变量属性。
- 解除一个值的引用并不会自动导致相关内存被回收，解除引用的关键在于确保相关的值已经不在上下文里，因此下次垃圾回收时会被回收。

#### 提升性能的方法

1. 通过const和let声明提升性能

   const和let都是以块而非函数为作用域，相比var会更早的让垃圾回收程序介入，今早回收应该回收的内存。

2. 隐藏类和删除操作

   v8引擎中有使用到隐藏类的概念。

   避免 JavaScript 的“先创建再补充”（ready-fire-aim）式的动态属性赋值，并在 构造函数中一次性声明所有属性。

   ```js
   function Article(opt_author) {
    this.title = 'Inauguration Ceremony Features Kazoo Band';
    this.author = opt_author;
   }
   //错误示范
   let a1 = new Article();
   let a2 = new Article();
   a2.author = 'Jake';
   //这样两个实例会共用一个隐藏类，带来潜在性能提升。
   let a1 = new Article();
   let a2 = new Article('Jake');
   //使用结束后
   let a1 = new Article();
   let a2 = new Article();
   a1.author = null; 
   ```

3. 内存泄漏

   - 未使用关键字的变量声明：

     相当于在window对象上创建属性，window本身不被清理就不会消失。

     ```js
     function setName() {
      name = 'Jake';
     } 
     ```

   - 定时器的回调函数中引用的变量会一直占用内存。

     ```js
     let outer = function() {
        let name = 'Jake';
        return function() {
        		return name;
        };
     }; 
     ```

4. 静态分配与对象池

   合理使用分配的内存，同时避免多余的垃圾回收，可以保住因释放内存而损失的性能。

   ```js
   // 会频繁的进行垃圾回收
   function addVector(a, b) {
      let resultant = new Vector();
      resultant.x = a.x + b.x;
      resultant.y = a.y + b.y;
      return resultant;
   }
   // 解决方案，不动态创建对象，使用一个已有的对象
   function addVector(a, b, resultant) {
      resultant.x = a.x + b.x;
      resultant.y = a.y + b.y;
      return resultant;
   } 
   ```

   - 使用对象池，先创建并管理一组可回收的对象。程序可以向对象池请求一个对象，并在操作后还给对象池。因为没有发生对象初始化，垃圾回收探测不到对象的更替。
   - 本质上是一个贪婪算法，前期定义一个够大的数组，避免先删除后创建的操作。（静态分配，大多数情况下，都属于过早优化，不用考虑）

### 4.4 小结

- 原始值大小固定，因此保存在栈内存上。
- 从一个变量到另一个变量复制原始值会创建该值的第二个副本。
- 引用值是对象，存储在堆内存上。
- 包含引用值的变量实际上只包含指向相应对象的一个指针，而不是对象本身。
- 从一个变量到另一个变量复制引用值只会复制指针，因此结果是两个变量都指向同一个对象。
- typeof 操作符可以确定值的原始类型，而 instanceof 操作符用于确保值的引用类型。 

任何变量（不管包含的是原始值还是引用值）都存在于某个执行上下文中（也称为作用域）。这个 上下文（作用域）决定了变量的生命周期，以及它们可以访问代码的哪些部分。执行上下文可以总结 如下。

- 执行上下文分全局上下文、函数上下文和块级上下文。
- 代码执行流每进入一个新上下文，都会创建一个作用域链，用于搜索变量和函数。
- 函数或块的局部上下文不仅可以访问自己作用域内的变量，而且也可以访问任何包含上下文乃 至全局上下文中的变量。
- 全局上下文只能访问全局上下文中的变量和函数，不能直接访问局部上下文中的任何数据。
- 变量的执行上下文用于确定什么时候释放内存。

JavaScript 是使用垃圾回收的编程语言，开发者不需要操心内存分配和回收。JavaScript 的垃圾回收 程序可以总结如下。

- 离开作用域的值会被自动标记为可回收，然后在垃圾回收期间被删除。
- 主流的垃圾回收算法是标记清理，即先给当前不使用的值加上标记，再回来回收它们的内存。
- 引用计数是另一种垃圾回收策略，需要记录值被引用了多少次。JavaScript 引擎不再使用这种算 法，但某些旧版本的 IE 仍然会受这种算法的影响，原因是 JavaScript 会访问非原生 JavaScript 对 象（如 DOM 元素）。
- 引用计数在代码中存在循环引用时会出现问题。
- 解除变量的引用不仅可以消除循环引用，而且对垃圾回收也有帮助。为促进内存回收，全局对 象、全局对象的属性和循环引用都应该在不需要时解除引用。
