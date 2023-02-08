# 第十五章 tsconfig.json配置文件

tsconfig.json配置文件是通过`tsc --init`命令生成的。

文件指定了编译项目所需的根目录下的文件以及编译选项。

常用的配置：
1. include
指定一个匹配列表（属于自动指定该路径下的所有ts相关文件）
```json
"include": [
    "src/**/*"
]
```

2. exclude
指定一个排除列表（include的反向操作）
```json
"exclude": [
    "demo.ts"
]
```

3. target
指定编译js 的版本例如es5  es6

4. allowJS
是否允许编译js文件

5. removeComments
是否在编译过程中删除文件中的注释

6. rootDir
编译文件的目录

7. outDir
输出的目录

8. sourceMap
代码源文件

9. strict
严格模式

10. module
默认common.js 可选es6模式 amd umd等