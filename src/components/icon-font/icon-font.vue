<template>
  <i :class="classes" :style="styles"></i>
</template>

<script>
export default {
  props: {
    icon: {
      type: String,
      default: ''
    },
    size: {
      type: Number,
      default: 12
    },
    color: {
      type: String,
      default: '#515a6e'
    }
  },
  computed: {
    classes () {
      return [    // 多个class样式采用数组返回
        'iconfont',
        `icon-${this.icon}`
      ]
    },
    styles () {  // 通过改变style样式，来改变icon样式,以对象形式设置style
      return {
        color: this.color,
        fontSize: `${this.size}px`
      }
    }
  }
}
</script>

<style>

</style>
