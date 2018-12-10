export default store => {  // 定义持久化存储插件(本质是函数)，一般用于浏览器刷新时，自动清理store中所有数据，但我们想保留部分store中数据，一般该插件在初始化实例时调用，在store/index.js 定义插件，可以在网上找其它人写好的插件直接使用
  if (localStorage.state) store.replaceState(JSON.parse(localStorage.state))  // 浏览器刷新后加载localstorage中的先前的state替换初始的的新state对象值
  store.subscribe((mutation, state) => {  // 每次提交mutaion时触发的回调函数
    localStorage.state = JSON.stringify(state)  // 将state对象以字符串保存到浏览器的localstorage中
  })
}
