<template>
  <div>
    <vue-office-excel
        :src="excel"
        style="height: 100vh;"
        @rendered="renderedHandler"
        @error="errorHandler"
    />
  </div>
</template>

<script>
//引入VueOfficeExcel组件
import VueOfficeExcel from '@vue-office/excel'
//引入相关样式
import '@vue-office/excel/lib/index.css'

export default {
    components: {
        VueOfficeExcel
    },
    data(){
      return {
        excel: 'http://static.shanhuxueyuan.com/demo/excel.xlsx'
      }
    },
    methods: {
        renderedHandler() {
            console.log("渲染完成")
        },
        errorHandler() {
            console.log("渲染失败")
        }
    },
    created(){
      this.excel = this.$route.query.file;
    }
}
</script>
<style>
</style>
