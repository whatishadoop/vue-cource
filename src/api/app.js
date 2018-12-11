export const getAppName = () => {
  return new Promise((resolve, reject) => {  // 通过定时器模拟从后台获取数据
    const err = null
    setTimeout(() => {
      if (!err) resolve({ code: 200, info: { appName: 'newAppName' } })
      else reject(err)
    })
  })
}
