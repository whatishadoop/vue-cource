import Vue from 'vue'
import Vuex from 'vuex'
import state from './state'
import getters from './getters'
import mutations from './mutations'
import actions from './actions'
import user from './module/user'
import saveInLocal from './plugin/saveInLocal'

Vue.use(Vuex)

export default new Vuex.Store({
  strict: process.env.NODE_ENV === 'development',   // 是否开启严格模式,process.env.NODE_ENV ==="devalopment"    ,在开发环境下是严格模式，否则不是
  state, // es6语法相当于state:state
  getters,
  mutations,
  actions,
  modules: {
    user
  },
  plugins: [ saveInLocal ]  //  注册插件
})
