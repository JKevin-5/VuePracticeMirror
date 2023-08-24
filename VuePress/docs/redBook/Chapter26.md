---
title: Chapter26 模块
description: Chapter26
prev: /redBook/Chapter21.md
---
# Chapter26 模块

> 本章内容：
> -   理解模块模式
> -   凑合的模块系统
> -   使用ES6前模块加载器
> -   使用ES6模块

在ES6模块规范出现之前，浏览器原生不支持模块行为，但是迫切需要这样的行为导致，希望使用模块模式的库或代码库必须基于JS语法等伪造出类似模块的行为。

## 26.1 理解模块模式

> 把逻辑分块，各自封装，互相独立，每个块自行决定对外暴露什么，同时自行决定引入执行哪些外部代码。

### 26.1.1 模块标识符

> 模块系统本质上是键值实体，其中每个模块都有个可用于引用它的标识符。可能是模拟模块系统中的字符串，也可能是原生实现系统中的实际路径。

原生浏览器模块标识符必须提供实际的JavaScript文件的路径。

```html
<script src="js文件的地址"></script>
```

Node.js会搜索node\_modules目录，用标识符去匹配包含index.js的目录。

### 26.1.2 模块依赖

略

### 26.1.3 模块加载

浏览器中，加载依赖涉及几个步骤：

1.  浏览器还没收到依赖模块的代码，必须发送请求并等待网络返回；
2.  收到后浏览器需要确定刚收到的模块是否也有依赖；
3.  递归的评估加载所有依赖，直到所有依赖模块都加载完成，才执行入口模块。

### 26.1.4 入口

> 因为JavaScript是顺序执行，并且是单线程的，所以代码必须有执行的起点。

模块加载是"阻塞的"，每个模块加载并初始化必须按照一定的顺序来，需要手动改管理正确的加载顺序。

### 26.1.5 异步依赖

JavaScript可以通知模块系统在必要时加载新模块，并在模块加载完成后提供回调。

按道理来说，只需要用一个script标签即可完成模块A的加载。模块A按需请求模块文件。

\<script>标签可以应用defer[^注释1]或async[^注释2]属性，加上按需加载逻辑，可以模拟ES6规范中实现的行为。

### 26.1.6 动态依赖

```javascript
if(loadCondition){
  require('./moduleA')
}
```

### 26.1.7 静态分析

### 26.1.8 循环依赖

基本每个js程序都存在依赖循环，CommonJS、AMD和ES6在内的所有模块系统都支持循环依赖。

## 26.2 凑合的模块系统

为了按模块模式提供必要的封装，ES6之前的模块会使用函数作用域和立即调用函数表达式将模块定义封装到匿名闭包中。

### 26.2.1模块定义

模块定义是立即执行的。

```javascript
(function(){
    // 私有Foo模块的代码
    console.log('bar');
})();
```

### 26.2.2 命名空间

把这个模块的返回值赋给一个变量，那么就为了模块创建了命名空间：

```javascript
var Foo = (function(){
    // 私有Foo模块的代码
    console.log('bar');
})();
```

### 26.2.3 暴露公共API

为了暴露公共API，模块IIFE会返回一个对象，其属性就是模块命名空间中的公共成员：

```javascript
var Foo = (function() {
   return {
       bar: 'baz',
       baz: function() {
           console.log(this.bar);
       }
   };
})();
console.log(Foo.bar); // 'baz'
Foo.baz(); // 'baz' 

```

### 26.2.4 泄露模块模式

另一种模式：泄露模块模式，只返回一个对象，其属性是私有数据和成员的引用。

```javascript
var Foo = (function() {
   var bar = 'baz';
   var baz = function() {
       console.log(bar);
   };
   return {
       bar: bar,
       baz: baz
   };
})();
console.log(Foo.bar); // 'baz'
Foo.baz(); // 'baz'
```

### 26.2.5 命名空间的嵌套

命名空间的嵌套：

```javascript
var Foo = (function() {
   return {
       bar: 'baz'
   };
})();
Foo.baz = (function() {
   return {
       qux: function() {
           console.log('baz');
       }
   };
})();
console.log(Foo.bar); // 'baz'
Foo.baz.qux(); // 'baz' 
```

### 26.2.6 外部传参

可以传入外部值给IIFE

```javascript
var globalBar = 'baz';
var Foo = (function(bar) {
   return {
       bar: bar,
       baz: function() {
           console.log(bar);
       }
   };
})(globalBar);
console.log(Foo.bar); // 'baz'
Foo.baz(); // 'baz'
```

