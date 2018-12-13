export default {
  functional: true,  // true表示无状态，只是个实例对象
  props: {  // 设置传入属性以及类型
    number: Number,
    renderFunc: Function  // 传入的 render处理函数
  },
  render: (h, ctx) => {  // 设置render函数，ctx表示当前实例
    return ctx.props.renderFunc(h, ctx.props.number)  // 根据当前实例ctx获取到renderFunc函数
  }
}
