<template>
    <van-tabbar v-model="active" fixed>
        <van-tabbar-item name="dashboard" replace to="/home/dashboard" icon="home-o">主页</van-tabbar-item>
        <van-tabbar-item 
            :name="tabbar.name" 
            :icon="tabbar.icon" 
            v-for="(tabbar,index) in tabbars" 
            :key="index" 
            replace :to="tabbar.path">
                {{tabbar.desc}}
            </van-tabbar-item>
        <van-tabbar-item name="user" icon="user-o" replace to="/home/user">个人</van-tabbar-item>
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
    watch:{
        $route:{
           handler: function(route) {
                this.active = route.name
            },
            immediate: true
        }
    },
    created () {},
    methods: {}
}
</script>

<style scoped type='text/css'>

</style>
