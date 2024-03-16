<template>
  <div class="app">
    <h1>Hello World</h1>
    <person></person>
  </div>
</template>

<script lang="ts">
import Person from './components/Person.vue';
export default {
  name: 'App',
  components:{
    Person
  }
}
</script>

<style>
.app {
  background-color: #ddd;
  box-shadow: 0 0 10px;
  border-radius: 10px;
  padding: 20px;
}
</style>