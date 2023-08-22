import { defineClientConfig } from '@vuepress/client'
import Footer from './theme/components/Footer.vue'
// import Tags from './components/Tags.vue'

export default defineClientConfig({
  layouts: {
  },
  enhance({
    app
  }){
    app.component('Footer', Footer)
    // app.component('Tags',Tags)
  }
})