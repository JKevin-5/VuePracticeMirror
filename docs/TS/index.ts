// let arr:number[] = [1,2,3]
// console.log(arr.shift())

// let arr1:Array<number> = [1,2,3]
// console.log(arr1)

// let arr:number[][] = [[1,2],[1,2]]
// console.log(arr)

// let arr:Array<Array<number|string>> = [[1,2],[1,'1']]
// console.log(arr)

// function Arr(...args:any):void {
//     let arr:IArguments = args
//     console.log(arr)
// }

// Arr(1,2,3)

// const fn = (name: string, age:number):string => {
//     return name + age
// }
// console.log(fn('张三',18))

// const fn = (name:string, age?:number):string => {
//     return name + age
// }
// console.log(fn('张三'))

// const fn = (name:string = '我是默认值'):string => {
//     return name
// }
// console.log(fn())

// interface Add {
//     (num:number, num2:number): number
// }

// const fn: Add = (num:number,num2:number): number =>{
//     return num + num2
// }
// console.log(fn(1, 2))

// const fn = (array:number[],...items:any[]):any[] => {
//     console.log(array,items)
//     return items
// }
// let a:number[] = [1,2,3]
// console.log(fn(a,'4','5','6'))

// function len(s: string): number;
// function len(arr: string): number {
//     return arr.length;
// };

// len('1')

// interface People {
//     age: number,
//     height: number
// }
// interface Man {
//     sex: string
// }
// const xiaoman = (man: People & Man) => {
//     console.log(man.age)
//     console.log(man.height)
//     console.log(man.sex)
// }
// xiaoman({age: 1, height:180,sex: 'male'})

// interface A {
//     run: string
// }
// interface B {
//     run: string,
//     build: string
// }

// const fn = (type: A | B,a:A): string => {
//     return type.run // 类型断言，运行失败
// }

// console.log(fn({run: 'a'},{run: 'a'}))

// function promise():Promise<number>{
//     return new Promise<number>((resolve,reject)=>{
//         resolve(1)
//     })
//  }
  
//  promise().then(res=>{
//      console.log(res)
//  })

// class Person {
//     name:string
//     age:number
//     constructor (name:string,age:number) {
//         this.name = name
//         this.age = age
//     }
//     run(){
        
//     }
// }

// enum Types{
//     Red = 10,
//     Green,
//     Blue
// }

// console.log(Types.Blue)

// function Never():void {
//     throw new Error('aaa')
// }

// Never()

const symbol1 = Symbol('666')
const symbol2 = Symbol('777')
const obj1= {
   [symbol1]: '小满',
   [symbol2]: '二蛋',
   age: 19,
   sex: '女'
}
// 1 for in 遍历
// for (const key in obj1) {
//    // 注意在console看key,是不是没有遍历到symbol1
//    console.log(key)
// }
// 2 Object.keys 遍历
// Object.keys(obj1)
// console.log(Object.keys(obj1))
// // 3 getOwnPropertyNames
// console.log(Object.getOwnPropertyNames(obj1))
// // 4 JSON.stringfy
// console.log(JSON.stringify(obj1))

// console.log(Object.getOwnPropertySymbols(obj1))

// console.log(Reflect.ownKeys(obj1))

// let arr:Array<number>  = [1,2,3]
// // let it:Iterator<Number> = arr[Symbol.iterator]()
// // it.next()
// let set:Set<number> = new Set([1,2,3])
// type mapKeys = string | number 
// let map:Map<mapKeys,mapKeys> = new Map()
// map.set('1','2')

// function gen(erg:any) {
//    let it:Iterator<any> = erg[Symbol.iterator]()
//    let next:any = {done:false}
//    while(!next.done) {
//       next = it.next()
//       if(!next.done){
//          console.log(next)
//       }
//    }
// }
// // 对象是不支持的
// gen(map)

// class Sub<T>{
//    attr: T[] = []
//    add(a:T):T[] {
//        this.attr.push(a)
//        return this.attr
//    }
// }

// let s = new Sub<number>()
// s.attr = [1,2,3]
// s.add(123)

// console.log(s)

/**
 * 第十六章 命名空间 
 */
// namespace a {
//    export const Time: number = 9000
// }

/**
 * 第十九章 mixins混入
 */
//  class A {
//    type: boolean = false;
//    changeType() {
//        this.type = !this.type
//    }
// }

// class B {
//    name: string = '张三';
//    getName(): string {
//        return this.name;
//    }
// }
 
// class C implements A,B{
//    type:boolean
//    changeType:()=>void;
//    name: string;
//    getName:()=> string
// }

// Mixins(C, [A, B])
// function Mixins(curCls: any, itemCls: any[]) {
//     itemCls.forEach(item => {
//         Object.getOwnPropertyNames(item.prototype).forEach(name => {
//             curCls.prototype[name] = item.prototype[name]
//         })
//     })
//     itemCls.forEach(item => {
//       Object.getOwnPropertyNames(item.prototype).forEach(name => {
//          console.log(name)
//       })
//   })
// }

/**
 * 第二十章 装饰器Decorator
 */
// 装饰器
// const watcher:ClassDecorator = (target:Function) => {
//    console.log(target.prototype)
// }

// @watcher
// class A {
//    type:any
//    constructor() {

//    }
//    print(){

//    }
// }

// const a = new A();
// console.log((a as any).getParams('123'))

// 装饰器工厂
// const watcher = (name: string): ClassDecorator => {
//    return (target: Function) => {
//       // 相当于给原型链上又多一个函数，如果想要实现共通函数可以这样写，不会影响现有代码
//       //  target.prototype.getParams = <T>(params: T): T => {
//       //      return params
//       //  }
//       //  target.prototype.getOptions = (): string => {
//       //      return name
//       //  }
//       target.prototype.getNames = <T>(params: T): string => {
//          return name+params
//      }
//    }
// }

// @watcher('name')
// class A {
//    constructor() {

//    }
// }

// const a = new A();
// console.log((a as any).getNames('123'));

// 组合式装饰器

