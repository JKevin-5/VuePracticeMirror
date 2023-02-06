# 十三、symbol类型
symbol是一种es后的原生类型。

可传递参数为唯一标识，支支持number、string

```ts
let sym1 = Symbol();
let sym2 = Symbol("key"); // 可选的字符串key
```

symbol不是用来修改的，如果是一个对象，对象里你不知道这个对象有哪些属性，创建了一个同名的，或者是将symbol替换了，这样就没办法显示出symbol的重要性了。

## symbol是唯一的

因为symbol是创建唯一值，即使是内容相同，但是在内存里面指向的也是不同的地址。

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


let arr:Array<number>  = [1,2,3]
// let it:Iterator<Number> = arr[Symbol.iterator]()
// it.next()
let set:Set<number> = new Set([1,2,3])
type mapKeys = string | number 
let map:Map<mapKeys,mapKeys> = new Map()
map.set('1','2')

function gen(erg:any) {
   let it:Iterator<any> = erg[Symbol.iterator]()
   let next:any = {done:false}
   while(!next.done) {
      next = it.next()
      if(!next.done){
         console.log(next)
      }
   }
}
```

for of的使用方式已经帮我们实现了迭代器
```ts
for(let item of arr){

}
```