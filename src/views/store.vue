<template>
  <div>
    <a-input @input="handleInput"/>
    <p>普通属性:{{ inputValue }} -> lastLetter is 计算属性:{{ inputValueLastLetter }}</p>
    <!-- <a-show :content="inputValue"/> -->
    <p>mapState方式appName: {{ appName }}, mapGetters方式appNameWithVersion : {{ appNameWithVersion }} </p>
    <p>userName : {{ userName }}, firstLetter is : {{ firstLetter }} 测试</p>
    <button @click="handleChangeAppName">修改appName,测试commit到mutation</button>
    <p>{{ appVersion }}</p>
    <button @click="changeUserName">修改用户名，测试dispatch到action</button>
    <button @click="registerModule">以下内容测试动态注册模块</button>
    <p v-for="(li, index) in todoList" :key="index">{{ li }}</p>
  </div>
</template>
<script>
import AInput from '_c/AInput.vue'
import AShow from '_c/AShow.vue'
import { mapState, mapGetters, mapMutations, mapActions } from 'vuex'
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
    ...mapState({
      userName: state => state.user.userName,
      appVersion: state => state.appVersion,
      todoList: state => state.user.todo ? state.user.todo.todoList : []  // 动态注册模块有时没注册或者注册后延时导致立马不能取到，设置个默认值[]
    }),
    ...mapGetters([
      'appNameWithVersion',
      'firstLetter'
    ]),
    appName () {
      return this.$store.state.appName
    },
    // appNameWithVersion () {
    //   return this.$store.getters.appNameWithVersion
    // },
    // userName () {
    //   return this.$store.state.user.userName
    // },
    inputValueLastLetter () {
      return this.inputValue.substr(-1, 1)
    }
  },
  methods: {
    ...mapMutations([
      'SET_USER_NAME',
      'SET_APP_NAME'
    ]),
    ...mapActions([
      'updateAppName'
    ]),
    handleInput (val) {
      this.inputValue = val
    },
    handleChangeAppName () {
      // this.$store.commit({
      //   type: 'SET_APP_NAME',
      //   appName: 'newAppName'
      // })
      // this.SET_APP_NAME({
      //   appName: 'newAppName'
      // })
      this.updateAppName()
      // this.$store.commit('SET_APP_VERSION')
    },
    changeUserName () {
      this.SET_USER_NAME('vue-cource')
      // this.$store.dispatch('updateAppName', '123')
    },
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
</script>
