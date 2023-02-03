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
// import { Toast } from 'vant';
export default {
  data () {
    return {
        value: '',
    }
  },
  created () {},
  methods: {
    onSearch(val) {
        this.$toast(val);
    },
    onCancel() {
        this.$toast('取消');
    },
  }
}
</script>

<style lang='less' scoped type='text/css'>

</style>
