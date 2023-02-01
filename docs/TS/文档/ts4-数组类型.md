# 四、数组类型

## 1、初始化数组
```ts
    let arr:number[] = [123]
    let arr1:any[] = [111,'111']

    //泛型定义数组
    let arr:Array<number> = [1,2,3]

    //声明多维数组
    let arr:number[][] = [[1,2],[1,2]]
    // 泛型结合联合类型
    let arr:Array<Array<number|string>> = [[1,2],[1,'1']]
    // arguments类数组，参数类型必须是数组类型
    function Arr(...args:any):void {
        console.log(argsments)
    }
    function Arr(...args:any):void {
        let arr:IArguments = args
        console.log(arr)
    }
    // IArgsments 是 TypeScript 中定义好了的类型，实际上是：
    interface IArgsments {
        [index:number]: any;
        length: number;
        callee: Function;
    }
```