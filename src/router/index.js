import Vue from 'vue'
import Router from 'vue-router'
import routes from './router'
import store from '@/store'
import { setTitle, setToken, getToken } from '@/lib/util'

Vue.use(Router)

const router = new Router({
  routes
})

const HAS_LOGINED = false  // 设置为false 默认初始没有登录直接跳转到登录页

router.beforeEach((to, from, next) => {
  to.meta && setTitle(to.meta.title)
  // if (to.name !== 'login') {
  //   if (HAS_LOGINED) next()
  //   else next({ name: 'login' })
  // } else {
  //   if (HAS_LOGINED) next({ name: 'home' })
  //   else next()
  // }
  const token = getToken()
  if (token) {  // 一般认证是自动的需要放在路由守卫中处理，若已有token则直接进行后台认证，无需才进行输入用户名和密码的登录操作
    store.dispatch('authorization', token).then(() => {
      if (to.name === 'login') next({ name: 'home' })  // 如果此时访问的是登录页，则直接到主页
      else next()    // 否则直接到需要跳转的页面
    }).catch(() => {
      setToken('')    // 程序执行到这里是因为token失效，此时需要把token设置为空字符串，避免下面跳转时再次判断有token存在，进入上面if语句造成死循环
      next({ name: 'login' })
    })
  } else {  // 若没有token则表示从来没有登录过或token失效，此时若页面输入的login页面则直接进入login,否则其它页面则跳转到login页面，重新登录，获取新token
    if (to.name === 'login') next()
    else next({ name: 'login' })
  }
})

// router.beforeResolve

router.afterEach((to, from) => {
  // logining = false
})

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
