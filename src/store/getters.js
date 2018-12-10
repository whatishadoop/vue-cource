const getters = {
  appNameWithVersion: (state) => {  // 该处的state对象表示处理同级别的state.js中的对象state
    return `${state.appName}v2.0`  // es6模板语法
  }
}
export default getters