### 26.2.7 拓展模块

拓展模块：

```javascript
// 原始的 Foo
var Foo = (function(bar) {
 var bar = 'baz';
 return {
   bar: bar
 };
})();
// 扩展 Foo
var Foo = (function(FooModule) {
 FooModule.baz = function() {
   console.log(FooModule.bar);
 }
 return FooModule;
})(Foo);
console.log(Foo.bar); // 'baz'
Foo.baz(); // 'baz'
```

判断模块是否存在再进行扩展：

```javascript
// 扩展 Foo 以增加新方法
var Foo = (function(FooModule) {
 FooModule.baz = function() {
   console.log(FooModule.bar);
 }
 return FooModule;
})(Foo || {});

// 扩展 Foo 以增加新数据
var Foo = (function(FooModule) {
 FooModule.bar = 'baz';
 return FooModule;
})(Foo || {});

console.log(Foo.bar); // 'baz'
Foo.baz(); // 'baz' 
```

## 26.3 使用ES6之前的模块加载器

> 需要单独的模块工具把这些模块语法与JavaScript运行时连接起来。

### 26.3.1 CommonJS

> Node.js中使用的是轻微修改版本的CommonJS

CommonJS模块定义需要用require()指定依赖，使用exports对象定义自己的公共API。

```javascript
var moduleB = reuqire('./moduleB');

module.expores = {
  stuff: moduleB.doStuff();
};
```

NodeJs中，模块标识符可能指向文件，也可能指向包含index.js文件的目录。

require请求模块会加载相应模块，可以赋值给变量，也可以原封不动的加载进来。

```javascript
console.log('moduleA');
require('./moduleA'); // "moduleA"
```

无论moduleA被引用几次，模块永远是单例的，只会被引入一次。

```javascript
console.log('moduleA');
var a1 = require('./moduleA');
var a2 = require('./moduleA');
console.log(a1 === a2); // true
```

在CommonJS中，模块加载是模块系统执行的同步操作，因此也可以这样做：

```javascript
console.log('moduleA');
if (loadCondition) {
   require('./moduleA');
} 
```

NodeJs中可以使用绝对或相对路径，也可以使用安装在node\_modules目录中依赖的模块标识符。

```javascript
require(@vue/cli)// 类似
```

#### 具体实现

有模块想要使用接口的话

```javascript
var moduleA = require('./moduleA');
console.log(moduleA.stuff);
```

注意，此模块不导出任何内容。

导出一个实体：

```javascript
module.exports = 'foo';
// 在其他的模块
var moduleA = require('./moduleB');
console.log(moduleB); // 'foo' 

```

导出多个值：

```javascript
module.exports = {
 a: 'A',
 b: 'B'
};
module.exports.a = 'A';
module.exports.b = 'B'; 
```

托管类定义：

```javascript
class A {}
module.exports = A;
var A = require('./moduleA');
var a = new A();

class A {}
module.exports = new A(); 

```

### 26.3.2 AMD异步模块定义

CommonJS是以服务器为目标环境，能够一次性把所有模块都加载到内存。而AMD模块定义系统是以浏览器为目标执行环境，需要考虑网络延迟的问题。

### 26.3.3 UMD通用模板定义

&#x20;UMD是为了统一CommonJS和AMD生态。启动的时候会检测要使用哪个模块系统，然后进行配置，并把逻辑包装到一个立即调用的函数表达式中IIFE。

```javascript
(function (root, factory) {
 if (typeof define === 'function' && define.amd) {
 // AMD。注册为匿名模块
 define(['moduleB'], factory);
 } else if (typeof module === 'object' && module.exports) {
 // Node。不支持严格 CommonJS
 // 但可以在 Node 这样支持 module.exports 的
 // 类 CommonJS 环境下使用
 module.exports = factory(require(' moduleB '));
 } else {
 // 浏览器全局上下文（root 是 window）
 root.returnExports = factory(root. moduleB);
 }
}(this, function (moduleB) {
 // 以某种方式使用 moduleB
 // 将返回值作为模块的导出
 // 这个例子返回了一个对象
 // 但是模块也可以返回函数作为导出值
 return {};
})); 
```

### 26.3.4 模块加载器终将没落

ES6模块规范⇒CommonJS和AMD

## 26.4 使用ES6模块

> 从很多方面看，ES6 模块系统是集 AMD 和 CommonJS
> 之大成者。

### 26.4.1 模块标签及定义

引入方式：

```javascript
<script type="module">
 // 模块代码
</script>
<script type="module" src="path/to/myModule.js"></script>
```

