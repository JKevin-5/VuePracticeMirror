<template>
  <div>
    <vue-office-pdf 
        :src="pdf"
        style="height:100vh;"
        @rendered="renderedHandler"
        @error="errorHandler"
        :options="options"
    />
  </div>
</template>

<script>
//引入VueOfficeDocx组件
import VueOfficePdf from '@vue-office/pdf'

export default {
    components: {
        VueOfficePdf
    },
    data(){
      return {
        pdf: 'http://static.shanhuxueyuan.com/test.pdf',
        options: {
          width: 500, 
        }
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
      this.pdf = this.$route.query.file;
    }
}
</script>
<style>
.vue-office-pdf-wrapper{
  height: 100%;
}
</style>
