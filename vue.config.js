const path = require('path')

const resolve = dir => path.join(__dirname, dir)  // 获取当前目录根路径

const BASE_URL = process.env.NODE_ENV === 'production' ? '/' : '/'  // 配置生产环境与开发环境域名路径

module.exports = {
  lintOnSave: false,
  baseUrl: BASE_URL,
  chainWebpack: config => {
    config.resolve.alias  // 配置映射文件别名
      .set('@', resolve('src'))  // 根路径 + src
      .set('_c', resolve('src/components'))
  },
  // 打包时不生成.map文件
  productionSourceMap: false,
  devServer: {
    // proxy: 'http://localhost:3000'  // 代理用于跨域请求
  }
}
