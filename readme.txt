1.vue-cli3.0 引入iview   访问 http://localhost:8080/#/  http://localhost:8080/#/home
2.布局组件的使用
参看 layout.vue
a.vh
vh就是当前屏幕可见高度的1%，也就是说
height:100vh == height:100%;
但是有个好处是当元素没有内容时候，设置height:100%该元素不会被撑开，
但是设置height:100vh，该元素会被撑开屏幕高度一致。

b.vw
vw就是当前屏幕宽度的1%
补充一句，当设置width:100%，被设置元素的宽度是按照父元素的宽度来设置，
但是100vw是相对于屏幕可见宽度来设置的，所以会出现50vw 比50%大的情况


3.栅格布局实现响应式布局
export default [
  {
    path: '/',
    name: 'home',
    component: Layout,  // 页面外围边框布局
    children: [         // 中间content里面是router-view，根据路由用于切换不同的组件
      {
        path: 'home',
        component: Home
      }
    ]
  },