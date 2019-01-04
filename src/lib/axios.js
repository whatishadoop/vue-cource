import axios from 'axios'
import { baseURL } from '@/config'
import { getToken } from '@/lib/util'
class HttpRequest {
  constructor (baseUrl = baseURL) {
    this.baseUrl = baseUrl
    this.queue = {}
  }
  getInsideConfig () {
    const config = {
      baseURL: this.baseUrl,
      headers: {
        //
      }
    }
    return config
  }
  distroy (url) {
    delete this.queue[url]
    if (!Object.keys(this.queue).length) {
      // Spin.hide()
    }
  }
  interceptors (instance, url) {
    instance.interceptors.request.use(config => {  //  config为请求配置项
      // 添加全局的loading...
      if (!Object.keys(this.queue).length) {
        // Spin.show()
      }
      this.queue[url] = true
      config.headers['Authorization'] = getToken()   // 请求拦截器设置每次在请求时都会带上凭证token进行访问，若token失效则会调用error方法
      return config
    }, error => {
      return Promise.reject(error)
    })
    instance.interceptors.response.use(res => {  // 拦截返回响应
      this.distroy(url)  // 取消loading显示
      const { data } = res  // 处理获取返回数据
      return data
    }, error => {
      this.distroy(url)
      return Promise.reject(error)
    })
  }
  request (options) {
    const instance = axios.create()
    options = Object.assign(this.getInsideConfig(), options)  // 合并对象
    this.interceptors(instance, options.url)
    return instance(options)
  }
}
export default HttpRequest
