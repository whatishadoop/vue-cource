<template>
  <div class="a-menu">
    <slot></slot>
  </div>
</template>

<script>
export default {
  nmae: 'AMenu'
}
</script>

<style lang="less">
.a-menu{
  & *{
    list-style: none;  /*将mueu组件中的ul.li样式设置为none*/
  }
  ul{
    padding: 0;
    margin: 0;
  }
}
</style>
