module.exports = {
  css: {
    loaderOptions: {
      sass: {
        // 如下，视频中的代码参数是data而不是prependData，通过官网打开后，参数应如下
        // https://cli.vuejs.org/guide/css.html#passing-options-to-pre-processor-loaders
        // prependData: `@import "./src/lib/hotcss/px2rem.scss";`
        prependData: `@import "./src/assets/style/main.scss";`
      }
    }
  },
  devServer: {
    // /* 设置为0.0.0.0则所有的地址均能访问 */
    // host: '0.0.0.0',
    port: 8001,
    https: false,
    hotOnly: false,
    proxy: { // 配置跨域
      '/api': {
        target: "http://yapi.demo.qunar.com",
        ws: true,
        changOrigin: true,
        pathRewrite: {
          '^/api': '/mock/90681/api'
        }
      }
    },
    before: app => {}
  }
}