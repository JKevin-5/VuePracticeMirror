# 五、函数扩展

## 1、函数的类型
// 参数不能多传，少传，必须按照规定的类型
```ts
const fn = (name: string, age:number):string => {
    return name + age
}
fn('张三',18)
```

## 2、可选参数？
```ts
const fn = (name:string, age?:number):string => {
    return name + age
}
fn('张三')
```

## 3、函数参数的默认值
```ts
const fn = (name:string = '我是默认值'):string => {
    return name
}
fn()
```

## 4、接口定义函数
可以通过接口声明对象，用对象进行函数的传参
```ts
// 接口
interface Add {
    (num:number, num2:number): number
}

const fn: Add = (num:number,num2:number): number =>{
    return num + num2
}
console.log(fn(1, 2))
```

## 5、定义剩余参数
相当于array也是一个函数的参数，后面是未定义的参数
```ts
const fn = (array:number[],...items:any[]):any[] => {
    console.log(array,items)
    return items
}
let a:number[] = [1,2,3]
console.log(fn(a,'4','5','6'))
```

## 6、函数重载（与Java不相同）
方法名称相同，参数不同，返回值类型可以相同也可以不相同。
- 参数类型不同：参数类型应设置为 any。
- 参数数量不同：参数设置为可选。
```ts
function len(s: string): number;
function len(arr: any): number {
    return arr;
};

len('1')
```