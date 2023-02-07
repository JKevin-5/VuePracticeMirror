<template>
  <div id="app">
    <van-loading
      v-show="isShow"
      size="24px"
      color="#1989fa"
      vertical
    >加载中...</van-loading>
    <router-view />
  </div>
</template>


<script>
import { mapState } from 'vuex'

export default {
  name: "App",
  computed: {
    ...mapState(['isShow'])
  },
}
</script>


<style scoped>
#app {
  margin: 0;
  padding: 0;
  height: 100%;
}

.van-loading {
  position: fixed !important;
  top: 50%;
  left: 50%;
  transform: translateX(-50%);
}
</style>