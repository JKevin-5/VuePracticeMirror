<template>
    <div>
        <input type="text" @keyup.enter="addTodo" v-model="newTodo"/>
        <div>
            <ul>
                <li v-for="todo in todolist" :key="todo.id">
                    <TodoItem :todo="todo" @remove="removeTodo" @complete="completeTodo"></TodoItem>
                </li>
            </ul>
        </div>
    </div>
</template>

<script>
import TodoItem from '@/components/TodoItem.vue'

let id = 1;
function getId(){
    return id++;
}
export default {
    components:{
        TodoItem
    },
    data() {
        return {
            todolist:[],
            newTodo:""
        }
    },
    methods: {
        addTodo(){
            this.todolist.push({
                id: getId(),
                text: this.newTodo,
                state: 'action'
            })
            this.newTodo = "";
        },
        removeTodo(id){
            this.todolist = this.todolist.filter((todo)=>{
                return todo.id!==id
            })
        },
        completeTodo(id){
            //todo
            const todo = this.todolist.find((todo)=>todo.id === id);
            if(todo){
                todo.state = todo.state === "completed"?"action":"completed";
            }
        }
    },
}
</script>

<style>

</style>