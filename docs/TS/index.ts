let str:string = '字符串'
// console.log(str)

let bool:Boolean = new Boolean(1)
// console.log(bool)

let obj:any = {a:1}
// console.log(obj.b) // undefined

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