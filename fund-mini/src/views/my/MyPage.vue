<template>
  <div class="main">
    <van-cell title="Admin系统管理员" size="large" label="描述信息" />
    <van-cell-group inset title="分组1">
      <van-cell title="个人持仓" is-link to="/position"/>
    </van-cell-group>
  </div>
</template>

<script>
export default {
  data () {
    return {
    }
  },
  created () {},
  methods: {}
}
</script>

<style lang='less' scoped type='text/css'>
.main{
  background-color: #f7f8fa;
  padding-top: 5vh;
  height: 95vh;
  widows: 100vw;
}
</style>
