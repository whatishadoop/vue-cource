<template>
  <div class="layout-wrapper">
    <Layout class="layout-outer">
      <Sider :width="200" collapsible hide-trigger reverse-arrow v-model="collapsed" class="sider-outer">
        <side-menu :collapsed="collapsed" :list="routers"></side-menu>
      </Sider>
      <Layout>
        <Header class="header-wrapper">
          <Icon :class="triggerClasses" @click.native="handleCollapsed" type="md-menu" :size="32"/>
        </Header>
        <Content class="content-con">
          <div>
            <!--:value="getTabNameByRoute($route)"根据当前路由名字选定对应的tab项，随路由变化而切换选择项-->
            <Tabs type="card" @on-click="handleClickTab" :value="getTabNameByRoute($route)">
              <!--:label单个tab中文名称，name为英文名称-->
              <TabPane :label="labelRender(item)" :name="getTabNameByRoute(item)" v-for="(item, index) in tabList" :key="`tabNav${index}`"></TabPane>
            </Tabs>
          </div>
          <div class="view-box">
            <Card shadow class="page-card">
              <router-view/>
            </Card>
          </div>
        </Content>
      </Layout>
    </Layout>
  </div>
</template>

<script>
import SideMenu from '_c/side-menu'
import { mapState, mapMutations, mapActions } from 'vuex'
import { getTabNameByRoute, getRouteById } from '@/lib/util'
export default {
  components: {
    SideMenu
  },
  data () {
    return {
      collapsed: false,
      getTabNameByRoute
    }
  },
  computed: {
    triggerClasses () {
      return [
        'trigger-icon',
        this.collapsed ? 'rotate' : ''
      ]
    },
    ...mapState({
      tabList: state => state.tabNav.tabList,
      routers: state => state.router.routers.filter(item => {
        return item.path !== '*' && item.name !== 'login'
      })
    })
  },
  methods: {
    ...mapActions([
      'handleRemove'
    ]),
    handleCollapsed () {
      this.collapsed = !this.collapsed
    },
    handleClickTab (id) {  // 点击tab时其内容需要根据其id,得出其路由对象进行跳转，返回对象里面包括路由和参数
      let route = getRouteById(id)
      this.$router.push(route)
    },
    handleTabRemove (id, event) {
      event.stopPropagation()
      this.handleRemove({
        id,                   // 传入id
        $route: this.$route  // 传入当前router对象,用于删除后跳转到其它tab页显示
      }).then(nextRoute => {
        this.$router.push(nextRoute)
      })
    },
    labelRender (item) {
      return h => {
        return (
          <div>
            <span>{item.meta.title}</span>
            <icon nativeOn-click={this.handleTabRemove.bind(this, getTabNameByRoute(item))} type="md-close-circle" style="line-height:10px;"></icon>
          </div>
        )
      }
    }
  }
}
</script>

<style lang="less">
.layout-wrapper, .layout-outer{
  height: 100%;
  .header-wrapper{
    background: #fff;
    box-shadow: 0 1px 1px 1px rgba(0, 0, 0, .1);
    padding: 0 23px;
    .trigger-icon{
      cursor: pointer;
      transition: transform .3s ease;
      &.rotate{
        transform: rotateZ(-90deg);
        transition: transform .3s ease;
      }
    }
  }
  .sider-outer{
    height: 100%;
    overflow: hidden;
    .ivu-layout-sider-children{
      margin-right: -20px;  /*用于隐藏滚动条，但依然可以滑动*/
      overflow-y: scroll;
      overflow-x: hidden;
    }
  }
  .content-con{
    padding: 0;
    .ivu-tabs-bar{
      margin-bottom: 0;
    }
    .view-box{
      padding: 0;
    }
  }
  .page-card{
    min-height: ~"calc(100vh - 84px)";
  }
}
</style>
