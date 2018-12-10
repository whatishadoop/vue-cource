import { getAppName } from '@/api/app'  // 模拟后台接口调用方法

const actions = {  // action用于处理异步请求，如请求后台接口获取数据，而mutation用于同步处理逻辑
  // updateAppName ({ commit }) {  // es6语法异构解析方法 等价于 const commit = paramOjb.commit 方式获取
  //   getAppName().then(res => {
  //     const { info: { appName } } = res
  //     commit('SET_APP_NAME', appName)
  //   }).catch(err => {
  //     console.log(err)
  //   })
  // }
  async updateAppName ({ commit }) {   // 采用同步方式，只有getAppName执行完，才会执行下面的commit 方法调用
    try {
      const { info: { appName } } = await getAppName()
      commit('SET_APP_NAME', appName)
    } catch (err) {
      console.log(err)
    }
  }
}
export default actions
