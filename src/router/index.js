import Vue from 'vue'
import Router from 'vue-router'
import { routes } from './router'
import store from '@/store'
import { setTitle, setToken, getToken } from '@/lib/util'

Vue.use(Router)  // 注册路由相关组件 ，使用其标签 如<router-link>等

const router = new Router({  // 创建路由实例，在每个组件实例中通过this.$router调用其js api方法处理
  // mode: history,  // 默认是hash模式使用#/ 后面接url实现无刷新页面切换，正式上线设置为history模式实现无刷新切换，效果一样，匹配不到静态资源都会指向index.html
  routes
})

const HAS_LOGINED = false  // 从后台接口传递的参数，判断是否已经登录

// 设置路由前置全局守卫，处理在跳转到导航到指定页面过程中进行例如：是否可以登录，是否有权限访问等判断
// to跳转后路由对象，from跳转前路由对象,next是函数用于确定跳转时用
router.beforeEach((to, from, next) => {
  to.meta && setTitle(to.meta.title)  // 获取路由元数据信息，若前面to.meta 定义且存在则会执行后面函数，替代if功能 ，修改页面title 显示信息
  // if (to.name !== 'login') {  // 判断跳转的页面不是登录页
  //   if (HAS_LOGINED) next()   // 若有权限访问，则直接跳转到指定页面，否则直接跳转到登录页，通过命名路由方式，也可以直接路径方式，没有权限则直接跳转到登录页
  //   else next({ name: 'login' })
  // } else {   // 若是登录页，并且由权限则直接跳转到主页
  //   if (HAS_LOGINED) next({ name: 'home' })
  //   else next()  // 没权限则直接跳转到登录页
  // }

  // const token = getToken()
  // if (token) {
  //   store.dispatch('authorization', token).then(() => {
  //     if (to.name === 'login') next({ name: 'home' })
  //     else next()
  //   }).catch(() => {
  //     setToken('')
  //     next({ name: 'login' })
  //   })
  // } else {
  //   if (to.name === 'login') next()
  //   else next({ name: 'login' })
  // }

  const token = getToken()
  if (token) {
    if (!store.state.router.hasGetRules) {
      store.dispatch('authorization').then(rules => {
        store.dispatch('concatRoutes', rules).then(routers => {
          router.addRoutes(routers)
          next({ ...to, replace: true })
        }).catch(() => {
          next({ name: 'login' })
        })
      }).catch(() => {
        setToken('')
        next({ name: 'login' })
      })
    } else {
      next()
    }
  } else {
    if (to.name === 'login') next()
    else next({ name: 'login' })
  }
})

// 后置路由钩子，它不能控制路由跳转，所以不能称为守卫，
// router.beforeResolve
router.afterEach((to, from) => {
  // logining = false   // 常用语处理: 登录后取消登录时加载效果
})

// 下面是导航的解析流程
/**
 * 1. 导航被触发
 * 2. 在失活的组件（即将离开的页面组件）里调用离开守卫 beforeRouteLeave
 * 3. 调用全局的前置守卫 beforeEach
 * 4. 在重用的组件里调用 beforeRouteUpdate
 * 5. 调用路由独享的守卫 beforeEnter
 * 6. 解析异步路由组件
 * 7. 在被激活的组件（即将进入的页面组件）里调用 beforeRouteEnter
 * 8. 调用全局的解析守卫 beforeResolve
 * 9. 导航被确认
 * 10. 调用全局的后置守卫 afterEach
 * 11. 触发DOM更新
 * 12. 用创建好的实例调用beforeRouterEnter守卫里传给next的回调函数
 */

export default router
