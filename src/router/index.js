import Vue from 'vue'
import Router from 'vue-router'
import { routes } from './router'
import store from '@/store'
import { setTitle, setToken, getToken } from '@/lib/util'
import clonedeep from 'clonedeep'

Vue.use(Router)

const router = new Router({
  routes
})

const HAS_LOGINED = false

router.beforeEach((to, from, next) => {
  to.meta && setTitle(to.meta.title)
  // if (to.name !== 'login') {
  //   if (HAS_LOGINED) next()
  //   else next({ name: 'login' })
  // } else {
  //   if (HAS_LOGINED) next({ name: 'home' })
  //   else next()
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
    if (!store.state.router.hasGetRules) {  // 若没有获取权限规则已存在信息，则进行后台访问
      store.dispatch('authorization').then(rules => {
        store.dispatch('concatRoutes', rules).then(routers => {
          router.addRoutes(clonedeep(routers))  // 动态添加路由，router.addRoutes是异步的
          // next({ ...to, replace: true })重新载入刷新,hack方法 确保addRoutes已完成 ,set the replace: true 设置导航历史记录不丢失，Vue利用hack方式进行自刷新
          next({ ...to, replace: true })
        }).catch(() => {
          // 执行失败跳转到登录页
          next({ name: 'login' })
        })
      }).catch(() => {
        // 获取权限接口失败则跳转登录页
        setToken('')  // 设置token为空字符串，避免无效的再次上面处理
        next({ name: 'login' })
      })
    } else {
      // 权限信息已经动态加载到路由上，则直接跳转
      next()
    }
  } else {// token 无效
    // 若将要访问的登录页，则继续访问，先进行登录认证，获取token
    if (to.name === 'login') next()
    else next({ name: 'login' })  // 若访问的不是登录页，则跳转到登录页，next可以重新设置访问路径
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
