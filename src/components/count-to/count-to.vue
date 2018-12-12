<template>
  <div>
    <!--slot具名插槽-->
    <slot name="left"></slot><span ref="number" :class="countClass" :id="eleId"></span><slot name="right"></slot>
  </div>
</template>
<script>
import CountUp from 'countup'
export default {
  name: 'CountTo',
  computed: {
    eleId () {  // 设置计算属性 保证上面的span属性值唯一，因为会引用多次该组件
      return `count_up_${this._uid}`  // this._uid 是 vue 自带的每个实例有个唯一id
    },
    countClass () {  // 传入样式类名
      return [
        'count-to-number',
        this.className
      ]
    }
  },
  data () {
    return {
      counter: {}  // 保存counter对象实例，便于后面使用
    }
  },
  props: {
    /**
     * @description 起始值
     */
    startVal: {
      type: Number,
      default: 0
    },
    /**
     * @description 最终值
     */
    endVal: {
      type: Number,
      required: true
    },
    /**
     * @description 小数点后保留几位小数
     */
    decimals: {
      type: Number,
      default: 0
    },
    /**
     * @description 动画延迟开始时间
     */
    delay: {
      type: Number,
      default: 0
    },
    /**
     * @description 渐变时长
     */
    duration: {
      type: Number,
      default: 1
    },
    /**
     * @description 是否使用变速效果
     */
    useEasing: {
      type: Boolean,
      default: false
    },
    /**
     * @description 是否使用变速效果
     */
    useGrouping: {
      type: Boolean,
      default: true
    },
    /**
     * @description 分组符号
     */
    separator: {
      type: String,
      default: ','
    },
    /**
     * @description 整数和小数分割符号
     */
    decimal: {
      type: String,
      default: '.'
    },
    // obj: {
    //   type: Object,    // 对象缺省值定义
    //   default: () => {
    //       return {}  // 返回一个空对象定义，放在回调函数中
    //     }
    // },
    // arr: {
    //   type: Array,  // 空数组缺省值定义
    //   default: []
    //   }
    // },
    className: {
      type: String,
      default: ''
    }
  },
  methods: {
    getCount () {
      return this.$refs.number.innerText  // 在原始html标签中设置ref="number"，获取当前原生标签dom对象,在组件上使用用于获取组件对象
    },
    emitEndEvent () {
      setTimeout(() => {
        this.$nextTick(() => {
          this.$emit('on-animation-end', Number(this.getCount()))  // 向父组件发送事件
        })
      }, this.duration * 1000 + 5)
    }
  },
  watch: {  // 监听endVal属性，若发生变化调用下面方法，进行更新操作
    endVal (newVal, oldVal) {
      this.counter.update(newVal)
      this.emitEndEvent()  // 调用自己的封装方法
    }
  },
  mounted () {
    this.$nextTick(() => {  // 保证渲染完后再执行
      // 保存counter对象实例，便于后面使用
      this.counter = new CountUp(this.eleId, this.startVal, this.endVal, this.decimals, this.duration, {
        useEasing: this.useEasing,
        useGrouping: this.useGrouping,
        separator: this.separator,
        decimal: this.decimal
      })
      setTimeout(() => {
        this.counter.start()
        this.emitEndEvent()
      }, this.delay)
    })
  }
}
</script>
<style lang="less">
@import './count-to.less';   /*s在style里面：@import "../index.css"，在script里面：import "../index.css"*/
</style>
