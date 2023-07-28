---
title: 多环境配置
description:
editLink: false
---
## 多环境配置
SpringBoot项目目前有两种配置方式：
1. SpringBoot项目创建时默认提供的properties文件；
2. YAML文件，一般是以`.yml`结尾的文件。
  
**位置：**
`/src/main/resources/`路径下。

### 两种配置方式的优缺点
> 对比由OpenAI给出，结合勘误

| | YAML | Properties|
|--|--|--|
|**优点**|**语法格式：**<br/>使用缩进和冒号来表示层次结构。<br/><br/>**可读性强：**<br/>YAML 使用缩进来表示层级关系，使得配置文件更加清晰易读。<br/><br/>**简洁性：**<br/>相比于 Properties 文件，YAML 的写法更加简洁，可以减少配置文件的重复性。<br/><br/>**支持复杂数据结构：**<br/>YAML 支持列表、映射等复杂数据结构，可以更方便地表示嵌套关系的配置。|**语法格式：**<br/>使用点号和等号来表示键值对。<br/><br/>**简单易用：**<br/>Properties 配置文件采用键值对的形式，语法简单易懂，容易上手。<br/><br/>**支持特殊字符：**<br/>Properties 配置文件支持特殊字符的写法，不需要进行转义。|
|**缺点**|**语法要求严格：**<br/>YAML 的语法相对复杂，对缩进、冒号等符号的使用有严格的要求，容易出错。<br/><br/>**不支持特殊字符：**<br/>YAML 不支持一些特殊字符的写法，比如冒号、引号等，需要进行转义才能正确表示。|**不支持复杂数据结构：**<br/>Properties 配置文件只支持简单的键值对形式，不支持复杂数据结构的表示，不方便表示嵌套关系的配置。<br/><br/>**配置文件冗余：**<br/>Properties 配置文件的写法比较冗余，需要重复写入键名。|

### 以YAML文件配置方式
1. 多文件配置<br/>
    application-{profile}.yml，其中 {profile} 表示当前环境的名称
2. 单文件配置<br/>
    使用三个短横杠来分割profile；
    ```yaml
    # 在2.4版本之前
    spring:
        profile: dev
    ---
    # 在2.4版本之后
    spring:
        config:
            activate:
                on-profile: dev
    ```
3. springboot配置文件的优先级排序
   1. @TestPropertySource 注解
   2. 命令行参数
   3. Java系统属性（System.getProperties()）
   4. 操作系统环境变量
   5. 只有在random.*里包含的属性会产生一个RandomValuePropertySource
   6. 在打包的jar外的应用程序配置文件（application.properties，包含YAML和profile变量）
   7. 在打包的jar内的应用程序配置文件（application.properties，包含YAML和profile变量）
   8. 在@Configuration类上的@PropertySource注解
   9. 默认属性（使用SpringApplication.setDefaultProperties指定）
   10. 命令行参数、系统变量、环境变量等一些属性可以通过命令行参数来设置