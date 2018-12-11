import Home from '@/views/Home.vue'
export default [
  {
    path: '/',
    alias:'/home_page',  // 为路由取别名，即访问"/home_page"和访问"/"和通过name："home",访问的效果是一样的
    name: 'home', // 普通写法
    component: Home,
    props: route => ({
      food: route.query.food
    }),
    beforeEnter: (to, from, next) => {  // 该组件独有的守卫
      // if (from.name === 'about') alert('这是从about来的')
      // else alert('这不是从about来的')
      next()  // 一定要在最后执行next(),否则不会跳转
    }
  },
  {
    path: '/login',
    name: 'login',
    component: () => import('@/views/login.vue') // 这样写，有懒加载的作用，即该页面显示时才会加载。
  },
  {
    path: '/about',
    name: 'about',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '@/views/About.vue'),
    props: {
      food: 'banana'
    },
    meta: {
      title: '关于'
    }
  },
  {  // 动态路由加载传参：动态加载路由，name是参数，{{$route.params.name}}调用参数name的值
    path: '/argu/:name',  // 动态路由传参：高级写法，动态加载路由，name是参数
    name: 'argu',
    component: () => import('@/views/argu.vue'),
    props: true // 表示允许组件props:{}中接受name参数值，然后可以直接渲染在页面{{name}}
  },
  {
    path: '/parent',  // 嵌套路由,注意只有父级需要'/'
    name: 'parent',
    component: () => import('@/views/parent.vue'),
    children: [
      {
        path: 'child',
        component: () => import('@/views/child.vue')
      }
    ]
  },
  {
    path: '/named_view',  // 命名视图：同时存在多个路由跳转时<router-view/> <router-view name="email"/> <router-view name="tel"/>
    components: {
      default: () => import('@/views/child.vue'),  // 如果<router-view/> 没有name属性值，默认对应该路由
      email: () => import('@/views/email.vue'),   // <router-view name="email"/> 对应该路由
      tel: () => import('@/views/tel.vue')   // <router-view tel="tel"/> 对应该路由
    }
  },
  { // 重定向：重新定义跳转的路径，如本来是访问 '/main',重新绑定跳转到"/"
    path: '/main',  // 重定向路由
    redirect:"/",   //3种重定向的方法
//		redirect:{
//		   name:"home1"
//		},
//		redirect:to =>{    //如根据参数确定跳转到哪个页面
////		console.log(to)
////		return "/"
//			return {
//				name:"home1"
//		    }
//		}
  },
  {
    path: '*',
    component: () => import('@/views/error_404.vue')
  }
]
