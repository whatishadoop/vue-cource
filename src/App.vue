<template>
  <div id="app">
    <!-- <div id="nav">
      <router-link :to="{ name: 'home' }">Home</router-link> |  // 通过路由别名，以对象方式跳转等价于路径方式
      <router-link :to="{ name: 'about' }">About</router-link>
    </div> -->
    <!--多个组件同时要动画需要设置transition-group , 里面设置name结合css实现自定义动画效果，key要自定义，保证唯一即可-->
    <!-- <transition-group :name="routerTransition"> -->
    <router-view key="default"/>
    <router-view key="email" name="email"/>     <!--设置name命名视图,用于显示不同内容，需要结合路由定义使用-->
    <router-view key="tel" name="tel"/>
    <!-- </transition-group> -->
  </div>
</template>

<script>
import { mapMutations } from 'vuex'
export default {
  data () {
    return {
      routerTransition: ''
    }
  },
  watch: {  // 通过watch动态监控路由参数，获取参数值
    '$route' (newRoute) {
      this.UPDATE_ROUTER(newRoute)
    }
  },
  methods: {
    ...mapMutations([
      'UPDATE_ROUTER'
    ])
  }
}
</script>

<style lang="less">
html,body{
  height: 100%;
}
body{
  margin: 0;
}
.router-enter{   // 页面进入时透明度0不显示
  opacity: 0;
}
.router-enter-active{  // 页面进入过程中，过度效果
  transition: opacity 1s ease;
}
.router-enter-to{  // 页面进入后，完全显示效果
  opacity: 1;
}
.router-leave{  // 离开时透明度为1显示状态
  opacity: 1;
}
.router-leave-active{
  transition: opacity 1s ease;
}
.router-leave-to{ // 离开后透明度为0隐藏状态
  opacity: 0;
}
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  // text-align: center;
  color: #2c3e50;
  height: 100%;
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
@font-face {font-family: 'iconfont';
    src: url('./assets/font/iconfont.eot');
    src: url('./assets/font/iconfont.eot?#iefix') format('embedded-opentype'),
    url('./assets/font/iconfont.woff') format('woff'),
    url('./assets/font/iconfont.ttf') format('truetype'),
    url('./assets/font/iconfont.svg#iconfont') format('svg');
}
.iconfont{
  font-family:"iconfont" !important;
  font-size:16px;
  font-style:normal;
  -webkit-font-smoothing: antialiased;
  -webkit-text-stroke-width: 0.2px;
  -moz-osx-font-smoothing: grayscale;
}
.iconfont-svg {
  width: 1em; height: 1em;
  vertical-align: -0.15em;
  fill: currentColor;
  overflow: hidden;
}
</style>
