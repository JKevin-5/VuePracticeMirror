# 六、类型断言|联合类型|交叉类型

## 联合类型
```ts
let myPhone:number | string = '01-1'
```

## 交叉类型
多种类型的集合，联合对象将具有所联合类型的所有成员

```ts
interface People {
    age: number,
    height: number
}
interface Man {
    sex: string
}
const xiaoman = (man: People & Man) => {
    console.log(man.age)
    console.log(man.height)
    console.log(man.sex)
}
xiaoman({age: 1, height:180,sex: 'male'})
```

断言
```ts
let num:number = 1
(num as string) = '1'
```