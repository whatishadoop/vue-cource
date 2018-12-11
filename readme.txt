1.父组件与子组件的传值  访问http://localhost:8080/#/store 测试
a.父传值给子组件：props传值
   父组件：store.vue
        <a-show :content="inputValue"/>
   子组件：AShow.vue
         props: {  // 使用props
             value: {
               type: [String, Number],
               default: ''
             }
           },

b.子传值给父组件：自定义事件传值
  子组件：AInput.vue
          methods: {
              handleInput (event) {
                const value = event.target.value
                this.$emit('input', value)  // 使用该方式向父组件发送事件以及传递参数值
              }
            }
  父组件：store.vue
          <a-input @input="handleInput"/>  // 绑定事件设置对应处理方法，该方法在父组件中定义

2.bus传值，状态管理：bus即空的vue实例,如用于简单场景下的兄弟组件之间传值，访问http://localhost:8080/#/named_view
a. src下创建bus/index.js文件
    import Vue from "vue"
    const Bus=new Vue()
    export default Bus

b.在main.js引入bus，并添加到vue的原型对象里，然后在任何地方都可以不需要在引入，直接使用this.$bus
    import Bus from './bus/index.js'
    Vue.prototype.$bus=Bus  // 作为全局总线使用

c.在App.vue 文件中实现从兄弟组件A传值给兄弟组件B
<transition-group :name="routerTransition">
  <router-view key="default"/>
  <!--显示按钮-->
  <router-view key="email" name="email"/>
  <!--显示段落-->
  <router-view key="tel" name="tel"/>
</transition-group>

A子组件：  email.vue
    this.$bus.$emit("myHandle",val)
B子组件：  tel.vue
    mouted(){
       this.$bus.$on("myHandle",(val)=>{  //监听自定义事件myHandle
       //在这里处理接收到B组件传递过来的值
       })
    }

3. vuex传值，状态管理：src下创建store文件用于vuex状态管理
a.  vuex入口文件的管理 store/index.js

    Vue.use(Vuex)  // 作为全局组件使用，方便在实例中调用其方法
   // 统一管理vuex 各个通用以及各个模块组件
   export default new Vuex.Store({
     state,  // 通用state
     mutations,  // 通用mutations
     actions,  // 通用actions
     modules: {
       user  // 引入user子模块
     }
   })

b. 在main.js中全局设置store
import store from './store'

new Vue({
  router,
  store,  // 全局引入store
  render: h => h(App)
}).$mount('#app')