# 第十六章 NameSpace 命名空间

如果存在两个ts文件

第一个ts文件里
```ts
const a = 'a'
```

第二个ts文件里
```ts
const a = 'b'
```

到第二个ts文件的时候会提示变量已经被声明。

为了解决这个问题：
- 内部模块，主要用于组织代码，避免命名冲突
- 命名空间内的类默认私有
- 通过export暴露
- 通过namespace关键字定义


1. 给第一个ts里的a变量进行export
第一个ts文件里
```ts
export const a = 'a'
```

第二个ts文件里
```ts
const a = 'b'
```

2. 通过命名空间进行解决

第一个ts文件里
```ts
namespace A {
    export const a = 1
}
```

第二个ts文件里
```ts
namespace B {
    export const a = 2
}
```

## 嵌套命名空间
```ts
namespace a {
    namespace b {

    }
}
```

## 抽离命名空间
一个ts文件
```ts
export namespace V {
    export const a = 1
}
```
另一个ts文件
```ts
import {V} from ''

console.log(V)
```

## 简化命名空间
```ts
namespace A {
    export namespace B {
        export const C = 1
    }
}
import X= A.B.C

console.log(X)
```

## 合并命名空间

同名的命名空间会合并