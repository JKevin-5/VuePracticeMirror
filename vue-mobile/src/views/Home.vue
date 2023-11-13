<template>
  <div>
    <!-- 主内容 -->
    <div id="content">
      <router-view></router-view>
    </div>
    <Tabbars :tabbars="router"/>
  </div>
</template>

<script>
import Tabbars from '../components/Tabbers.vue'
import HeaderD from '../components/Header.vue'
export default {
  components:{
    Tabbars,
    HeaderD
  },
  data () {
    return {
      router:[{
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

#content{
  height: calc(100vh - 50px);
}
</style>
