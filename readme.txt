1.side-menu组件就是左边菜单收缩后显示的边栏菜单 ，查看 side-menu.vue文件

2.参看 vue中的template标签 文章，理解菜单中template标签
template标签，HTML5提供的新标签，更加规范和语义化 ；可以把列表项放入template标签中，然后进行批量渲染，常与vi-if v-for使用

3.less嵌套规则
在使用嵌套规则时，需要特别注意 & 符号。内层选择器前面的 & 符号就表示对父选择器的引用。在一个内层选择器的前面，如果没有 & 符号，则它被解析为父选择器的后代；如果有 & 符号，它就被解析为父元素自身或父元素的伪类,如下嵌套写法
#header {
  color: black;
  .navigation  { font-size: 12px }
  .logo {
    width: 300px;
    &:hover{
       text-decoration: none
    }
  }
}
编译后
#header {
  color: black;
  .navigation {
    font-size: 12px;
  }
  .logo {
    width: 300px;
    &:hover { text-decoration: none }
  }
}

4. &-xxx意思
父选择器运算符 & 的作用，就是让当前的选择器和父级选择器，按照特定的规则进行连接。它有多种用途，比如创建重复的类名

.button {
  &-ok {
    background-image: url("ok.png");
  }
  &-cancel {
    background-image: url("cancel.png");
  }
  &-custom {
    background-image: url("custom.png");
  }
}
编译后的CSS代码为：

.button-ok {
  background-image: url("ok.png");
}
.button-cancel {
  background-image: url("cancel.png");
}
.button-custom {
  background-image: url("custom.png");
}

v-show用于频繁的切换时使用，降低切换开销，而v-if一般用于一次显示或隐藏