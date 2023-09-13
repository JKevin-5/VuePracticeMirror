<template>
  <div>
    {{todo.text}}
    <button @click="removeTodo">X</button>
  </div>
</template>

<script>
export default {
    props: ["todo"],
    data () {
        return {
        }
    },
    created () {},
    methods: {
        removeTodo(){
            this.$emit("remove",this.todo.id)
        }
    }
}
</script>

<style lang='less' scoped type='text/css'>

</style>
