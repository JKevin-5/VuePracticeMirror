# 七、内置对象

内置对象，类似Java中的预定义类。

ES中的内置对象有：
- Boolean
- Number
- string
- RegExp
- Date
- Error

DOM和BOM的内置对象：
- Document
- HTMLElement
- Event
- NodeList
- 等等

```ts
let body: HTMLElement = document.body;
let allDiv: NodeList = document.querySelectorAll('div')
//读取div 这种需要类型断言 或者加个判断应为读不到返回null
let div:HTMLElement = document.querySelector('div') as HTMLDivElement
```

promise
```ts
function promise():Promise<number>{
   return new Promise<number>((resolve,reject)=>{
       resolve(1)
   })
}
 
promise().then(res=>{
    console.log(res)
})
```