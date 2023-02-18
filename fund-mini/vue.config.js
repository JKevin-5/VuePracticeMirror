const { defineConfig } = require('@vue/cli-service')
const { VantResolver } = require('unplugin-vue-components/resolvers');
const ComponentsPlugin = require('unplugin-vue-components/webpack');

module.exports = defineConfig({
  transpileDependencies: true,
  publicPath: '/fund-app/',
  configureWebpack: {
    plugins: [
      ComponentsPlugin({
        resolvers: [VantResolver()],
      }),
    ],
  },
  devServer: {
    host: '0.0.0.0',// 局域网中访问的方式，原有的地址是localhost，只允许本机访问
    port: 80,
    proxy: {
        '/api': {
            // 本地环境
            target: 'http://localhost:8001',
            // target: 'http://192.168.31.214:8001',
            changeOrigin: true,// 允许跨域，在本地会创建一个虚拟服务端，然后发送请求的数据，并同时接收请求的数据，这样服务端和服务端进行数据的交互就不会有跨域问题
            ws: true,// 开启webSocket
            pathRewrite: {
                '^/api': '',// 替换成target中的地址
            }
        },
        '/sina':{
          target: 'http://hq.sinajs.cn',// 你要请求的后端接口ip+port
          changeOrigin: true,// 允许跨域，在本地会创建一个虚拟服务端，然后发送请求的数据，并同时接收请求的数据，这样服务端和服务端进行数据的交互就不会有跨域问题
          ws: true,// 开启webSocket
          pathRewrite: {
              '^/sina': '',// 替换成target中的地址
          },
          headers: {
            referer: 'http://finance.sina.com.cn'
          }
      }
    }
  },
})
