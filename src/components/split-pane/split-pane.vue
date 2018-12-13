<template>
  <div class="split-pane-wrapper" ref="outer">
    <!--若样式属性动态改变，需要用如下:style 进行设置-->
    <div class="pane pane-left" :style="{ width: leftOffsetPercent, paddingRight: `${this.triggerWidth / 2}px` }">
      <!--使用具名插槽向子组件中填充内容-->
      <slot name="left"></slot>
    </div>
    <!--给中间移动长条，设置鼠标按下时绑定mousedown事件-->
    <div class="pane-trigger-con" @mousedown="handleMousedown" :style="{ left: triggerLeft, width: `${triggerWidth}px` }"></div>
    <div class="pane pane-right" :style="{ left: leftOffsetPercent, paddingLeft: `${this.triggerWidth / 2}px` }">
      <slot name="right"></slot>
    </div>
  </div>
</template>
<script>
export default {
  name: 'SplitPane',
  props: {
    value: {   // 设置长条初始化为50%
      type: Number,
      default: 0.5
    },
    triggerWidth: {  // 条上触发点距离条左侧距离
      type: Number,
      default: 8
    },
    min: {
      type: Number,
      default: 0.1
    },
    max: {
      type: Number,
      default: 0.9
    }
  },
  data () {
    return {
      // leftOffset: 0.3,
      canMove: false,
      initOffset: 0   // 初始偏移值
    }
  },
  computed: {  // 通过改变该值，来设置左右div两边平移
    leftOffsetPercent () {
      return `${this.value * 100}%`
    },
    triggerLeft () {
      // calc是css3语法，可以支持100% - 像素值
      return `calc(${this.value * 100}% - ${this.triggerWidth / 2}px)`
    }
  },
  methods: {
    handleClick () {
      this.leftOffset -= 0.02
    },
    handleMousedown (event) {
      // 在长条上点击按下鼠标，给整个浏览器页面绑定鼠标移动，以及鼠标抬起时取消移动
      document.addEventListener('mousemove', this.handleMousemove)
      document.addEventListener('mouseup', this.handleMouseup)
      // 下面是trigger长条点击点距离浏览器左边距离，减去长条容器相对浏览器左边距离，相减就是长条点击中心点距离长条左侧div距离
      this.initOffset = event.pageX - event.srcElement.getBoundingClientRect().left
      this.canMove = true  // 初始时默认flase, 鼠标按下设置为true表示可以西面的handleMousemove移动
    },
    handleMousemove (event) {
      if (!this.canMove) return  //
      // this.$refs.outer.getBoundingClientRect 获取父容器相对浏览器的位置信息
      const outerRect = this.$refs.outer.getBoundingClientRect()
      let offsetPercent = (event.pageX - this.initOffset + this.triggerWidth / 2 - outerRect.left) / outerRect.width
      // 移动时设置访问，最大或最小值时不能移动
      if (offsetPercent < this.min) offsetPercent = this.min
      if (offsetPercent > this.max) offsetPercent = this.max
      // this.$emit('input', offsetPercent)  // 方式一: 通过事件方式，向父组件传递偏移值
      this.$emit('update:value', offsetPercent)  // 方式二: 直接向父组件发送需要同步修改的值，父类通过sync方式<split-pane :value.sync="offset"> 同步更新
    },
    handleMouseup () {
      this.canMove = false
    }
  }
}
</script>
<style lang="less" type="text/less" rel="stylesheet/stylus" scoped>
.split-pane-wrapper{
  height: 100%;
  width: 100%;
  position: relative;
  .pane{
    position: absolute;
    top: 0;
    height: 100%;
    &-left{
      // width: 30%;
      background: palevioletred;
    }
    &-right{
      right: 0;
      bottom: 0;
      background: paleturquoise;
    }
    &-trigger-con{
      height: 100%;
      background: red;
      position: absolute;
      top: 0;
      z-index: 10;
      user-select: none;   /* css3特性 消除长按页面上某些文字或者图片，就出现系统的一些黑色禁止弹框*/
      cursor: col-resize;  /* 设置鼠标选中左右拖动样式 */
    }
  }
}
</style>
