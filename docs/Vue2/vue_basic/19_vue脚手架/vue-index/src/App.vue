<template>
  <div id="app">
    <h1 v-text="msg" ref="title"></h1>
    <img alt="Vue logo" src="./assets/logo.png">
    <button @click="showDom">点我获取真实DOM</button>
    <Student name="Jom" sex="man" :age="18"/>
  </div>
</template>

<script>
import Student from './components/Student.vue'

export default {
  name: 'App',
  components: {
    Student
  },
  data() {
    return {
      msg: 'Hello world!',
    };
  },
  methods: {
    showDom() {
      console.log(this.$refs.title) //z'
      console.log(this.$refs.hello)
      console.log(document.getElementById('hello'))
    },
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
