<template>
  <div>
    <list :list="list" :style="{color: 'red'}">
      <!--使用作用域插槽方式  定义 count变量名，它代表封装count-to组件中对应slot中所有属性如:number="item.number"封装成的对象，而此处的count.number就是获取该对应中的number属性值-->
      <count-to slot="aa" slot-scope="count" :end-val="count.number"></count-to>
    </list>
  </div>
</template>
<script>
import List from '_c/list'
import CountTo from '_c/count-to'
export default {
  data () {
    return {
      list: [
        { number: 100 },
        { number: 45 }
      ]
    }
  },
  components: {
    List,
    CountTo  // 若在template中使用需要进行注册使用
  },
  methods: {
    renderFunc (h, number) {   // 定义需要传递的render单个渲染函数给子组件使用，下面是jxs写法，另外也可以使用render写法 ，h 参数必须写
      return (
        // jsx中所有变量都是用括号包裹起来的，方法前面要加 on- ,nativeOn-, 使用时根据引入名CountTo作为标签名，不能写成count-to形式
        // nativeOn-click 表示将如下父中定义的handleClick 事件添加到CountTo 模板的最外层上作为子组件原生事件
        <CountTo nativeOn-click={this.handleClick} on-on-animation-end={this.handleEnd} endVal={number} style={{color: 'pink'}}></CountTo>
      )
    },
    handleClick (event) {  //
      // console.log(event)
    },
    handleEnd () {  // 监听子组件发送的on-animation-end事件进行处理
      // console.log('end!')
    }
  }
}
</script>
