---
title: 控制器层开发
description: 
editLink: false
---

## 参数接收方式
### 1、@RequestBody（请求体）
通常用于接收JSON或XML格式的数据。

使用该注解时，SpringBoot会自动将请求体中的数据转换为方法参数所需的对象类型。这个转换过程是通过消息转换器(Message Converter)来完成的，根据请求的Content-Type头部信息选择合适的消息转换器进行数据的解析和转换。

举例：

1. 使用对象作为参数
    
    前端JSON请求参数：
    ```json
    {
        "userId":"",
        "userName":""
    }
    ```
    后端：
    ```java
    @PostMapping("/users")
    public User createUser(@RequestBody User user) {
        // 创建用户
        // ...
    }

    ```

    注意：为了能够确保将请求体中的数据转换为对象，需要确保请求的Content-Type头部信息正确设置为对应的格式（如 application/json 或 application/xml）。

    ```java
    @PostMapping("/users")
    public User createUser(@RequestBody(required = false) User user) {
        // 创建用户
        // ...
    }
    ```
    设置required参数为false，标识请求体可以为空，user参数为null。

2. 使用数组作为参数

    前端：
    ```json
    [1,2,3]
    ```
    后端：
    ```java
    @PostMapping("/list")
    public User createUser(@RequestBody List<String> userId) {
        // 创建用户
        // ...
    }

    @PostMapping("/list")
    public User createUser(@RequestBody String[] userId) {
        // 创建用户
        // ...
    }
    ```
3. 使用字符串等基础元素作为参数
    前端：
    ```json
    [1,2]
    ```
    后端：
    ```java
    @PostMapping("/list")
    public User createUser(@RequestBody String userId) {
        // 创建用户
        // ...
    }
    ```
    结果，后端如果是什么结构的数据，都会直接被转为sring。
    ```json
    {
        "code": 200,
        "message": "[1,2]"
    }
    ```

### 2、@RequestParam
拼接在URL后面，多个参数使用&进行连接。

#### 常见的请求方式为：
```
GET /user?id=123&name=John
```

controller层：
```java
@GetMapping("/user")
public String getUser(@RequestParam("id") int userId, @RequestParam("name") String userName) {
    // 根据用户ID和用户名获取用户信息
    // ...
    return "user";
}
```

#### 数组请求方式：
```
GET /user?id=1,2,3
```
controller层：
```java
@GetMapping("/user")
public String getUser(@RequestParam int id) {
    // 根据用户ID和用户名获取用户信息
    // ...
    return "user";
}
```