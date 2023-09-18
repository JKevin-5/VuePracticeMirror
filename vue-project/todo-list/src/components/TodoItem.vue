<template>
  <div :class="classes">
    {{todo.text}}
    <button @click="removeTodo">X</button>
    <button @click="completeTodo">Complete</button>
  </div>
</template>

<script>
export default {
    props: ["todo"],
    data () {
        return {
        }
    },
    computed: {
      classes(){
        return {
          completed: this.todo.state === 'completed'
        }
      }
    },
    created () {},
    methods: {
        removeTodo(){
          this.$emit("remove",this.todo.id)
        },
        completeTodo(){
          this.$emit("complete",this.todo.id)
        }
    }
}
</script>

<style scoped type='text/css'>
.completed {
  text-decoration: line-through;
}
</style>
