1.跨域问题解决，配置三个地方
a.前段代理
vue.config.js
  devServer: {
    proxy: 'http://localhost:8080'  // 若没有匹配的路径则使用该代理服务地址，端口的访问路径和本地访问路径一样，本地启动tomcat 8080进行模拟，本地服务端口使用8081，属于跨域
  }

config/index.js
export const baseURL = process.env.NODE_ENV === 'production'
  ? 'http://production.com'
  : 'http://localhost:8081'   // 设置为当前webpack启动的本地服务地址

user.js 业务接口访问路径
 return axios.request({
    //url: '/getUserInfo',
    //method: 'post',
    url: '/getUserInfo/data.json',    // 对应第三方接口的访问路径，域名为本地地址，在config/index.js配置
    method: 'get',
    data: {
      userId
    }

b.服务端设置cors方式解决跨域


2. 封装axios 用于统一访问使用
a.在config/index.js配置基础信息：用于存放项目的域名配置url
b.请求/响应拦截：创建文件lib/axios.js
c.在api/index.js实例化axios