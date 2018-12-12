import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import Bus from './lib/bus'
if (process.env.NODE_ENV !== 'production') require('./mock')  // 不是生产环境才引入mock/index.js文件，作为全局使用，上线后要去除这段代码，这样就不会拦截客户端请求了

Vue.config.productionTip = false
Vue.prototype.$bus = Bus

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
