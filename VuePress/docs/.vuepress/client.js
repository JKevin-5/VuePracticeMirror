import { defineClientConfig } from '@vuepress/client'
import Home from './Layouts/Home.vue'
import List from './Layouts/List.vue'

export default defineClientConfig({
  layouts: {
    Home,
    List
  }
})