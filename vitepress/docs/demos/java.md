# Java 
> Java各种代码最小实现
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

## HashMap存储null值问题
1. 首先HashMap是可以保存null值的key和value元素；
2. stream流中Collectors.toMap方法中，如果value是null的情况会导致NullPointerException异常。
    ```java
    @Data
    @NoArgsConstructor
    @AllArgsConstructor
    class TestClass{
        String id;
        String name;
    }
    // 会报错
    List<TestClass> list = Arrays.asList(new TestClass());
    // 不会报错
    List<TestClass> list = Arrays.asList(new TestClass(null,"test"));
    // 会报错
    List<TestClass> list = Arrays.asList(new TestClass("test",null));
    Map<String,String> testMap = list.stream().collect(Collectors.toMap(TestClass::getId,TestClass::getName));
    ```

    校验value值不能为空的位置
    ```java
    private static <T, K, V> BiConsumer<Map<K, V>, T> uniqKeysMapAccumulator(Function<? super T, ? extends K> keyMapper,Function<? super T, ? extends V> valueMapper) {
        return (map, element) -> {
            K k = keyMapper.apply(element);
            // value不能为空，如果为空后续的操作就没有意义
            V v = Objects.requireNonNull(valueMapper.apply(element));
            // 判断key值是否存在，并且value不等于null，如果key值存在，但是value为null，这样就会被覆盖
            V u = map.putIfAbsent(k, v);
            if (u != null) throw duplicateKeyException(k, u, v);
        };
    }
    ```
    3. 可以规避的方式：
        1. 在List转Map之前先进行判断，对象元素的value值是否为null，排除value值为null的对象元素；
        2. 使用putAll的方式修改stream流操作
            ```java
            Map<String,String> hashMap = list.stream()
                    .collect(HashMap::new, (m, i) -> m.put(i.getId(), i.getName()), HashMap::putAll);
            ```
            相当于分别对list的值进行取值，取到两个Key为Id，Key为Name的Map，两个Map合并为一个Map。