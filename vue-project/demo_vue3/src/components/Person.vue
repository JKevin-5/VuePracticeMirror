<template>
  <div class="person">
    Name: {{name}}
  </div>
</template>

<script lang="ts">
export default {
    name:'Person',
    setup(){
        let name = '张三';

        return {name}
    }
}
</script>

<style scoped>
.person {
    background-color: rgb(114, 114, 237);
    box-shadow: 0 0 10px;
    border-radius: 10px;
    padding: 20px;
}
</style>