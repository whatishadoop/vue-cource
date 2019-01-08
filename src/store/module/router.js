import { routes, routerMap } from '@/router/router'

const state = {
  routers: routes,
  hasGetRules: false
}

const mutations = {
  CONCAT_ROUTES (state, routerList) {
    // 将过滤后用户可以访问的page和通用页面进行合并返回加入动态路由中
    state.routers = routerList.concat(routes)
    state.hasGetRules = true
  }
}

// 返回一个处理后的新数组
const getAccesRouterList = (routes, rules) => {
  return routes.filter(item => {
    if (rules[item.name]) {  // 利用routes的键名去规则中进行寻找是否有匹配，若有则表示有权访问，递归调用
      // item.children 返回也是个新数组，替换旧数组
      if (item.children) item.children = getAccesRouterList(item.children, rules)
      return true
    } else return false
  })
}

const actions = {
  concatRoutes ({ commit }, rules) {
    return new Promise((resolve, reject) => {
      try {
        let routerList = []
        // es6新增语法Object.entries.every 返回一个数组
        //some方法 只要其中一个为true 就会返回true的，相反，every（）方法必须所有都返回true才会返回true，哪怕有一个false,every通过此特性从而跳过对象值为空的属性，对其不进行任何处理
        if (Object.entries(rules).every(item => item[1])) {  // rules的值item[1]都为true表示所有页面可以访问
          routerList = routerMap
        } else {
          // 获取可以访问的路由信息
          routerList = getAccesRouterList(routerMap, rules)
        }
        commit('CONCAT_ROUTES', routerList)
        resolve(state.routers)
      } catch (err) {
        reject(err)
      }
    })
  }
}

export default {
  state,
  mutations,
  actions
}
