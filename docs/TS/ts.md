小满TS笔记地址：https://blog.csdn.net/qq1195566313/category_11559497.html?spm=1001.2014.3001.5482
# 一、基础类型
> 根据小满第一课
基础类型有：
- Boolean
- Number
- String
- null
- undefined
- Es6的Symbol
- Es10的BigInt

## 1、Boolean类型
```typescript
let bool:Boolean = new Boolean(1)
console.log(bool)
// [Boolean: true]
```
boolean和Boolean是两个概念，boolean为基础类型，Boolean为布尔对象。
boolean类型的创建方法：
```ts
// 直接赋值
let bool:boolean = true
// 函数返回赋值
let bool:boolean = Boolean(1)
```
## 2、空值类型
可以使用void去定义函数返回值
```ts
function voidFn(): void {
    console.log('void')
}
```
void也可以用来定义undefined、null值
```ts
let v1:void = undefined
let v2:void = null
```

## 3、null、undefined类型
与void类型的不一样的地方在于，null和undefined是所有类型的子类型，所有类型包括：基础类型以及对象。

在严格模式下，null不能赋予void类型。

# 二、任意类型
变量类型声明为any类型，可以进行任意赋值。

没有指定变量类型时，默认会声明为any。

ts3中引入了unknown类型，所有类型都可以赋值给unknown。

any和unknown的差异
- unknown只能赋值给unknown和any类型。
- any变量赋值对象的时候，输出该对象没有的属性不会报错，unknown变量不能赋值对象。
    ```ts
    let obj:any = {a:1}
    console.log(obj.b) // undefined
    ```

# 三、接口和对象类型
我们定义对象的方式要用关键字interface（接口）。

关于接口的几个特性：
1. 属性必须声明，与接口保持一致；
2. 接口可以使用?可选操作符；
3. 添加任意新属性：`[propName: string]: any;`

