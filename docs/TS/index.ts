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

interface A {
    run: string
}
interface B {
    run: string,
    build: string
}

const fn = (type: A | B,a:A): string => {
    return type.run // 类型断言，运行失败
}

console.log(fn({run: 'a'},{run: 'a'}))