顺序只会影响文件加载顺序，不会影响模块加载顺序。

### 26.4.2 模块加载
- 支持浏览器原生加载，也可以通过第三方加载器和构建工具一起加载。
- 模块文件是按需加载的，因此后续的模块的请求会因为每个依赖模块的网络延迟而同步延迟。

### 26.4.3 模块行为
ES6 模块借用了commonJS和AMD的很多优秀特性。
- 模块代码只在加载后执行
- 模块只能加载一次
- 模块是单例的
- 模块可以定义公共接口，其他模块可以基于这个公共接口观察和交互
- 模块可以请求加载其他模块
- 支持循环依赖

ES6模块系统增加的新行为
- ES6模块默认在严格模式下执行
- ES6模块不共享全局命名空间
- 模块顶级this的值是undefined（常规脚本中是window）
- 模块中的var声明不会添加到window对象
- ES6模块是异步加载和执行的

### 26.4.4 模块导出

两种导出方式：命名导出和默认导出

#### 命名导出

export 关键字用于声明一个值为命名导出。导出语句必须在模块顶级，不能嵌套在某个块中：

```javascript
// 允许
export ...

// 不允许
if (condition) {
   export ...
} 
```

export的顺序不限制

```javascript
// 允许
const foo = 'foo';
export { foo };

// 允许
export const foo = 'foo';

// 允许，但应该避免
export { foo };
const foo = 'foo';
```

导出时候可以提供别名

```javascript
const foo = 'foo';
export { foo as myFoo };
```

一个模块中声明多个命名导出。

```javascript
export const foo = 'foo';
export const bar = 'bar';
export const baz = 'baz';

const foo = 'foo';
const bar = 'bar';
const baz = 'baz';
export { foo, bar as myBar, baz };

```

#### 默认导出

每个模块只能有一个默认导出。

```javascript
const foo = 'foo';
export default foo;
```

提供default关键字

```javascript
const foo = 'foo';
// 等同于 export default foo;
export { foo as default }; 
```

命名导出和默认导出不冲突

```javascript
const foo = 'foo';
const bar = 'bar';
export { bar };
export default foo;

//这两个 export 语句可以组合为一行：
const foo = 'foo';
const bar = 'bar';
export { foo as default, bar };
```

### 26.4.5 模块导入

与 export 类似，import 必须出现在模块的顶级：

```javascript
// 允许
import ...

// 不允许
if (condition) {
 import ...
} 
```

import会被提升到模块顶部。

[^注释1]: 延迟加载，不阻塞，在html中的顺序执行。

[^注释2]: async属性的script标签不会阻塞浏览器解析html。async属性是不可控的，执行的时间顺序都不确定。按网络请求返回顺序，可能阻塞也可能不阻塞

- 导出模块的常量相当于const，无法进行修改
- 导出模块的对象的属性可以进行修改
- 导出模块的集合不能进行修改

一些默认写法：
```js
// 批量导入
import * as Foo from './foo.js'
// 指名导入
import { foo, bar, baz as MyBaz } from './foo.js'
// 以下等效导入
import { default as foo } from ''
import foo from ''

```

### 26.4.6 模块转移导出

类似electron-egg或者是一些插件所写的方式，将所有的js默认导出到一个js文件中，再统一import到vue画面上进行使用。
```js
// foo.js
export const baz = 'foo'
// bar.js
export * from './foo.js'
export const baz = 'bar'
// main.js
import {baz} from './bar.js'
console.log(baz) // bar
```
:::warning
请注意，默认import，导出名称出现冲突的情况时，重写的情况是静默发生的。
:::

### 26.4.7 工作者模块
```js
// 第二个参数默认为{ type: 'classic' }
const scriptWorker = new Worker('scriptWorker.js');

const moduleWorker = new Worker('moduleWorker.js', { type: 'module' });
```

### 26.4.8 向后兼容

早期版本不支持module模块化的方式可以这样使用
```js
// 不支持模块的浏览器不会执行这里的代码
<script type="module" src="module.js"></script>
// 不支持模块的浏览器会执行这里的代码
<script src="script.js"></script> 
```
修改为全版本可用的方式
```js
// 支持模块的浏览器会执行这段脚本
// 不支持模块的浏览器不会执行这段脚本
<script type="module" src="module.js"></script>
// 支持模块的浏览器不会执行这段脚本
// 不支持模块的浏览器会执行这段脚本
<script nomodule src="script.js"></script>
```

## 26.5 小结
