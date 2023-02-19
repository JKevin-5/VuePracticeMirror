<template>
  <div>
    <router-view/>
    <van-tabbar v-model="active">
        <van-tabbar-item replace to="/home/main" icon="home-o">主页</van-tabbar-item>
        <van-tabbar-item replace to="/home/search" icon="search">搜索</van-tabbar-item>
        <!-- <van-tabbar-item icon="friends-o">好友</van-tabbar-item> -->
        <van-tabbar-item replace to="/home/my" icon="setting-o">我的</van-tabbar-item>
    </van-tabbar>
  </div>
</template>

<script>
export default {
  data () {
    return {
        active: 0,
    }
  },
  created () {},
  methods: {}
}
</script>

<style lang='less' scoped type='text/css'>

</style>