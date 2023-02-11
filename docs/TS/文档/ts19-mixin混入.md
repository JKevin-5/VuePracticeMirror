# 第十九章 Mixins 混入

## 1、对象混入

可以使用es6的Object.assign 合并多个对象

可以看作，新的对象的类型会被推断为交叉类型：

```ts
interface Name {
    name: string
}
interface Age {
    age: number
}
interface Sex {
    sex: number
}
 
let people1: Name = { name: "小满" }
let people2: Age = { age: 20 }
let people3: Sex = { sex: 1 }
 
const people = Object.assign(people1,people2,people3)
```

## 2、类的混入

首先声明两个mixins类 （严格模式要关闭不然编译不过）

迭代器和混入可以分别看MDN的generator函数迭代器还有typescript中文手册类的混入

和js中的类和对象有关系
```ts
class A {
   type: boolean = false;
   changeType() {
       this.type = !this.type
   }
}

class B {
   name: string = '张三';
   getName(): string {
       return this.name;
   }
}
 
class C implements A,B{
   type:boolean
   changeType:()=>void;
   name: string;
   getName:()=> string
}
// implements A和B并不意味着已经可以使用C中的函数，只有把函数挂载到c上才算是
Mixins(C, [A, B])
function Mixins(curCls: any, itemCls: any[]) {
    itemCls.forEach(item => {
        Object.getOwnPropertyNames(item.prototype).forEach(name => {
            curCls.prototype[name] = item.prototype[name]
        })
    })
    itemCls.forEach(item => {
      Object.getOwnPropertyNames(item.prototype).forEach(name => {
         console.log(name)
      })
  })
}
```