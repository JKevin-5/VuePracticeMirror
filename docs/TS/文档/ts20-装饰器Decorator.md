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
```ts
// 定义一个类
class A {
    constructor(){

    }
}

// 定义一个类装饰器函数，会将Class A的构造函数传入你的watcher函数当作第一个参数
const watcher: ClassDecorator = (target: Fcuntion) => {
    target.prototype.getParams = <T>(params: T):T => {
        return params
    }
}

// 使用
@wacther
class A {
    constructor(){

    }
}

// 验证
const a = new A()
console.log((a as any).getParams('123'))
```

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

## 组合式装饰器(ClassDecorator)

同时使用多个装饰器
```ts
const watcher = (name: string): ClassDecorator => {
    return (target: Function) => {
        target.prototype.getParams = <T>(params: T): T => {
            return params
        }
        target.prototype.getOptions = (): string => {
            return name
        }
    }
}
const watcher2 = (name: string): ClassDecorator => {
    return (target: Function) => {
        target.prototype.getNames = ():string => {
            return name
        }
    }
}
 
@watcher2('name2')
@watcher('name')
class A {
    constructor() {
 
    }
}
 
 
const a = new A();
console.log((a as any).getOptions());
console.log((a as any).getNames());
```

## 方法装饰器(MethodDecorator)
```ts
const met:MethodDecorator = (...args) => {
    console.log(args);
}
 
class A {
    constructor() {
 
    }
    @met
    getName ():string {
        return '小满'
    }
}
 
const a = new A();
```
返回的结构体是：
- 对于静态成员来说是类的构造函数，对于实例成员是类的原型对象
- 成员的名字
- 成员的属性描述符
```json
[
  {},
  'getName',
  {
    value: [Function: getName],
    writable: true,
    enumerable: false,
    configurable: true
  }
]
```

## 属性装饰器(PropertyDecorator)
name出现报错，是构造函数里面没有使用name
```ts
const met:PropertyDecorator = (...args) => {
    console.log(args);
}
 
class A {
    @met
    name:string
    constructor() {
 
    }
   
}
 
const a = new A();
```
返回体结构：
- 对于静态成员来说是类的构造函数，对于实例成员是类的原型对象
- 属性名字
```json
[ {}, 'name', undefined ]
```

## 参数装饰器
```ts
const met:ParameterDecorator = (...args) => {
    console.log(args);
}
 
class A {
    constructor() {
 
    }
    setParasm (@met name:string = '213') {
 
    }
}
const a = new A();
```
返回体：
- 对于静态成员来说是类的构造函数，对于实体成员是类的原型对象
- 成员的名字
- 参数在函数参数列表中的索引
```json
[ {}, 'setParasm', 0 ]
```
