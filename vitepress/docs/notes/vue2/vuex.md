## Overview
[Vuex官网](https://vuex.vuejs.org/zh/)

![参考vuex官网图片](https://vuex.vuejs.org/vuex.png)

几个环节：
- State
- Actions
- Mutations

- Getters

## State

Vuex使用单一状态树，State相当于Vue实例中的data，是store的唯一数据源。

```js
// 在vue实例中使用
this.$store.state.变量名
```

### mapState
如果需要在vue实例中使用多个state变量，可以使用mapState辅助函数，借助computed计算属性。
```js
import { mapState } from 'vuex'

export default {
  // ...
  computed: {
    localComputed () { /* ... */ },
    ...mapState({
        // 箭头函数可使代码更简练
        count: state => state.count,

        // 传字符串参数 'count' 等同于 `state => state.count`
        countAlias: 'count',

        // 为了能够使用 `this` 获取局部状态，必须使用常规函数
        countPlusLocalState (state) {
        return state.count + this.localCount
        }
    })
  }
}
```
简化的方式，可以使用数组的方式进行简单的使用。
```js
computed: mapState([
  // 映射 this.count 为 store.state.count
  'count'
])
```

## Actions


## Mutations
