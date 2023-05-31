<template>
    <div class="school">
        <h2>{{name}}</h2>
        <h2>{{address}}</h2>
        <button @click="sendSchoolName">发送学校名给app</button>
    </div>
</template>

<script>
export default {
    name:'School',
    props:['getSchoolName'],
    data(){
        return {
            name: '张三丰',
            address:'北京'
        }
    },
    methods: {
        sendSchoolName() {
            this.getSchoolName(this.name)
        },
    },
}
</script>

<style scoped>
    .school {
        background-color: skyblue;
        padding: 5px;
    }
</style>