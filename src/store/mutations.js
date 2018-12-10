import vue from 'vue'

const mutations = {
  SET_APP_NAME (state, params) {  // 获取传递的参数
    state.appName = params
  },
  SET_APP_VERSION (state) {
    // vue.set(state, 'appVersion', 'v2.0')  // 通过set方法动态向state中设置新的属性，并添加监视,自动渲染
    state.appVersion = 'v2.0'  // 此时没有监视，无法自动渲染到页面
  },
  SET_STATE_VALUE (state, value) {
    state.stateValue = value
  }
}
export default mutations
