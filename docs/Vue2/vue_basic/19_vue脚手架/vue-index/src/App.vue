<template>
  <div id="app">
    <h1 v-text="msg" ref="title"></h1>
    <img alt="Vue logo" src="./assets/logo.png">
    <button @click="showDom">点我获取真实DOM</button>
    <Student name="Jom" sex="man" :age="18"/>
  </div>
</template>

<script>
import Item from './components/Item.vue'
import List from './components/List.vue'
import Header from './components/Header.vue'
import Footer from './components/Footer.vue'

export default {
  name: 'App',
  components: {
    Item,List,Header,Footer
  },
  data() {
    return {
      msg: 'Hello world!',
    };
  },
  methods: {
  },
}
</script>