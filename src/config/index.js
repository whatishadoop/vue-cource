export const baseURL = process.env.NODE_ENV === 'production'
  ? 'http://production.com'
  : 'http://localhost:8081'   // 设置为当前webpack启动的本地服务地址
