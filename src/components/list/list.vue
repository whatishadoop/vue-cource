<template>
  <ul>
    <li @mousemove="handleMove" v-for="(item, index) in list" :key="`item_${index}`">
      <!-- <span v-if="!render">{{ item.number }}</span>
      <render-dom v-else :render-func="render" :number="item.number"></render-dom> -->  <!--使用render-dom组件并传入参数-->
      <!--下面是作用域插槽方式-->
      <slot name="aa" :number="item.number"></slot>
      <slot :number="item.number"></slot>
    </li>
  </ul>
</template>
<script>
import RenderDom from '_c/render-dom'  //  引入render函数组件
export default {
  name: 'List',
  components: {
    RenderDom   // 注册render函数组件
  },
  props: {
    list: {
      type: Array,
      default: () => []
    },
    render: {
      type: Function,
      default: () => {}
    }
  },
  methods: {
    handleMove (event) {
      event.preventDefault() // 给li标签设置阻止默认选中响应行为，因为使用了render进行渲染函数组件，当前标签的有些方法修饰符就不可以使用了，需要自己定义
    }
  }
}
</script>
