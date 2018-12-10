<template>
  <input @input="handleInput" :value="value"/> <!--绑定输入参数，v-on:input vue中输入事件-->
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
    handleInput (event) {
      const value = event.target.value
      this.$emit('input', value)  // 父组件只向自组件传递参数，逻辑修改值在子组件处理，处理完后向父传递结果数据
    }
  }
}
</script>
