<template>
  <div class="tel">
    <p>{{ message }}</p>
  </div>
</template>
<script>
export default {
  data () {
    return {
      message: ''
    }
  },
  mounted () {
    this.$bus.$on('on-click', mes => {  // 通过bus方式实现与自组件email之间的通信
      this.message = mes
    })
  }
}
</script>
<style>
.tel{
  border: 1px solid red;
}
</style>
