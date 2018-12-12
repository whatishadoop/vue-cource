import Mock from 'mockjs'
import { getUserInfo } from './response/user'
const Random = Mock.Random

Mock.mock(/\/getUserInfo/, 'post', getUserInfo)  // 使用正则方式 或者直接写 http://localhost:8080/getUserInfo

Mock.setup({  // 设置模拟延迟时间
  timeout: 0
})

Random.extend({  // 扩展Random方法，提供自定义的fruit方法，作为全局使用
  fruit () {
    const fruit = ['apple', 'peach', 'lemon']
    return this.pick(fruit)
  }
})

export default Mock
