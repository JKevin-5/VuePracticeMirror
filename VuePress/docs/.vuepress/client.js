import { defineClientConfig } from '@vuepress/client'
import Home from './theme/layouts/Home.vue'
import 'vue-calendar-heatmap/dist/vue-calendar-heatmap.css'
import Footer from './theme/components/Footer.vue'
// import List from './Layouts/List.vue'

export default defineClientConfig({
  layouts: {
    Home,
    // List
  },
  enhance({
    app
  }){
    app.component('Footer', Footer)
  }
})