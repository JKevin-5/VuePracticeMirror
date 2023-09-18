<template>
  <div id="app">
    <!-- todos
    <TodoList></TodoList> -->
    ------------------------------------------<br>
    {{object1}}<br>
    ------------------------------------------<br>
    {{object1.f}}

    <button @click="changeData">修改当前对象里的对象</button>
  </div>
</template>

<script>
// import TodoList from '@/components/TodoList.vue'
export default {
  name: 'App',
  // components:{
  //   TodoList
  // },
  data() {
    return {
      object1:{
        a:1,
        b:'',
        toString(){
          /* eslint-disable*/
          debugger;
          return 'xxxx'
        }
      },
      object3:{
        c:1,
        d:{
          c:new Date()
        }
      }
    }
  },
  methods: {
    changeData(){
      this.object1.f = 2;
      // this.$set(this.object1,'f',2)
    },
    deepClone(newObj,oldObj){
      for(var k in oldObj) {
        var item = oldObj[k]
        if(item instanceof Array){
          newObj[k] = []
          this.deepClone(newObj[k],item)
        } else if (item instanceof Object){
          newObj[k] = {}
          this.deepClone(newObj[k], item)
        } else {
          newObj[k] = item
        }
      }
    }
  },
  created() {
    /**
     * 会刷新tostring方法，画面直接调用object.f不会报错，因为created之后才会进行模板的刷新
     */
    // this.object1.f = 2;
    // this.$set(this.object1,'e',2)
    /**
     * 1. 直接操作对象——无响应式
     */
    // this.object1.d = 'd';
    
    /**
     * 2. 覆盖对象——有响应式
     */
    // let object2 = {
    //   b:1,
    //   c:'1'
    // }
    // this.object1 = object2;

    /**
     * 3. 使用Object.assign——无响应式
     *    本质是对象并没有新增，只是进行浅拷贝
     */
    // Object.assign(this.object1,this.object3)

    /**
     * 4. 对3进行改造，使用深拷贝的方式即可实现响应式
     *    本质是对object1 赋值了一个全新的对象。
     *    vue中的对象无法响应浅层的拷贝，对象层面的变化是可以进行响应式的变化的。 ——有响应式
    //  */
    // Object.assign(this.object1,this.object3)
    // this.object1 = JSON.parse(JSON.stringify(this.object1))

    /**
     * 5. 使用展开运算符，本质也是一个新的对象 ——有响应式
     */
    let object2 = {
      b:1,
      c:new Date()
    }
    // this.object1 = {...this.object1,...object2}

    /**
     * 6. 针对4的改善
     *    本质是赋值了一个新的target对象 ——有响应式
     */
    // this.object1 =  Object.assign({},this.object1,this.object3)

    /**
     * 动态添加单个属性
     */
    // this.$set(this.object1,"x","content");

    /**
     * 7. 对4进行改善
    //  */
    // let index = {}
    // this.deepClone(index,object2)
    // this.object1 = index

  },
  mounted() {
    /**
     * 1. 直接操作对象——无响应式
     */
    // this.object1.d = 'd'; 
    
    /**
     * 2. 覆盖对象——有响应式
     */
    // let object2 = {
    //   b:1,
    //   c:'1'
    // }
    // this.object1 = object2;

    /**
     * 3. 使用Object.assign——无响应式
     *    本质是对象并没有新增，只是进行浅拷贝
     */
    // Object.assign(this.object1,this.object3)

    /**
     * 4. 对3进行改造，使用深拷贝的方式即可实现响应式
     *    本质是对object1 赋值了一个全新的对象。
     *    vue中的对象无法响应浅层的拷贝，对象层面的变化是可以进行响应式的变化的。
     */
    // Object.assign(this.object1,this.object3)
    // this.object1 = JSON.parse(JSON.stringify(this.object1))

    /**
     * 5. 使用展开运算符，本质也是一个新的对象
     */
    // let object2 = {
    //   b:'',
    //   c:'1'
    // }
    // this.object1 = {...this.object1,...object2}

    /**
     * 6. 针对4的改善
     *    本质是赋值了一个新的target对象
     */
    // this.object1 =  Object.assign({},this.object1,this.object3)
    /* eslint-disable*/

    /**
     * 动态添加单个属性
     */
    // this.$set(this.object1,"x","content");
  },
  updated() {
    console.log("视图发生变化")
  },
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
