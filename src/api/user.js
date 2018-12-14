import axios from './index'

export const getUserInfo = ({ userId }) => {  // es6语法解构赋值
  return axios.request({
    url: '/getUserInfo',
    method: 'post',
    data: {
      userId
    }
  })
}

export const login = ({ userName, password }) => {   // { userName, password } 属于es6语法解构赋值获取传入对象中所需参数
  return axios.request({
    url: '/index/login',
    method: 'post',
    data: {
      userName,
      password
    }
  })
}

export const authorization = () => {
  return axios.request({
    url: '/users/authorization',
    method: 'get'
  })
}
