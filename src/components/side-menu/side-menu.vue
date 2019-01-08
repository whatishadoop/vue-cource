<template>
  <div class="side-menu-wrapper">
    <slot></slot>
    <!--通过设置:active-name 为路由名称，从而在点击tab时动态切换关联的菜单项，使其高亮显示-->
    <!--通过设置:open-names="openNames"，展开对应的菜单项-->
    <Menu ref="menu" :active-name="$route.name" :open-names="openNames" v-show="!collapsed" width="auto" theme="dark" @on-select="handleSelect">
      <template v-for="item in list">
        <re-submenu
          v-if="item.children"
          :key="`menu_${item.name}`"
          :name="item.name"
          :parent="item"
        >
        </re-submenu>
        <menu-item v-else :key="`menu_${item.name}`" :name="item.name">
          <Icon :type="item.icon" />
          {{ item.meta.title }}
        </menu-item>
      </template>
    </Menu>
    <div v-show="collapsed" class="drop-wrapper">
      <template v-for="item in list">
        <re-dropdown @on-select="handleSelect" v-if="item.children" :show-title="false" icon-color="#fff" :key="`drop_${item.name}`" :parent="item"></re-dropdown>
        <Tooltip v-else transfer :content="item.title" placement="right" :key="`drop_${item.name}`">
          <span @click="handleClick(item.name)" class="drop-menu-span">
            <Icon :type="item.icon" color="#fff" :size="20"></Icon>
          </span>
        </Tooltip>
      </template>
    </div>
  </div>
</template>

<script>
import ReSubmenu from './re-submenu.vue'
import ReDropdown from './re-dropdown.vue'
import { mapState } from 'vuex'
import { getOpenArrByName } from '@/lib/util'
export default {
  name: 'SideMenu',
  components: {
    ReSubmenu,
    ReDropdown
  },
  props: {
    collapsed: {
      type: Boolean,
      default: false
    },
    list: {
      type: Array,
      default: () => []
    }
  },
  computed: {
    ...mapState({
      routers: state => state.router.routers  // 根据路由列表获取生成菜单
    }),
    openNames () {  //设置需要展开的菜单项，返回数组
      // 传入此时路由名称，以及所有路由名称
      return getOpenArrByName(this.$route.name, this.routers)
    }
  },
  watch: {
    openNames () {
      this.$nextTick(() => {  // 在视图渲染完后再调用下面逻辑
        this.$refs.menu.updateOpened()  // 调用菜单方法手动刷新
      })
    }
  },
  methods: {
    handleSelect (name) {
      this.$router.push({   // 点击菜单右侧tab下内容显示对应的页面,并会触发app.vue中路由监听事件，将点击的菜单项放入tablist中
        name
      })
    },
    handleClick (name) {
      console.log(name)
    }
  }
}
</script>

<style lang="less">
.side-menu-wrapper{
  width: 100%;
  .ivu-tooltip, .drop-menu-span{
    display: block;
    width: 100%;
    text-align: center;
    padding: 5px 0;
  }
  .drop-wrapper > .ivu-dropdown{
    display: block;
    padding: 5px;
    margin: 0 auto;
  }
}
</style>
