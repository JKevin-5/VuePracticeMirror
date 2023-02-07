<template>
  <div>
    <form action="/">
        <van-search
            v-model="value"
            show-action
            placeholder="请输入搜索关键词"
            @search="onSearch"
            @cancel="onCancel"
        />
    </form>
  </div>
</template>

<script>
// import vuex from '../store';
export default {
  data () {
    return {
        value: '',
    }
  },
  created () {},
  methods: {
    onSearch() {
      var that = this;
      this.$store.commit('showLoading');
      setTimeout(function(){
        that.$store.commit('hideLoading');
        that.$toast.success("查询成功");
      },2000);
    },
    onCancel() {
        this.$toast('取消');
    },
  }
}
</script>

<style lang='less' scoped type='text/css'>

</style>
