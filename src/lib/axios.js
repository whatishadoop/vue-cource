import axios from 'axios'
import { baseURL } from '@/config'  // 引入缺省配置

class HttpRequest {
  constructor (baseUrl = baseURL) {  // 创建constructor方法，设置默认值baseURL,在config.js中配置
    this.baseUrl = baseUrl
    this.queue = {} // 队列空对象,用于存放所有未请求完的url，当队列为空时，表示所有url请求完，这样可以只需要一次添加loading加载效果，不需要重复添加loading效果
  }
  getInsideConfig(){  // 创建一个方法，配置全局通用配置如url,methods,headers等，返回一个内部的配置
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
  interceptors(instance,url){  // 拦截器，参数axios的实例 ,url是用于存放queue空队列中
    instance.interceptors.request.use(config => { // axios请求拦截器,config是请求成功时的处理函数，error是请求出现错误时的处理函数
      // 添加全局的loading...
      if (!Object.keys(this.queue).length) { // 如果this.queue队列所有的Key值组成的数组为空的情况下，即
        // Spin.show()  // 显示iview中的加载动画效果
      }
      this.queue[url] = true   // this.queue[url] 表示对对象的属性url 赋值，将请求的url放入队列中
      return config
    }, error => {
      return Promise.reject(error)  // 请求失败时，直接抛出这个错误
    })
    instance.interceptors.response.use(res => {  // axios响应拦截器，对返回的结果的处理筛选
      this.distroy(url) // 响应成功后就删除该队列对应的url
      const { data, status } = res  // 对响应结果进行筛选，只需要data和status值
      return { data, status }
    }, error => {
      this.distroy(url) // 响应失败后就删除该队列对应的url
      return Promise.reject(error)   // 响应失败时，直接抛出这个错误
    })
  }
  request(options){  //  创建一个请求request方法,options是单独传入请求的配置 如参数
    const instance=axios.create();  // 创建一个axios实例
    options=Object.assign(this.getInsideConfig(),options);    // 将内部的配置与传入的配置合并成新的options对象
    this.interceptors(instance,options.url);   // axios实例为参数的拦截器
    return instance(options);   // 返回axios的实例，配置参数是合并后的参数
  }
}
export default HttpRequest
