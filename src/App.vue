<template>
  <div id="app">
    <div id="nav">
      <router-link :to="{ name: 'home' }">Home</router-link> |
      <router-link :to="{ name: 'about' }">About</router-link>
    </div>
    <!--一组路由视图，设置动画效果，必须写key值。然后在css中设置.router-enter/leave-to/active样式-->
    <transition-group :name="routerTransition">
      <router-view key="default"/>
      <router-view key="email" name="email"/>
      <router-view key="tel" name="tel"/>
    </transition-group>
  </div>
</template>

<script>
export default {
  data () {
    return {
      routerTransition: ''
    }
  },
  watch: {
    '$route' (to) {  // to表示当前页面,表示如果在url传入参数transitionName存在如值为"router",则将其赋值给this.transitionName
      to.query && to.query.transitionName && (this.routerTransition = to.query.transitionName)
    }
  }
}
</script>

<style lang="less">
.router-enter{   // 刚开始进入状态，透明度为0表示隐藏
  opacity: 0;
}
.router-enter-active{  // 进入过程中过度状态
  transition: opacity 1s ease;
}
.router-enter-to{  // 进入以后整个显示
  opacity: 1;
}
.router-leave{  // 离开时的状态显示
  opacity: 1;
}
.router-leave-active{ // 离开过程中的过度状态
  transition: opacity 1s ease;
}
.router-leave-to{  // 完全离开状态，隐藏
  opacity: 0;
}
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
#nav {
  padding: 30px;
  a {
    font-weight: bold;
    color: #2c3e50;
    &.router-link-exact-active {
      color: #42b983;
    }
  }
}
</style>
