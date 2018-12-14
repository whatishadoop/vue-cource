export const baseURL = process.env.NODE_ENV === 'production'
  ? 'http://production.com'
  : ''   // 若是开发环境，访问的基础路径使用空字符串，这样才能匹配访问代理
