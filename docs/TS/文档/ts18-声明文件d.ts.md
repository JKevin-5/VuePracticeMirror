# 声明文件d.ts

声明（declare）文件

当我们使用第三方库的时候，需要引用它的声明文件，才能获得对应的代码补全、接口提示等功能；

视频拿取了 express、axios进行比较

express没有声明文件

声明文件里需要怎么进行写

```ds
declare var 声明全局变量
declare function 
declare class 声明全局类
declare enum 声明全局枚举类型
declare namespace 声明（含有子属性的）全局对象
interface 和type 声明全局类型
/// <rederence /> 三斜线指令
```