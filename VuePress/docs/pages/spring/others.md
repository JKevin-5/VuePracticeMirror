---
title: others
description: 记录碎片知识点
sidebar: auto
editLink: false
---

## 一、格式化前后端的Date类型字段
- @JsonFormat
- @DateTimeFormat

### @JsonFormat【jackson】
> 出参格式化，用于规范返回数据的格式。

```java
@JsonFormat(shape = JsonFormat.Shape.STRING, pattern = "yyyy-MM-dd HH:mm:ss", timezone = "GMT+8")
```
- shape: 表示序列化后的数据类型
- pattern： 表示最终日期的格式
- timezone：默认GMT，国内用GMT+8

### @DateTimeFormat【Spring】
> 入参格式化，用于规范入参的格式，如果不为括号内的格式的数据将会报错。
```java
@DateTimeFormat(pattern = "yyyy-MM-dd HH:mm:ss")
```