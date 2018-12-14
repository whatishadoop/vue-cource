1.后端代码处理
2.登录登出处理
login.vue以及index.js进行路由控制处理

main.js中mock处理要注释掉 ，否则请求都会被mock拦截
// if (process.env.NODE_ENV !== 'production') require('./mock')

设置webpack后端服务代理,需要重新启动后配置文件才会生效
vue.config.js
 devServer: {
    proxy: 'http://localhost:3000'
  }

// 若是开发环境，请求后台访问的基础路径使用空字符串，这样才能匹配访问代理
export const baseURL = process.env.NODE_ENV === 'production'
  ? 'http://production.com'
  : ''

api/user.js 中定义访问后端的登录业务接口

store/module/user.js 中定义action调用上面api方法

登录输入用户名任意， 密码为123,此密码后端写死了，登录后返回token,

文件/lib/util.js 调用js-cookies工具类进行保存token处理

文件axios.js 处理
interceptors (instance, url) {
    instance.interceptors.request.use(config => {
      config.headers['Authorization'] = getToken()   // 请求拦截器设置每次在请求时都会获取token，统一处理

3.token过期处理
4.退出处理