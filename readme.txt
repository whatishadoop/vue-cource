Icon组件，
1) unicode&Symbol
a.1在App.vue 中进行全局配置unicode
/*下面引入iconfont字体图标配置信息*/
@font-face {font-family: 'iconfont';
    src: url('./assets/font/iconfont.eot');
    src: url('./assets/font/iconfont.eot?#iefix') format('embedded-opentype'),
    url('./assets/font/iconfont.woff') format('woff'),
    url('./assets/font/iconfont.ttf') format('truetype'),
    url('./assets/font/iconfont.svg#iconfont') format('svg');
}
.iconfont{
  font-family:"iconfont" !important;
  font-size:16px;
  font-style:normal;
  -webkit-font-smoothing: antialiased;
  -webkit-text-stroke-width: 0.2px;
  -moz-osx-font-smoothing: grayscale;
}

a.2在icon_page.vue使用如下，使用class="iconfont" + unicode编码方式引入，其中smile是给字体图标自定义加颜色
<i class="iconfont smile">&#xe619;</i>
<i class="iconfont">&#xe618;</i>

.smile{
  color: red;
}

b.1 Symbol方式，在main.js中全局引入iconfont.js
import '@/assets/font/iconfont.js'

b.2在app.vue定义样式
.iconfont-svg {
  width: 1em; height: 1em;
  vertical-align: -0.15em;
  fill: currentColor;
  overflow: hidden;
}
b.3 在icon_page.vue 中使用，class="iconfont-svg" 对应上面类名，自行设置字体大小style="font-size: 70px;"
 <svg class="iconfont-svg" aria-hidden="true" style="font-size: 70px;">
      <use xlink:href="#icon-zhaoxiangji-"></use>
    </svg>

2)font-class
1.在main.js中全局引入iconfont.css
import '@/assets/font/iconfont.css'

2.在icon_page.vue 中使用
<Icon custom="iconfont icon-shouye4"/>

3.使用i-view 图标控件也是可以的
<Icon custom="iconfont icon-shouye4"/>

3)封装单色，一般使用字体方式，输入属性包括图标名，字体大小，颜色
a.1.自定义单色icon-font.vue
a.2.在main.js中进行全局注册，这样在任何地方都可以直接使用
import IconFont from '_c/icon-font'
Vue.component('icon-font', IconFont)

a.3.在icon_page.vue 中使用
<icon-font icon="shouye3" :size="50" color="blue"></icon-font>

b.1.自定义多色ICON组件icon-svg.vue
b.2 svg方式支持多色ICON组件， main.js引入，全局注册该组件，输入属性包括图标名，大小
import IconSvg from '_c/icon-svg'
Vue.component('icon-svg', IconSvg)
b.3 在icon_page.vue 中使用
<icon-svg icon="zhuye-" :size="100"></icon-svg>

阿里iconfont提供很多图标