import { getAppName } from '@/api/app'  // 导入 getAppName 函数， 通过定时器模拟从后台获取数据,

// 定义异步修改状态值的方法：
const actions = {   //  异步操作状态的改变，如通过接受接口的api返回的数据，从而改变state.js的状态值
  // updateAppName ({ commit }) {  // es6写法：{commit}，相当于func(obj){const commit=obj.commit}
  //   getAppName().then(res => {
  //     const { info: { appName } } = res    // es6的语法
  //     commit('SET_APP_NAME', appName)   // 通过commit关联mutations.js中的是set_app_name()方法，从而异步修改state.js状态值
  //   }).catch(err => {
  //     console.log(err)
  //   })
  // }
  async updateAppName ({ commit }) {  // es8的语法，与上面执行结果一样，只是将异步变成同步。
    try {
      const { info: { appName } } = await getAppName()
      commit('SET_APP_NAME', appName)
    } catch (err) {
      console.log(err)
    }
  }
}
export default actions
