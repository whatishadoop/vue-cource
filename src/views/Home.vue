<template>
  <div class="home">
    <!--下面注释内容是使用编程式导航进行事件处理的，与roouter.js相关-->
    <!-- <b>{{ food }}</b>
    <button @click="handleClick('back')">返回上一页</button>
    <button @click="handleClick('push')">跳转到parent</button>
    <button @click="handleClick('replace')">替换到parent</button>
    <img :src="url">
    <button @click="handleLogout">退出登录</button> -->
    <!--请求数据-->
    <!--
    <button @click="getInfo" :style="{ background: bgColor }">请求数据</button>
    -->
    <Row>
      <i-col></i-col>
    </Row>
    <Row :gutter="10">
      <i-col span="12">{{ rules }}</i-col>
      <i-col span="12"></i-col>
    </Row>
    <Row :gutter="10" class="blue">
      <i-col :md="6" :sm="12" :xs="24"></i-col>
      <i-col :md="6" :sm="12" :xs="24"></i-col>
      <i-col :md="6" :sm="12" :xs="24"></i-col>
      <i-col :md="6" :sm="12" :xs="24"></i-col>
    </Row>
    <Button v-if="rules.edit_button">编辑</Button>
    <Button v-if="rules.publish_button">发布</Button>
  </div>
</template>

<script>
// @ is an alias to /src
import HelloWorld from '@/components/HelloWorld.vue'
import { getUserInfo } from '@/api/user'
import { mapState, mapActions } from 'vuex'

export default {
  name: 'home',
  components: {
    HelloWorld
  },
  data () {
    return {
      url: '',
      bgColor: ''
    }
  },
  props: {
    food: {
      type: String,
      default: 'apple'
    }
  },
  computed: {
    ...mapState({
      rules: state => state.user.rules
    })
  },
  // 组件内守卫三个钩子函数beforeRouteEnter，beforeRouteUpdate，beforeRouteLeave，form上个路由，to下个路由对象
  beforeRouteEnter (to, from, next) { // 此时跳转的新页面还没有被渲染，里面是不能通过this获取当前组件实例
    next(vm => {  // 若一定要获取组件this实例，通过这种方式，这个next回调函数在最后执行
      // console.log(vm)
    })
  },
  // beforeRouteUpdate (to, from, next) {
  //   // 在当前路由改变，但是该组件被复用时调用，说白了在当前页实现参数传递
  //   // 举例来说，对于一个带有动态参数的路径 /foo/:id，在 /foo/1 和 /foo/2 之间跳转的时候，
  //   // 由于会渲染同样的 Foo 组件，因此组件实例会被复用。而这个钩子就会在这个情况下被调用。
  //   // 可以访问组件实例 `this`，因为被渲染了
  // },
  beforeRouteLeave (to, from, next) {   // 该方法在离开当前页面时，触发，例如跳转前确认信息保存
    // const leave = confirm('您确定要离开吗？')
    // if (leave) next()
    // else next(false)   // false表示不进行跳转，在该函数中是可以使用this的，因为被渲染了
    next()
  },
  methods: {
    ...mapActions([
      'logout'
    ]),
    handleClick (type) {
      if (type === 'back') this.$router.back()  // 根据历史记录回退到上一页
      else if (type === 'push') {  // 跳转到指定页，并把当前页加入历史记录中
        this.$router.push({    // 通过路由命名方式跳转，并传入参数，也可以直接写路径方式
          name: `argu`,
          params: {   // 传递url argu/lison 或者通过 const name = 'list'结合es6模板设置path path=`argu/${name}`
            name: 'lison'
          }
          //query: {   // 跳转浏览器地址栏问号？后带上该参数
            //name: 'parent'
          //}
        })
      } else if (type === 'replace') {  // 替代当前页B，A->B->C ,此时由B跳转到C,则回退时直接到A,而不是B
        this.$router.replace({
          name: 'parent'
        })
      }
    },
    getInfo () {
      getUserInfo({ userId: 21 }).then(res => {
        console.log('res: ', res.data)
        this.url = res.data.img
        this.bgColor = res.data.color
      })
    },
    handleLogout () {
      this.logout()
      this.$router.push({
        name: 'login'
      })
    }
  }
}
</script>
<style lang="less">
.home{
  .ivu-col{
    height: 50px;
    margin-top: 10px;
    background: pink;
    background-clip: content-box;
  }
  .blue{
    .ivu-col{
      background: blue;
      background-clip: content-box;
    }
  }
}
</style>
