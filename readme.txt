1.通过路由解析组装菜单
2.点击菜单，动态生成tab ,并对tab标识唯一id(路由名+参数组成对象)
3.点击tab页，将id转换成路由对象，通过push切换，用参数页menu进行切换
4.点击tab页同时，菜单也进行切换，通过:active-name="$route.name"，
5.点击tab页同时，菜单自动展开Menu :open-names="openNames" ，并且要设置对该属性watch,手动刷新菜单
watch: {
    openNames () {
      this.$nextTick(() => {
        this.$refs.menu.updateOpened()
      })
    }
  },

6.通过设置属性 closable 可以关闭某一项，仅在 type 为 card 时有效。<Tabs type="card" closable> ,这样可以
  关闭tab标签只是删除tabdom节点，但tablist数组中视图元素并没有被删除，造成数据和视图不匹配了，本质应该删除对应数组中的数据，通过labelRender render函数实现tab标签，并在render标签上注册对应的删除事件方法

7. 删除当前tab ,自动切换到前一个tab,或后一个tab
8.保存tablist到本地浏览器中
9.将layout中的watch监听放入app.vue中

 watch: {   // 将点击菜单，新增tab放在这里，若放在layout中进行监听，因为路由切换，导致layout会被重新渲染，原来的layout中watch事件失效
    '$route' (newRoute) {
      this.UPDATE_ROUTER(newRoute)
    }
  },