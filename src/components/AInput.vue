<template>
  <input @input="handleInput" :value="value"/>
</template>
<script>
export default {
  name: 'AInput',
  props: {
    value: {
      type: [String, Number],
      default: ''
    }
  },
  methods: {
    handleInput (event) {   // 输入文字后，该事件被触发，向父发送事件，父组件接收后改变inputValue值，该值会影响<a-show 组件绑定的数值inputValue ，从而改变a-show显示值
      const value = event.target.value
      this.$emit('input', value)
    }
  }
}
</script>
