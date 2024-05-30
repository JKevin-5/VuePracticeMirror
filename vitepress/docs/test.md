<Card/>

## 测试mermaid
::: code-group

```java [source]
classDiagram
    %% 按类型批量添加
    class Animal {
        +String publicField
        #Integer protectedField
        ~Boolean packageField
        -Long privateField
        Double staticField$

        +publicMethod() String
        #protectedMethod() Integer
        ~packageMethod() Boolean
        -privateMethod() Long
        +abstractMethod()* void
        #staticMethod()$ char
    }
    %% 单条添加
    Animal: List~String~ list
    Animal: +getList() List~String~
```

```mmd
classDiagram
    %% 按类型批量添加
    class Animal {
        +String publicField
        #Integer protectedField
        ~Boolean packageField
        -Long privateField
        Double staticField$

        +publicMethod() String
        #protectedMethod() Integer
        ~packageMethod() Boolean
        -privateMethod() Long
        +abstractMethod()* void
        #staticMethod()$ char
    }
    %% 单条添加
    Animal: List~String~ list
    Animal: +getList() List~String~
```
:::
