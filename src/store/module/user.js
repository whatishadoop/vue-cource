import { login, authorization } from '@/api/user'
import { setToken } from '@/lib/util'

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
const actions = {
  updateUserName ({ commit, state, rootState, dispatch }) {
    // rootState.appName
  },
  login ({ commit }, { userName, password }) {   // 登录请求
    return new Promise((resolve, reject) => {
      login({ userName, password }).then(res => {   //  放入promise中调用
        if (res.code === 200 && res.data.token) {
          setToken(res.data.token)   // 保存后端token数据
          resolve()
        } else {
          reject(new Error('错误'))  // 返回错误信息
        }
      }).catch(error => {  // 若后端传来的编码是通过nodejs服务中status(401)方法传递过来则会调用catch方法，若是通过req对象中封装传递过来则不会进行catch处理
        reject(error)
      })
    })
  },
  authorization ({ commit }, token) {   // 认证请求
    return new Promise((resolve, reject) => {
      authorization().then(res => {
        if (parseInt(res.code) === 401) {  // 401 Unauthorized（未授权）
          reject(new Error('token error'))
        } else {
          setToken(res.data.token)  // 每次路由守卫都会执行认证请求，成功后返回新的token进行保存用于延长其有效时间重新更新为60s
          resolve()
        }
      }).catch(error => {
        reject(error)
      })
    })
  },
  logout () {   // 退出登陆时用，清除token
    setToken('')
  }
}

export default {
  getters,
  state,
  mutations,
  actions,
  modules: {
    //
  }
}
