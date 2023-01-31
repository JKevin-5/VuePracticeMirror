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
