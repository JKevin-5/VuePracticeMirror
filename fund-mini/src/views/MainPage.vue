<template>
  <div style="padding-top: 20px;">
    <van-row type="flex" justify="space-around">
      <van-col span="6">span: 8</van-col>
      <van-col span="6">span: 8</van-col>
      <van-col span="6">span: 8</van-col>
    </van-row>
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
.van-col {
  background-color: aqua;
  border-width: 10px;
  border-color: black;
}
</style>
