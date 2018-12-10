import axios from './index'

export const getUserInfo = ({ userId }) => {
    return axios.request({
    //url: '/getUserInfo',
    //method: 'post',
    url: '/getUserInfo/data.json',    // 对应第三方接口的访问路径，域名为本地地址，在config/index.js配置
    method: 'get',
    data: {
      userId
    }
  })
}
