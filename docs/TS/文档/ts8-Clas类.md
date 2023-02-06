# 八、Class类
> 基本上可以说该章节的所有内容，只要有学过面向对象语言都能很快过一遍


```ts
//定义类
class Person {
    constructor () {
 
    }
    run () {
        
    }
}
```

需要先声明变量
```ts
class Person {
    name:string
    age:number
    constructor (name:string,age:number) {
        this.name = name
        this.age = age // 如果没有全部变量使用的话，会导致报错
    }
    run(){

    }
}
```

类修饰符
- public
- private
- protected

public 不写默认，内外皆可访问
private 只能内部访问
protected 只能内部和子类访问


## static 静态属性和静态方法
- static定义的属性和方法，不能通过this去访问，只能通过类名调用

## interface 接口类
使用implements 
```ts
 
interface PersonClass {
    get(type: boolean): boolean
}
 
interface PersonClass2{
    set():void,
    asd:string
}
 
class A {
    name: string
    constructor() {
        this.name = "123"
    }
}
 
class Person extends A implements PersonClass,PersonClass2 {
    asd: string
    constructor() {
        super()
        this.asd = '123'
    }
    get(type:boolean) {
        return type
    }
    set () {
 
    }
}
```

## abstract 类
```ts
abstract class A {
   name: string
   constructor(name: string) {
      this.name = name;
   }
   print(): string {
      return this.name
   }
 
   abstract getName(): string
}
 
class B extends A {
   constructor() {
      super('小满')
   }
   getName(): string {
      return this.name
   }
}
 
let b = new B();
 
console.log(b.getName());
```

