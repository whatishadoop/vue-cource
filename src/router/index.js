import Vue from 'vue'
import Router from 'vue-router'
import routes from "./router.js"
import {setTitle} from "@/lib/util.js"
Vue.use(Router)
const router=new  Router({
  routes
})
const IS_LOGIN=true   // 根据存储在cookie的登录信息判断是否登录的判断
router.beforeEach((to,form,next)=>{  // router实例的beforeEach方法是注册一个全局前置守卫，从from路由对象到to路由对象，即禁止在没有登录情况下，在网址栏输入admin会跳转到admin页面。
  to.meta && setTitle(to.meta.title)  // 设置页面网址上面的标题 ,meta是在路由router.js中定义的源数据
  if(to.name !=="login"){    // 如果即将跳转的页面不是登录页面,如跳转的是admin页面
    if(IS_LOGIN) {   // 根据是否已经登录，判断是否可以跳转到adminy页面
      next()      // 如果已即登录，就直接跳转
    }else{
      next({name:'login'})    // 如果没有登录，就跳转到登录页面
    }
  }else{   //如果即将跳转的页面是登录页面
    if (HAS_LOGINED) next({ name: 'home' })  // 若登录直接跳转到首页，就直接跳转首页,{name:'home'}也可是'/home'
    else next()  // 直接跳转到登录页
  }
})

router.beforeResolve((to,form,next)=>{  // router实例的beforeResolve方法是注册一个全局守卫，从from路由对象到to路由对象，即页面跳转前所有钩子执行完最后执行该函数 ，

})

router.afterEach((to,form)=>{  // router实例的afterEach方法是注册一个全局后置守卫，从from路由对象到to路由对象，即页面跳转之后执行，
  //loading=false
})

export default router

/**
 * 1. 导航被触发
 * 2. 在失活的组件（即将离开的页面组件）里调用离开守卫 beforeRouteLeave
 * 3. 调用全局的前置守卫 beforeEach
 * 4. 在重用的组件里调用 beforeRouteUpdate   // 在组件中进行路由切换时会触发如/a ,/a/b 此时后面路由会触发该函数
 * 5. 调用路由独享的守卫 beforeEnter
 * 6. 解析异步路由组件
 * 7. 在被激活的组件（即将进入的页面组件）里调用 beforeRouteEnter
 * 8. 调用全局的解析守卫 beforeResolve
 * 9. 导航被确认
 * 10. 调用全局的后置守卫 afterEach
 * 11. 触发DOM更新
 * 12. 用创建好的实例调用beforeRouterEnter守卫里传给next的回调函数
 */
