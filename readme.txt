1.render函数
main.js,list.vue,render-page. ，使用 render函数后，所有方法的修饰符不能使用了如.stop 冒泡
2.函数式组件
vue,render-dom.js  一般只会传递数据只是作为接受数据的函数，没有任何钩子函数，不做任何响应式的操作，类似vue当文件组件中的default exprot定义以及main.js中h render函数

a.定义单个渲染函数  render-page.vue 中定义renderFunc方法，一般用户定义组件渲染方式，然后传入下面子组件中
b.子组件引用函数式组件，并使用  render-dom.js
c.将属性和单个渲染函数传入到子组件中  list.vue

3.jsx
用函数组件方式比较复杂，用jsx实现简单，它会把 定义的html标签转换为js对象

4.作用域插槽
render函数以及jxs方式都比较繁琐，直接使用作用域插槽进行渲染
