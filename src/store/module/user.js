import { login, authorization } from '@/api/user'
import { setToken } from '@/lib/util'

const state = {
  userName: 'Lison',
  rules: {}
}
const getters = {
  firstLetter: (state) => {
    return state.userName.substr(0, 1)
  }
}
const mutations = {
  SET_USER_NAME (state, params) {
    state.userName = params
  },
  SET_RULES (state, rules) {
    state.rules = rules
  }
}
const actions = {
  updateUserName ({ commit, state, rootState, dispatch }) {  // commit，state当前文件中的state对象， rootState为在state.js中定义的根state
    // rootState.appName
    // dispatch('xxx'.'xxx') 继续调用action方法
  },
  login ({ commit }, { userName, password }) {
    return new Promise((resolve, reject) => {
      login({ userName, password }).then(res => {
        if (res.code === 200 && res.data.token) {
          setToken(res.data.token)
          resolve()
        } else {
          reject(new Error('错误'))
        }
      }).catch(error => {
        reject(error)
      })
    })
  },
  authorization ({ commit }, token) {
    return new Promise((resolve, reject) => {
      authorization().then(res => {
        if (parseInt(res.code) === 401) {
          reject(new Error('token error'))
        } else {
          setToken(res.data.token)
          resolve(res.data.rules.page)
          commit('SET_RULES', res.data.rules.component)
        }
      }).catch(error => {
        reject(error)
      })
    })
  },
  logout () {
    setToken('')
  }
}

export default {
  getters,
  state,
  mutations,
  actions,
  modules: {  // 子模块中还可以继续引用其他模块，另外模块可以指定namespace : true ,这样在vue页面调用时，通过...mapMutations( 'user1/user2',[]) 方式调用,避免其他模块对其产生污染
    //
  }
}
