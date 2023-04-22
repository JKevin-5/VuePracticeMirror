<template>
    <div>
        <h2>学生姓名：{{name}}</h2>
        <h2>学生性别：{{sex}}</h2>
        <h2>学生年龄：{{age+1}}</h2>
    </div>
</template>

<script>
export default {
    name: 'Student',
    // props:['name','sex','age'],简单接收

    // 接收的同时对数据进行类型限制
    // props:{
    //     name:String,
    //     age:Number,
    //     sex:String
    // },

    // 接收的同时对数据，进行类型限制+默认值的指定+必要性的限制
    props:{
        name : {
            type:String,
            required:true
        },
        age : {
            type:Number,
            default:99
        },
        sex:String
    },
    data() {
        return {
        };
    },

    mounted() {
        
    },

    methods: {
        
    },
};
</script>

<style lang="scss" scoped>

</style>