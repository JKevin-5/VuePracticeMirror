<template>
  <div style="padding-top: 20px;">
    <button @click="getShInfo">search</button>
    <van-grid :column-num="3">
      <van-grid-item v-for="info in infos" :key="info.value">
        <p><span>{{info.stock_name}}</span></p>
        <p>
          <md-amount 
          :value="info.up"
          :duration="500"
          transition
          :precision="3"></md-amount>
        </p>
        <p>
          <md-amount 
          :value="info.value"
          :duration="500"
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
      }
      getSinaInfo([
        's_sh000001'  // 上证指数
        ,'s_sz399001' // 深证成指
        ,'bj899050'   // 北证50
        ,'sz399006'   // 创业板指
        ,'sh000300'   // 沪深300
        ,'gb_dji'     // 道琼斯
        ,'gb_ixic'    // 纳斯达克
        ,'gb_inx'     // 标普500指数
        ,'rt_hkHSI'   // 恒生指数
        ,'b_NKY'      // 日经225指数
      ],successFun);
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
