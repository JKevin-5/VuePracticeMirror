<template>
  <div style="padding-top: 20px;">
    <button @click="getShInfo">search</button>
    <van-grid :column-num="3">
      <van-grid-item v-for="value in 6" :key="value" icon="photo-o" text="文字" />
      <van-grid-item v-for="info in infos" :key="info.value">
        <p><span>{{info.stock_name}}</span></p>
        <p>
          <md-amount 
          :value="info.value"
          :duration="800"
          transition
          :precision="3"></md-amount>
        </p>
      </van-grid-item>
    </van-grid>
  </div>
</template>
    
<script>
import {getSinaInfo} from '@/axios/sinaApi'
export default {
  data () {
    return {
      infos:[]
    }
  },
  created () {},
  methods: {
    getShInfo(){
      var self = this;
      self.infos = [];
      let successFun = function(result){
        self.infos = result
        console.log(self.infos)
      }
      getSinaInfo(['s_sh000001','s_sz399001','hk00700'],successFun);
    },

  },
  destroyed(){

  }
}
</script>

<style lang='less' scoped type='text/css'>
.van-col {
  background-color: aqua;
  border-width: 10px;
  border-color: black;
}
</style>
