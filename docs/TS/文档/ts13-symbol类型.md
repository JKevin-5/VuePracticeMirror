# 十三、symbol类型
symbol是一种es后的原生类型。

可传递参数为唯一标识，支支持number、string
```ts
let sym1 = Symbol();
let sym2 = Symbol("key"); // 可选的字符串key
```

## symbol是唯一的
```ts

const s1 = Symbol()
const s2 = Symbol()
// s1 === s2 =>false
```

## 可作为对象属性的键
```ts
let sym = Symbol();
 
let obj = {
    [sym]: "value"
};
 
console.log(obj[sym]); // "value"
```

## 如何获取对象中该symbol属性对应的值
```ts
// 1 拿到具体的symbol 属性,对象中有几个就会拿到几个
Object.getOwnPropertySymbols(obj1)
console.log(Object.getOwnPropertySymbols(obj1))
// 2 es6 的 Reflect 拿到对象的所有属性
Reflect.ownKeys(obj1)
console.log(Reflect.ownKeys(obj1))
```



## 可以用来遍历数组集合等
```ts
var arr = [1,2,3,4];
let iterator = arr[Symbol.iterator]();
 
console.log(iterator.next());  //{ value: 1, done: false }
console.log(iterator.next());  //{ value: 2, done: false }
console.log(iterator.next());  //{ value: 3, done: false }
console.log(iterator.next());  //{ value: 4, done: false }
console.log(iterator.next());  //{ value: undefined, done: true }
```