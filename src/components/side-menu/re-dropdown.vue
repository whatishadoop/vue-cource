<template>
  <!--right-start显示在图标的右侧-->
  <Dropdown @on-click="handleClick" placement="right-start">
    <span class="drop-menu-span" :style="titleStyle">
      <Icon :type="parent.icon" :color="iconColor" :size="20"></Icon>
      <span v-if="showTitle">{{ parent.title }}</span>
    </span>
    <DropdownMenu slot="list">
      <template v-for="item in parent.children">
        <!--若有子下拉则自己调用自己从而实现递归调用-->
        <re-dropdown v-if="item.children" :key="`drop_${item.name}`" :parent="item"></re-dropdown>
        <!--若没有则直接调用组件下拉-->
        <DropdownItem v-else :key="`drop_${item.name}`" :name="item.name">
          <Icon :type="item.icon" color="#515a6e" :size="20"></Icon>
          {{ item.title }}
        </DropdownItem>
      </template>
    </DropdownMenu>
  </Dropdown>
</template>

<script>
export default {
  name: 'ReDropdown',
  props: {
    parent: {
      type: Object,
      default: () => ({})
    },
    iconColor: {
      type: String,
      default: '#515a6e'
    },
    showTitle: {
      type: Boolean,
      default: true
    }
  },
  computed: {
    titleStyle () {
      return {
        textAlign: this.showTitle ? 'left' : 'center',
        paddingLeft: this.showTitle ? '16px' : ''
      }
    }
  },
  methods: {
    handleClick (name) {
      // 解决事件触发多次问题，并向父传递name值
      if (!this.showTitle) this.$emit('on-select', name)
    }
  }
}
</script>

<style>

</style>
