
## 多重ifelse
::: code-group
```java[问题]
String info = null;
if (xx.getInfo() != null) {
    info = xx.getInfo();
} else if (xx.getInfo1() != null) {
    info = xx.getInfo1();
} else if (xx.getInfo2() != null) {
    info = xx.getInfo2();
} else if (xx.getInfo3() != null) {
    info = xx.getInfo3();
} else if (xx.getInfo4() != null) {
    info = xx.getInfo4();
} else {
    info = "默认选项";
}
```
```java[改善]
List<String> list = new ArrayList<>(Arrays.asList(info, info1, info2, info3, info4, "默认选项"));
list.removeIf(StringUtils::isBlank);
String result = list.get(0);
```
:::