<template>
  <div>
    <p>AShow: {{ content }}</p>
  </div>
</template>
<script>
export default {
  props: {
    content: {
      type: [String, Number],  // 参数可以是多个类型
      default: ''
    }
  }
}
</script>
