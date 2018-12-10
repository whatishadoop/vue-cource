<template>
  <div>
    <!--<a-input :value="stateValue" @input="handleStateValueChange"/>--> <!--通过mustation机制实现v-model双向绑定事件,这种方式比较麻烦，一般采用如下方式v-model 结合计算属性的get,set方式-->
    <a-input v-model="stateValue"/>  <!--子组件可以绑定父组件中事件，v-modle本质是 v-bind:xxx属性 以及 监听@input 事件=-->
    <p>{{ stateValue }} -> lastLetter is {{ inputValueLastLetter }}</p>
    <!-- <a-show :content="inputValue"/> -->
    <p>appName: {{ appName }}, appNameWithVersion : {{ appNameWithVersion }}</p>
    <p>userName : {{ userName }}, firstLetter is : {{ firstLetter }}</p>
    <button @click="handleChangeAppName">修改appName</button>
    <p>{{ appVersion }}</p>
    <button @click="changeUserName">修改用户名</button>
    <button @click="registerModule">动态注册模块</button>
    <p v-for="(li, index) in todoList" :key="index">{{ li }}</p>
  </div>
</template>
<script>
import AInput from '_c/AInput.vue'
import AShow from '_c/AShow.vue'
import { mapState, mapGetters, mapMutations, mapActions } from 'vuex' // 获取state方式二: 使用mapState，此处{mapState}为es6的解构赋值方式, 等价于import from  'vuex' ; const mapState = vuex.mapState
export default {
  name: 'store',
  data () {
    return {
      inputValue: ''
    }
  },
  components: {
    AInput,
    AShow
  },
  computed: {
    // ...mapState({
    //   appName: state => state.appName,
    //   userName: state => state.user.userName
    // })
    ...mapState({   // 将mapState返回的对象扁平化处理成对应的计算computed的属性，下面是直接返回回调函数
      userName: state => state.user.userName,  // 匿名函数写法，传入state对象，访问模块中的属性
      appVersion: state => state.appVersion,   // 这里的appVersion 是在 mutation.js方法中通过set方式设置到state中
      todoList: state => state.user.todo ? state.user.todo.todoList : [], // 调用动态注册的模块user子模块中的子模块todo中对象，但要对于动态模块注册的需要进行判空
    }),
    stateValue: {  // 计算属性不能直接赋值，它是个对象，默认是get 方法， 若要赋值实现set方式进行处理，或者通过发送事件，让vuex的 state的值发生改变
      get () {
        return this.$store.state.stateValue   // 方式一: 获取vuex 中state中值
      },
      set (val) {
        this.SET_STATE_VALUE(val)  // 直接提交mutation
      }
    },
    ...mapGetters([  // 也是通过张开运算符进行处理
      'appNameWithVersion',  // 直接在根模块中获取
      'firstLetter'  // 直接引用子模块user的firstLetter getter方法
    ]),
    appName () {
      return this.$store.state.appName
    },
    // appNameWithVersion () {
    //   return this.$store.getters.appNameWithVersion  // 获取vuex中定义的  getters.xxxx方法，当appName发生变化会导致appNameWithVersion 的getter方法发生变化，因此appNameWithVersion也会发生变化
    // },
    // userName () {
    //   return this.$store.state.user.userName   // 获取store子模块user中的 state.xxx值,其中xxx是模块名称如user
    // },
    inputValueLastLetter () {
      return this.inputValue.substr(-1, 1)
    }
  },
  methods: {  // vuex 会把 根级别的以及子模块中注册的action,mutation,state 都挂载到同一个全局中，所以才会用如下方式直接使用
    ...mapMutations([  // 引入相关mutation方法，直接调用即可
      'SET_USER_NAME',  // 直接引入user模块的mutaion方法，下面直接使用
      'SET_APP_NAME',
      'SET_STATE_VALUE'
    ]),
    ...mapActions([    // 引入action对象，直接调用即可
      'updateAppName'
    ]),
    handleInput (val) {
      this.inputValue = val
    },
    handleChangeAppName () {
      // this.$store.commit({    // 以对象方式发送，直接向mutation 发送信息执行对应方法TYPE定义以及对应参数
      //   type: 'SET_APP_NAME',
      //   appName: 'newAppName'
      // })
      // this.SET_APP_NAME({
      //   appName: 'newAppName'
      // })
      this.updateAppName()
      // this.$store.commit('SET_APP_VERSION')   // 直接向mutation 发送执行的方法名
    },
    changeUserName () {
      // this.$store.state.user.userName = 'haha' 错误的方法,在严格模式下会报错，不能直接对state进行赋值
      this.SET_USER_NAME('vue-cource')
      // this.$store.dispatch('updateAppName', '123')  // 向发送action发送事件，以及参数,该参数也可以是以{xxx:xxx}对象方式进行发送
    },
    registerModule () {  // 下面表示'user', 'todo动态执行user子模块中的todo子模块名注册到Vuex中，包括state, mutaion, action等，在上面的mapState辅助函数中进行调用，若是单独todo表示todo模块
      this.$store.registerModule(['user', 'todo'], {
        state: {
          todoList: [
            '学习mutations',
            '学习actions'
          ]
        }
      })
    },
    handleStateValueChange (val) {
      this.SET_STATE_VALUE(val)  // 上面通过mapMutations 引入所有方法，这里直接调用即可，无需再传入mutation方法名
    }
  }
}
</script>
