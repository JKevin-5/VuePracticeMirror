import { fileURLToPath, URL } from 'node:url'

import { defineConfig } from 'vite'
import legacy from '@vitejs/plugin-legacy'
import vue2 from '@vitejs/plugin-vue2'
import Components from 'unplugin-vue-components/vite'
import { VantResolver } from 'unplugin-vue-components/resolvers';
import { viteMockServe } from "vite-plugin-mock";

export default defineConfig( ({ command, mode }) => ({
  plugins: [
    vue2(),
    legacy({
      targets: ['ie >= 11'],
      additionalLegacyPolyfills: ['regenerator-runtime/runtime']
    }),
    Components({
      resolvers:[VantResolver()]
     }),
     viteMockServe({
      mockPath:'./mock', // mock文件存放路径
      localEnabled: command ==='serve' && mode === 'mock', // 在开发环境中使用mock
     })
  ],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url))
    }
  }
}))