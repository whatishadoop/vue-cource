1. js操作路由(即编程式的导航)进行页面跳转： 
    a. 返回/前进一页：返回：this.$router.go(-1)、this.$router.back()。前进：this.$router.go(1)。
    b. 跳转到其他页：
        this.$router.push("/parent")。
        this.$router.push({name:"parent",query:{name:"ace"})，即浏览历史纪录保存着,query是参数。
        this.$router.push({path:`/argu/${name}`})    ,es6带参数跳转，针对 path: '/argu/:name',该路由。
        this.$router.push({path:"/parent",params:{name:"ace"}) , 带参数跳转。
    c. 用其他页替换本页：this.$router.replace("/about")或this.$router.replace({name:"parent"})，即浏览历史纪录没有了。

2. 路由传值：
   a. 基于动态路由的页面（path: '/argu/:name'）传值
     {
         path: '/argu/:name',
         props:true,             //表示允许Argu.vue组件中props:{}中接受name参数值，然后可以直接渲染在页面{{name}}
         component: () => import( './views/argu.vue' )  
     },

   b.基于普通页面传参,对象模式传参
     {
         path: '/about',
         props:{
             food:"香蕉"
         },                      //表示允许about.vue组件中props:{}中接受food参数值，然后可以直接渲染在页面{{food}}
         component: () => import( './views/argu.vue')  
     },

     c.基于普通页面传参,函数模式传参
    {
        path: '/parent',
        props: route=>{
            return {
                food:route.query.food
            }
        },                      //表示允许parent.vue组件中props:{}中接受food参数值，然后可以直接渲染在页面{{food}}
        component: () => import( './views/argu.vue')  
    }

3. 导航守卫：如根据是否登录或登录者的权限跳转不同的页面。
 a. 全局守卫：即在全局设置一个守卫。在router/index.js中配置全局守卫

 b. 组件独享守卫：即该组件独有的守卫。   如 在router/router.js中path:"/"中配置组件守卫
{
    path: '/',
    component: Home,    //普通写法
    beforEnter:(to,from,next)=>{   //该组件独有的守卫
        if(from.name="login"){
            alert("这是从登陆页面跳转过来的")
        }else{
            alert("这不是从登陆页面跳转过来的")
        }
     next()   //一定要在最后执行next()，否则不会跳转
},

 c.在组件里面的3种守卫，如在login.vue组件里面与生命周期同级

 #a.beforeRouteEnter:即将跳转到当前页面，但是页面还没有渲染，所有里面的this不指向实例vue该组件
 beforeRouteEnter(to,from,next){   
    console.log(to.name)
    next(vm=>{
        console.log(vm)      //而这里的vm就是该组件的实例了，只能通过回调方式使用组件实例。
    })
 }
 #b.beforeRouteLeave:即将离开当前页面时执行，如即将离开编辑页面，弹出提醒框，提醒你是否保存编辑内容。
 beforeRouteLeave(to,from,next){     //此时组件是已经渲染了，this可以执行vue实例
    const leave=confirm("你确定要离开本页面么？")
    if(leave){
         next()
     }else{
         next(false)
     }    //false表示不发生页面跳转
 }
 #c.beforeRouteUpdate:即路由发生改变，组件（复用组件）被复用时，执行。如同一个页面，在url上修改了参数之后，该页面被复用了，就会执行
 beforeRouteUpdate(to,from,next){   //此时组件是已经渲染了，this可以执行vue实例
     console.log(to.name)
 }
：