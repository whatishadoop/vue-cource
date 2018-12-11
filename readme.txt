pulic文件下：favicon.ico是网址上方标题的的小图标。
    index.html：是入口文件。
    src：项目的主文件：
      assets：是存放静态资源（如，图片，css等）的文件。
                img：存放图片文件。
                iconfont：图标字体文件。

                css：存放公共css文件。

                js：存放第三方js文件。
      components：可复用的组件。
      views：页面组件。
      api：项目的ajax请求请求。
      config：项目的配置文件。
               index.js：配置地址，在需要的地方import config  from "./config/index.js"引入配置对象即可。
      directive：存放vue的自定义指令。
               index.js：
      lib：
              tools.js：存放与业务无关的，纯粹的工具方法，如封装的通用js方法。
              util.js：存放与业务结合有关的，如定义的路径变量。
     router：存放路由有关的，将router.js移入该文件内。
         index.js:：存放引入文件，配置路由实例。如下图：