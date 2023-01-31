# 三、接口和对象类型
我们定义对象的方式要用关键字interface（接口）。

关于接口的几个特性：
1. 属性必须声明，与接口保持一致；
2. 接口可以使用?可选操作符；
3. 添加任意新属性：`[propName: string]: any;`
4. 同名的接口可以叠加；


接口的声明方式：
```ts
interface Person {
    b?:string,
    a:string,
    [propName: string]: any;
}
```

接口可继承：
```ts
interface B extends A{
    age:number
}
```

对象的声明方式：
```ts
const person:Person  = {
    a:"213",
    c:"123"
}
```

任意属性 [propName: string]:
```ts
//在这个例子当中我们看到接口中并没有定义C但是并没有报错
//应为我们定义了[propName: string]: any;
//允许添加新的任意属性
interface Person {
    b?:string,
    a:string,
    [propName: string]: any;
}
 
const person:Person  = {
    a:"213",
    c:"123"
}
```

只读属性 readonly
```ts
//这样写是会报错的
//应为a是只读的不允许重新赋值
interface Person {
    b?: string,
    readonly a: string,
    [propName: string]: any;
}
 
const person: Person = {
    a: "213",
    c: "123"
}
 
person.a = 123
```

添加函数
```ts
interface Person {
    b?: string,
    readonly a: string,
    [propName: string]: any;
    cb():void
}
 
const person: Person = {
    a: "213",
    c: "123",
    cb:()=>{
        console.log(123)
    }
}
```