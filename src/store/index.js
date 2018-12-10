import Vue from 'vue'
import Vuex from 'vuex'
import state from './state'
import getters from './getters'
import mutations from './mutations'
import actions from './actions'
import user from './module/user'
import router from './module/router'
import tabNav from './module/tabNav'
// import saveInLocal from './plugin/saveInLocal'

Vue.use(Vuex)

export default new Vuex.Store({
  strict: false,  // 设置是否开启严格模式，若开启则在组件中直接对$store.state.xxx赋值则会报错提示不要在mutation 外修改state的值
  state,
  getters,
  mutations,
  actions,
  modules: {
    user,
    router,
    tabNav
  }
  // plugins: [ saveInLocal ]   // 定义插件，每次有commit mutation时都会触发该插件回调方法
})
