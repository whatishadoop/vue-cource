count-to.vue 参看
1.实例id介绍 this._uid
2.怎么获取子组件dom里面的内容(原生js获取和ref获取)：
   ref获取：this.$refs.child.innerText 等价于 原生js获取：document.getElementById(myId).innerText
    父组件怎么调用子组件的方法：  this.$refs.childSpan.getChildInfo()
3.父向子传递数据，子向父发送事件进行处理
4.props传入的属性，数组，对象缺省值定义方法
5.在组件引入外部css的2种方法：
          在script里面：import "../index.css"
          在style里面：@import "../index.css"
6.$watch监控属性使用
7.使用data保存组件中对象实例，便于下次使用
data () {
    return {
      counter: {}  // 保存counter对象实例，便于后面使用
    }
  },
// 保存counter对象实例，便于后面使用
