export const getAppName = () => {
  return new Promise((resolve, reject) => {   // 模拟后台接口获取参数方法
    const err = null
    setTimeout(() => {
      if (!err) resolve({ code: 200, info: { appName: 'newAppName' } })
      else reject(err)
    })
  })
}
