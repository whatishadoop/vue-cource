import Home from '@/views/Home.vue'
import Layout from '@/views/layout.vue'
export const routerMap = [
  {
    path: '/home',          // 普通路径方式
    name: 'home',           // 命名路由方式
    alias: '/home_page',    // 路由别名方式
    component: Layout,
    meta: {
      title: '首页'
    },
    children: [
      {
        path: 'home_index',
        name: 'home_index',
        meta: {
          title: '首页'
        },
        component: Home
      }
    ]
  },
  {
    path: '/about',
    name: 'about',    // 通过路由别名
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    // 按需加载路由组件 生成 about.[hash].js ，下面是匿名函数
    component: () => import(/* webpackChunkName: "about" */ '@/views/About.vue'),
    props: {
      food: 'banana'
    },
    meta: {
      title: '关于'
    }
  },
  {
    path: '/count-to',
    name: 'count_to',
    meta: {
      title: 'count_to'
    },
    component: () => import('@/views/count-to.vue')
  },
  {
    path: '/menu_page',
    name: 'menu_page',
    meta: {
      title: 'menu_page'
    },
    component: () => import('@/views/menu-page.vue')
  },
  {
    path: '/upload',
    name: 'upload',
    meta: {
      title: 'upload'
    },
    component: () => import('@/views/upload.vue')
  },
  {
    path: '/form',
    name: 'form',
    meta: {
      title: 'form'
    },
    component: () => import('@/views/form.vue')
  },
  {
    path: '/optimize',
    name: 'optimize',
    meta: {
      title: 'optimize'
    },
    component: () => import('@/views/optimize.vue')
  },
  {
    path: '/component',
    name: 'component',
    component: Layout,
    meta: {
      title: '表格'
    },
    children: [
      {
        path: 'table',
        name: 'table_page',
        meta: {
          title: '表格'
        },
        component: () => import('@/views/table.vue')
      },
      {
        path: 'folder_tree',
        name: 'folder_tree',
        meta: {
          title: '文件夹'
        },
        component: () => import('@/views/folder-tree/folder-tree.vue')
      },
      {
        path: 'params/:id',  // 动态传参数路由 ，一般在vue单文件中通过 {{$router.parma.id}}获取参数
        name: 'params',
        meta: {
          title: '参数'
        },
        component: () => import('@/views/argu.vue'),
        props: true
      }
    ]
  },
  {
    path: '/render_page',
    name: 'render_page',
    meta: {
      title: 'render_page'
    },
    component: () => import('@/views/render-page.vue')
  },
  {
    path: '/split-pane',
    name: 'split_pane',
    meta: {
      title: 'split_pane'
    },
    component: () => import('@/views/split-pane.vue')
  },
  {
    path: '/parent',
    name: 'parent',
    meta: {
      title: 'parent'
    },
    component: () => import('@/views/parent.vue'),
    children: [
      {
        path: 'child',
        name: 'child',
        meta: {
          title: 'child'
        },
        component: () => import('@/views/child.vue')
      }
    ]
  },
  {
    path: '/named_view',  // 一个路径下，加载下面三个组件替换对应页面中的router-view
    name: 'named_view',
    meta: {
      title: 'named_view'
    },
    components: {    // 命名路由设置components ，前缀 default email tel分别在<router-view key="email" name="email"/> 标签中定义
      default: () => import('@/views/child.vue'),  // 缺省
      email: () => import('@/views/email.vue'),
      tel: () => import('@/views/tel.vue')
    }
  },
  {
    path: '/main',   // 访问main时重定向到 / 路径
    name: 'main',
    meta: {
      title: 'main'
    },
    redirect: to => '/' // 可以设置{ return '跳转路径' } ,打印传入的to对象参数，通过参数跳转不同路径，
  },
  {
    path: '/store',
    name: 'store',
    meta: {
      title: 'sotre'
    },
    component: () => import('@/views/store.vue')
  }
]

export const routes = [
  {
    path: '/login',
    name: 'login',
    meta: {
      title: '登录'
    },
    component: () => import('@/views/login.vue')
  },
  {
    path: '/icon_page',
    name: 'icon_page',
    meta: {
      title: '图标'
    },
    component: () => import('@/views/icon_page.vue')
  },
  {
    path: '*',
    component: () => import('@/views/error_404.vue')
  }
]
