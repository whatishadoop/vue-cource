import Cookies from 'js-cookie'

export const setTitle = (title) => {
  window.document.title = title || 'admin'
}

export const setToken = (token, tokenName = 'token') => {
  Cookies.set(tokenName, token)  // 设置token
}

export const getToken = (tokenName = 'token') => {  // 若token本地不存在则使用缺省值token传递后台，此时肯定会返回错误码401
  return Cookies.get(tokenName)  // 获取token
}
