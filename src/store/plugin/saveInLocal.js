//  定义一个持久化存在在本地的state状态管理的插件，即使每次刷新，也不会影响修改后的值,localStorage 中
export default store => {
  //  若本地已经存储了，每次刷新页面都会进行初始化store，用replaceState取代默认初始值
  if (localStorage.state) store.replaceState(JSON.parse(localStorage.state))
  store.subscribe((mutation, state) => { // 就用mutation提交后的本地存储替换提交前的
    console.log("每次有提交mutation时就执行");  //每次提交mutation时，时都将state值存储在本地
    localStorage.state = JSON.stringify(state) // state 是一个对象，转换为json字符串，存储在本地
  })
}
