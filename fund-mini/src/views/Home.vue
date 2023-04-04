<template>
  <div>
    <keep-alive>
      <router-view/>
    </keep-alive>
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
        active: null,
    }
  },
  watch:{
    $route: {
      handler: function(to){
        switch(to.path){
          case '/home/main':
            this.active = 0;
            break;
          case '/home/search':
            this.active = 1;
            break;
          case '/home/my':
            this.active = 2;
            break;
          default:
            this.active = 0;
            break;
        }
      },
      // 深度观察监听
      deep: true,
      immediate: true
    }
  },
  created () {},
  methods: {}
}
</script>

<style lang='less' scoped type='text/css'>

</style>