<template>
  <div>
    <input v-model="userName" />
    <input type="password" v-model="password"/>
    <button @click="handleSubmit">登录</button>
  </div>
</template>
<script>
import { mapActions } from 'vuex'
export default {
  name: 'login_page',
  data () {
    return {
      userName: '',
      password: ''
    }
  },
  methods: {
    ...mapActions([
      'login'
    ]),
    handleSubmit () {
      this.login({     // this.login返回的是promise对象，可以保证请求接口完成后才会执行如下跳转页面方法
        userName: this.userName,
        password: this.password
      }).then(() => {
        console.log('success!!')
        this.$router.push({   // 登录成功后进行页面跳转
          name: 'home'
        })
      }).catch(error => {
        console.log(error)
      })
    }
  }
}
</script>
