1.vuex传值，状态管理：src下创建store文件用于vuex状态管理
a.  vuex入口文件的管理 store/index.js

    Vue.use(Vuex)  // 作为全局组件使用，方便在实例中调用其方法
   // 统一管理vuex 各个通用以及各个模块组件
   export default new Vuex.Store({
     state,  // 全局状态参数管理 es6语法相当于state:state
     mutations,  // 通用mutations
     actions,  // 通用actions
     getters,   // 相当于计算属性，对state参数的计算
     modules: {
       user  // 单独某个模块如用户模块user的状态管理
     }
   })

b. 在main.js中全局设置store
import store from './store'

new Vue({
  router,
  store,  // 全局引入store
  render: h => h(App)
}).$mount('#app')

c.其中state.js全局状态参数管理
store/state.js 定义全局参数：
const state = {
  appName: 'admin'
}
export default state

2. 全局以及子模块状态获取
a.调用全局state参数值：
 方法1：
    在某个组件内{{this.$store.state.appName}}就可获取该值了，或通过可在该组件写入到计算属性中computed
    computed:{
     appName(){
       return this.$store.state.appName
     }
    }
    <p>{{appName}}</p>     
      
 方法2：
    import {mapState} from "vuex"
    computed:{
      ...mapState(["appName"])  // 方法2.1...表示展开一个对象。
//     ...mapState({              // 方法2.2
//     appName:state=>state.appName
//     })
    }
    <p>{{appName}}</p>

b. store/module/user.js 获取模块中user.js里面的状态参数管理
   定义单独某个模块中全局参数
   const state={
     userName:"我是user模块的参数值"
   }
 const mutations={}
 const actions={}
 export default{
   state,
   mutations,
   actions
 }     

  调用单独某个模块全局参数值：   
  方法1：
    在某个组件内{{this.$store.state.user.userName}}就可获取该值了，或通过可在该组件写入到计算属性中computed
     computed:{
        userName(){
           return this.$store.state.user.userName
          }
     }
      <p>{{userName}}</p>
  方法2：
     import {mapState} from "vuex"
     computed:{
       ...mapState(["userName"])  //这3种写法一样。...表示展开一个对象。
  //    ...mapState({
  //    userName:state=>state.user.userName
  //    })
  //    ...mapState("user",{        //传入模块名
  //      userName:state=>state.userName
  //    })
     }
     <p>{{userName}}</p>


  方法3：
  注意：在模块状态管理中如果有命令空间，即
    export default{
      namespaced:true,   //设置模块命名空间为true,使得模块更加密闭，不受到外界的干扰
      state,
      mutations,
      actions
    }

     import {createNamespacedHelpers} from "vuex"
     const {mapState}=createNamespacedHelpers("user")    //参数user是命令空间的名称(模块名，user.js)
       computed:{
          ...mapState(["userName"])  //这2种写法一样。...表示展开一个对象。
  //       ...mapState({              //不许要在传入模块名了
  //       userName:state=>state.userName  
  //       })
       }
    
       <p>{{userName}}</p>

3.getters.js相当于组件的computed计算属性，是对state状态的计算处理。 在模块如user.js中使用getters和使用state方法一样
  a. 定义getters（计算属性）：
   const getters={
    appNameVersion:(state)=>{    //依赖于state.js
       return state.appName+"v2.0"
    }
   }
   export default getters
  b.调用getters（计算属性的结果）：
   方法1：
     在某个组件内{{this.$store.getters.appNameVersion}}就可获取该值了，或通过可在该组件写入到计算属性中computed
       computed:{
         appNameVersion(){
           return this.$store.getters.appNameVersion
         }
       }
       <p>{{appNameVersion}}</p>
   方法2：
     import {mapGetters} from "vuex"
     computed:{
       ...mapGetters(["appNameVersion"])  //这3种写法一样。...表示展开一个对象。
  //    ...mapGetters({
  //      userName:state=>state.appNameVersion   
  //    })
     }
         <p>{{appNameVersion}}</p>

4.mutations.js修改state状态参数的值
a.在mutations定义修改state的事件：
  import vue from "vue"
  const mutations={
      set_app_name(state,params){    //state表示store/state.js，params是要修改state状态中参数的新值，可能是对象，或字符串
         state.appName=params      //参数时字符串
    //    state.appName=params.appName    //参数时对象
      },
      set_app_version(state){     //如果stata.js中没改属性参数，这个表示给state.js中添加version并赋值v2.0
        vue.set(state,"version","v2.0")    
      }             
  }
  export default mutations
        
b.在组件里方法中直接调用上面定义的事件：
 方法1：
   this.$store.commit("set_app_name","我是state.js里新修改的appName的值")  //参数是字符串
   this.$store.commit("set_app_name",{appName:"我是state.js里新修改的appName的值"})  //参数是对象
   this.$store.commit({type:"set_app_name",appName:"我是state.js里新修改的appName的值"})  //参数是对象,且事件也包含在对象里

 方法2：
   在组件的方法里
     import {mapMutations} from "vuex"
       methods(){
         ...mapMutations([
             "set_app_name",
             "set_app_version"
         ]),
         Handle(){
             this.set_app_version("newAppName");
            this.set_app_name()
         }
       }
  注意：mutations和getters和actions在模块里面是在模块里且没有命令空间限制，会默认将模块中的mutations和getters和actions注册在全局store文件下的mutations.js和getters.js和actions.js，如下写，且不需要传入模块名，如"user",如果有命令空间限制namespaced:true,   // 设置命名空间为true,使得模块更加密闭，不受到外界的干扰
            ...mapMutations([
            "set_app_name",
             set_app_version"
           ]),    
    否则需要设置
                  ...mapMutations("user",[    //需要传入模块名
             "set_app_name",
             "set_app_version"
          ]),                            

5. 根模块action.js异步修改state.js的状态值，如通过获取后台数据，将state.js的值修改成后台获取的数据,一般用于acion用于异步处理，而mutation用于同步处理
   a. 定义action异步修改状态值的方法：
   参看store/action.js

   b. 调用异步修改的状态值的方法
    方法1：
       import {mapAction} from "vuex"
        methods(){
          ...mapAction([
             "updateAppName"
          ]),
          Handle(){                
            this.updateAppName()  // 上面引入后直接调用
          }
        }      
         
    方法2：
       this.$store.dispatch("updateAppName",val)

6.子模块中定义action方法
 参看user.js        
          
7.动态注册state状态模块 ，在 store.vue定义
//首先点击按钮注册该模块，下面会自动显示段落文字
<button @click="registerModule">动态注册模块</button>
<p v-for="(li, index) in todoList" :key="index">{{ li }}</p>  // 显示注册的内容，通过计算属性todoList

computed: {
    ...mapState({
       todoList: state => state.user.todo ? state.user.todo.todoList : []  // 动态注册模块有时没注册或者注册后延时导致立马不能取到，设置个默认值[]
    }),

methods: {
    registerModule () {
      this.$store.registerModule(['user', 'todo'], {  // 动态向user子模块下注册todo 模块的状态
        state: {
          todoList: [
            '学习mutations',
            '学习actions'
          ]
        }
      })
    }
  }
}