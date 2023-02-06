# 九、元组类型

元组 = 类型不定的数组的集合。

```ts
let arr:[number,string] = [1,'string']
```

应用场景：
定义excel返回的数据
```ts
let excel: [string, string, number, string][] = [
    ['title', 'name', 1, '123'],
    ['title', 'name', 1, '123'],
    ['title', 'name', 1, '123'],
    ['title', 'name', 1, '123'],
    ['title', 'name', 1, '123'],
]
```