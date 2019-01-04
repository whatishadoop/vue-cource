1.后端代码处理
2.登录登出处理
login.vue以及index.js进行路由控制处理

main.js中mock处理要注释掉 ，否则会引入mock包对请求都会被mock拦截
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

学习笔记
1. 路由跳转地址页面，传递复杂参数
<template>
  <div class="hello">
    <ul>
    <router-link :to="{path:'/bvue',query:{a_data:[1,2,3],b_data:[4,5,6]}}">bvue</router-link>
    <router-link :to="{path:'/cvue',query:{c_data:{a:1,b:2,c:3}}}">cvue</router-link>
    </ul>
  </div>
</template>

2.需要再路由中定义解析方式
path: '/bvue',
      props: {
        modal: router => ({
          a_data: router.query.a_data,
          b_data: router.query.b_data
        })
      },


3.在另一个b.vue 通过props来接收其它vue页面传递过来的数据，路由中处理后的数据
<template>
  <div class="b_vue">
   {{a_data}}==={{b_data}}
  </div>
</template>

<script>
export default {
  props:["a_data","b_data"]
}


路由定义,如果 props 被设置为 true，route.params 将会被设置为接收组件的属性,属于默认缺省为true
const User = {
  props: ['id'],
  template: '<div>User {{ id }}</div>'
}
const router = new VueRouter({
  routes: [
    { path: '/user/:id', component: User, props: true },

    // 对于包含命名视图的路由，你必须分别为每个命名视图添加 `props` 选项：
    {
      path: '/user/:id',
      components: { default: User, sidebar: Sidebar },
      props: { default: true, sidebar: false }
    }
  ]
})

//上面定义好路由，以及解析路由传递参数方式，下面通过手动调用push方法控制路由跳转，并进行参数传递
const userId = 123
router.push({ name: 'user', params: { userId }}) // -> /user/123
router.push({ path: `/user/${userId}` }) // -> /user/123
// 这里的 params 不生效
router.push({ path: '/user', params: { userId }}) // -> /user