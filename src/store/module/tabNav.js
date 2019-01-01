import { routeHasExist, getRouteById, routeEqual, localSave, localRead } from '@/lib/util'

const state = {
  tabList: JSON.parse(localRead('tabList') || '[]')  // 先从本地读取，没有则直接返回空数组
}

// 定义需要进行本地存储的对象
const getTabListToLocal = tabList => {
  return tabList.map(item => {
    return {
      name: item.name,
      path: item.path,
      meta: item.meta,
      params: item.params,
      query: item.query
    }
  })
}

const mutations = {
  UPDATE_ROUTER (state, route) {
    // 点击左侧菜单时，若tablist已经有对应的菜单项而且传递的参数也一样，则不再往里添加，直接显示已有的菜单项
    // 过滤掉登录页login
    if (!routeHasExist(state.tabList, route) && route.name !== 'login') state.tabList.push(route)
    // 本地进行存储，此时重新刷新页面，tab项依然存在
    localSave('tabList', JSON.stringify(getTabListToLocal(state.tabList)))
  },
  REMOVE_TAB (state, index) {
    state.tabList.splice(index, 1)
    localSave('tabList', JSON.stringify(getTabListToLocal(state.tabList)))
  }
}

const actions = {
  handleRemove ({ commit }, { id, $route }) {
    return new Promise((resolve) => {
      let route = getRouteById(id)  // 根据传入id找到对应的对象，并找到对应的索引值
      let index = state.tabList.findIndex(item => {
        return routeEqual(route, item)
      })
      // 找到路由对象后将其从tablist中删除
      let len = state.tabList.length
      let nextRoute = {}
      // 此处判断该标签右侧还有标签，则跳转到右侧下一个标签tab
      if (routeEqual($route, state.tabList[index])) {
        if (index < len - 1) nextRoute = state.tabList[index + 1]  // 若是从中间关闭一个tab，则打开它的后一个
        else nextRoute = state.tabList[index - 1]  // 若是关闭最后一个，则选中前一个tab
      }
      const { name, params, query } = nextRoute || { name: 'home_index' }  // 若是nextRoute有值则使用它进行路由跳转，若没值则默认使用home_index跳转
      // 提交删除
      commit('REMOVE_TAB', index)
      resolve({
        name, params, query  // 将这三个值返回
      })
    })
  }
}

export default {
  state,
  mutations,
  actions
}
