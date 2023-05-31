<template>
  <div class="app">
    <h1>{{msg}}</h1>
    <!-- 通过父组件给子组件传递函数类型的props实现：子给父传递数据 -->
    <School :getSchoolName="getSchoolName"/>
    <!-- 通过父组件给子组件绑定一个自定义事件实现：子给父传递数据（第一种写法：使用@或on） -->
    <Student v-on:atguigu="getStudentName"/>
    <!-- 简写形式 -->
    <Student @atguigu.once="getStudentName" @demo="m1"/>
    <!-- 通过父组件给子组件绑定一个自定义事件实现：子给父传递数据（第二种写法:使用ref） -->
    <Student ref="student"/>
  </div>
</template>

<script>
import Student from './components/Student'
import School from './components/School'

export default {
  name: 'App',
  components:{School,Student},
  data() {
    return {
      msg: 'Hello world!',
    };
  },
  methods: {
    getSchoolName(name){
      console.log("App收到了学校名：",name);
    },
    getStudentName(name,...params){
      // a是个数组
      console.log("App收到了学生名：",name,params);
    },
    m1(){
      console.log("demo事件被触发了");
    }
  },
  mounted() {
    // ref更加灵活
    setTimeout(()=>{
      // 绑定自定义事件
      // this.$refs.student.$on("atguigu",this.getStudentName) 
      // 只能触发一次
      this.$refs.student.$once("atguigu",this.getStudentName)
      // this.$destroy();
    },3000)
  },
  
}
</script>
<style scoped>
.app {
  background-color: grey;
  padding: 5px;
}
</style>