<template>
  <div id="main">
    <!-- 主内容 -->
    <div id="content">
      <router-view></router-view>
    </div>
    <Tabbars :tabbars="router"/>
  </div>
</template>

<script>
import Tabbars from '../components/Tabbers.vue'
import TabHeader from '../components/TabHeader.vue'
export default {
  components:{
    Tabbars,
    TabHeader
  },
  data () {
    return {
      router:[{
        name:'self',
        icon:'add-o',
        desc:'自选',
        path:'/home/self'
      },{
        name:'calendar',
        icon:'calendar-o',
        desc:'日历',
        path:'/home/calendar'
      }]
    }
  },
  created () {},
  methods: {}
}
</script>

<style scoped type='text/css'>
#main{
  overflow: hidden;
  background-color: rgb(236, 234, 234);
}
#content{
  overflow: hidden;
  height: calc(100vh - 50px);
}
</style>
