import { defineClientConfig } from '@vuepress/client'
import Footer from './theme/components/Footer.vue'

export default defineClientConfig({
  layouts: {
  },
  enhance({
    app
  }){
    app.component('Footer', Footer)
  }
})