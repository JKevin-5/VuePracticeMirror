<template>
    <van-tabbar v-model="active">
        <van-tabbar-item name="home" replace to="/home" icon="home-o">主页</van-tabbar-item>
        <van-tabbar-item 
            :name="tabbar.name" 
            :icon="tabbar.icon" 
            v-for="(tabbar,index) in tabbars" 
            :key="index" 
            replace :to="tabbar.path">
                {{tabbar.desc}}
            </van-tabbar-item>
        <van-tabbar-item name="setting" icon="user-o" replace to="/user">个人</van-tabbar-item>
    </van-tabbar>
</template>

<script>
export default {
    name:'tabbers',
    props:{
        tabbars: {
            type: Array,
            default: function(){
                return[];
            }
        }
    },
    data () {
        return {
            active:'home'
        }
    },
    created () {},
    methods: {}
}
</script>

<style scoped type='text/css'>

</style>
