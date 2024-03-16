<template>
  <div>
    <vue-office-docx
        :src="docx"
        style="height: 100vh;"
        @rendered="renderedHandler"
        @error="errorHandler"
    />
  </div>
</template>

<script>
//引入VueOfficeDocx组件
import VueOfficeDocx from '@vue-office/docx'
//引入相关样式
import '@vue-office/docx/lib/index.css'

export default {
    components: {
        VueOfficeDocx
    },
    data(){
      return {
        docx: 'http://static.shanhuxueyuan.com/test6.docx'
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
      this.docx = this.$route.query.file;
    }
}
</script>
