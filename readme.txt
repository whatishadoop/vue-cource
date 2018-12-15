1.render函数
main.js,list.vue,render-page. ，使用 render函数后，所有方法的修饰符不能使用了如.stop 冒泡
2.函数式组件
vue,render-dom.js  一般只会传递数据只是作为接受数据的函数，没有任何钩子函数，不做任何响应式的操作，类似vue当文件组件中的default exprot定义以及main.js中h render函数

a.定义单个渲染函数  render-page.vue 中定义renderFunc方法，一般用户定义组件渲染方式，然后传入下面子组件中
b.子组件引用函数式组件，并使用  render-dom.js
c.将属性和单个渲染函数传入到子组件中  list.vue

functional组件可以理解为react里的无状态组件，内部不存储用于在界面上展示的数据，传入什么，展示什么，传入的是相同的数据，展示的必然是相同的。相对于一个纯函数一样，没有其他副作用

3.jsx
用函数组件方式比较复杂，用jsx实现简单，它会把定义模板的的html标签转换为render js函数对象返回

4.作用域插槽
render函数组件以及jxs方式实现对组件内部分显示样式替换都比较繁琐，直接使用作用域插槽进行渲染，


node1: render函数 与 函数式组件 区别
render是用来替换temlate的，需要更灵活的模板的写法的时候，用render。
函数组件可以用render方式，可以用模板方式。函数组件主要用来做组件的外壳，也就是写模板之前，可以先对传进来的上下文做一些处理。这个“壳”的作用有点类似模板语法里的<template>标签，本身不会渲染，只是做包裹。

个人理解上面的关系
   template模板定义组件
   js代码实现模板灵活定义  ---  render(vue自带范式),支持事件，数据
                           ---  jxs (html标签定义方式，简单，会由vue转化成render写法)，支持事件，数据
                           ---  函数式组件(以上的特殊形式，传入数据，只展示，不支持事件响应)   ---render方式
                                                                                               ---作用域插槽 (比较简单，用于自定义替换组件内部样式)


note2： h 函数参数解析 ,参数1：标签名(原始标签，自定义组件标签)，参数2，标签对应的属性对象(包括vue实例属性，dom属性)，参数3:定义为数组，用于内部存放多个子组件标签或原始标签，定义方式和上面一样
render: h => {
  return h(CountTo, { }, [h=>{ xxx,xxx,xxx},h=>{ xxx,xxx,xxx}]
}

note3： render-page.vue --> list.vue --> render-dom.js(获取到render-page.vue 通过list.vue间接传入的renderFunc 方法，来渲染子组件render-dom显示内容，这种方式和插槽很像)

传入的renderFunc 方法必须定义如下
 methods: {
    renderFunc (h, number) {   // 定义需要传递的render单个渲染函数给子组件使用，下面是jxs写法 ，h 参数必须写
      return (
        // jsx中所有变量都是用括号包裹起来的，方法前面要加 on- ,nativeOn-, 使用时根据引入名CountTo作为标签名，不能写成count-to形式
        // nativeOn-click 表示将如下父中定义的handleClick 事件添加到CountTo 模板的最外层上作为子组件原生事件
        <CountTo nativeOn-click={this.handleClick} on-on-animation-end={this.handleEnd} endVal={number} style={{color: 'pink'}}></CountTo>
      )
    },