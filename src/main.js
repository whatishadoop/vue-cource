import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import Bus from './lib/bus'
import CountTo from '_c/count-to'
if (process.env.NODE_ENV !== 'production') require('./mock')

Vue.config.productionTip = false
Vue.prototype.$bus = Bus

const handleClick = event => {
  console.log(event)
  event.stopPropagation()  // 点击事件冒泡
}

let list = [{name: 'lison'}, {name: 'lili'}]
const getLiEleArr = (h) => {  // 根据上面数组元数据，调用map映射函数,传入h render函数，创建多个虚拟节点以数组形式返回
  return list.map((item, index) => h('li', {
    on: {
      'click': handleClick
    },
    key: `list_item_${index}`  // 给每个li设置key
  }, item.name))  // item.name为字符串直接显示在li 标签之间
}

new Vue({
  router,
  store,
  // render: h => {
  //   return h(CountTo, {
  //     'class': [],  // 设置组件最外层标签的class样式
  //     attrs: {},    // 设置标签属性
  //     style: {},    // 设置标签样式
  //     props: {      // 传递属性值给子组件
  //       endVal: 100
  //     },
  //     // domProps: {  // 设置dom中的一些属性
  //     //   innerHTML: '123'
  //     // },
  //     on: {  // 监听子组件传递的事件
  //       'on-animation-end': (val) => {
  //         console.log('animation end!')
  //       }
  //     },
  //     nativeOn: {  // 父组件想在子组件上设置子组件的事件方法，需要加上native修饰符，这样就会直接调用子组件对应事件
  //       'click': () => {
  //         console.log('click!')
  //       }
  //     },
  //     directives: [],  // 指令数组
  //     scopedSlots: {},  // 作用域插槽
  //     slot: '',  // 插槽，将该组件作为插槽放入其它组件中
  //     key: '',  // key值保证唯一与v-for 中key是一样的
  //     ref: ''  // ref 表示获取组件或dom标签对象
  //   })
  // }
  // render: h => h('div', [   // 数组表示要在div标签下创建多个子元素，通过h()函数创建，若是内容则直接写字符串即可，该第二参数只能是数组或字符串，即使一个子元素也要包裹在数组中
  //   h('ul', {
  //     on: {
  //       'click': handleClick
  //     }
  //   }, getLiEleArr(h))
  // ])
  render: h => h(App)  // es6 匿名函数语法，只有一个形参时可以无需括号,直接写h, h是个方法h(App) 表示创建一个虚拟节点返回，该h函数 参数1表示要渲染的组件，标签，以及字符串
}).$mount('#app')
