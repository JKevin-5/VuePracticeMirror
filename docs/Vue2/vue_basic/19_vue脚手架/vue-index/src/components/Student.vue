<template>
    <div class="student">
        <h2>{{name}}</h2>
        <h2>{{sex}}</h2>
        <h2>{{number}}</h2>
        <button @click="add">点我number++</button>
        <button @click="sendStudentName">发送学生名给app</button>
        <button @click="unband">解绑atguigu事件</button>
        <button @click="dead">销毁student实例对象</button>
    </div>
</template>

<script>
export default {
    name:'Student',
    data(){
        return {
            name: '张三',
            sex:'man',
            number: 0
        }
    },
    methods: {
        sendStudentName() {
            // 触发Student组件实例身上的atguigu事件
            this.$emit('atguigu',this.name,111,222,333),
            this.$emit('demo')
        },
        unband() {
            // this.$off('atguigu') // 解绑一个自定义事件
            // this.$off(['atguigu','demo']) //解绑多个自定义事件
            this.$off() // 暴力解绑 解绑所有的自定义事件
        },
        dead() {
            this.$destroy(); // 销毁了当前的student组件实例，student的实例自定义事件不奏效
                            //this失效了，视频vue2.6 原生事件没有被销毁，但是如果是vue2.7+，原生事件也会被销毁
        },
        add() {
            this.number++;
        }
    },
}
</script>

<style scoped>
    .student {
        background-color: pink;
        padding: 5px;
        margin-top: 5px ;
    }
</style>