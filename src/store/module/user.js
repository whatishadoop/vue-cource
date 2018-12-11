const state = {
  userName: 'Lison'
}
const getters = {
  firstLetter: (state) => {
    return state.userName.substr(0, 1)
  }
}
const mutations = {
  SET_USER_NAME (state, params) {
    state.userName = params
  }
}
const actions = {  // //commit用于提交到mutation,state值当前文件下state,rootState为store/state.js中state
  updateUserName ({ commit, state, rootState, dispatch }) {
    // rootState.appName
    dispatch('xxx', '')  // action可以继续调用其它action方法
  },
  xxx () {
    //
  }
}

export default {
  getters,
  state,
  mutations,
  actions,
  modules: {
    //  继续添加子模块
  }
}
