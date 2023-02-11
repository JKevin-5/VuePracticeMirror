# 二十、装饰器decorator

是一项实验性特性，在未来版本中可能会发生改变

不仅增加了代码的可读性，清晰的表达了意图，而且提供一种方便的手段，增加或修改类的功能

和注解类似

需要在tsconfig.json启动编译器选项

```json
"experimentalDecorators":true
```

装饰器是一种特殊类型的声明，能够被附加到类声明、方法、访问符、属性或参数上。

## 装饰器


## 装饰器工厂

```ts
// 装饰器工厂
const watcher = (name: string): ClassDecorator => {
   return (target: Function) => {
        // 相当于给原型链上又多一个函数，如果想要实现共通函数可以这样写，不会影响现有代码
        target.prototype.getParams = <T>(params: T): T => {
            return params
        }
        target.prototype.getOptions = (): string => {
            return name
        }
        // 可读取注解上的name值，并且可以读取方法传参
        target.prototype.getNames = <T>(params: T): string => {
            return name+params
        }
   }
}

@watcher('name')
class A {
   constructor() {

   }
}

const a = new A();
console.log((a as any).getParams('123'));
console.log((a as any).getNames('123'));
```

## 组合式装饰器

