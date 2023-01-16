<template>
    <van-tabbar v-model="active">
        <van-tabbar-item replace to="/home" name="home" icon="home-o" @click="logFuction('home')">首页</van-tabbar-item>
        <van-tabbar-item replace to="/home/personalPossesion" name="personalPossesion" icon="search" @click="logFuction('personalPossesion')">基金</van-tabbar-item>
        <!-- <van-tabbar-item replace to="/home" name="friends" icon="friends-o" @click="logFuction('friends')">朋友圈</van-tabbar-item> -->
        <van-tabbar-item replace to="/home/setting" name="setting" icon="setting-o" @click="logFuction('setting')">设置</van-tabbar-item>
    </van-tabbar>
</template>
<script>
import { onBeforeMount, ref } from 'vue';
import { useRoute } from 'vue-router'
import { toRaw } from 'vue'
import QueryString from 'qs';
export default {
    setup() {
        const active = ref('home');
        const logFuction=(p)=>{
            active.value = p;
        };
        const route = useRoute();
        onBeforeMount(()=>{
            console.log(toRaw(route).fullPath.value.lenght);
        })
        return { active,logFuction };
    }
};
</script>

<style>
    .footer{
        flex-direction: row;
    }
    ul{
        display: flex;
        list-style: none;
        /* padding:8px 0; */
        margin:0;
        justify-content: space-around;
        
    }
    ul > li a{
        display: block;
        /* padding: 4px 8px; */
        text-decoration: none; 
    }
</style>