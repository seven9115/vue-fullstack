<template>
  <div class="container">
    <legend>后台管理系统</legend>
    <div class="control-group">
      <label class="control-label" for="inputEmail">用户名</label>
      <div class="controls">
        <input type="text" placeholder="请输入用户名" v-model="user">
      </div>
    </div>
    <div class="control-group">
      <label class="control-label" for="inputPassword">密码</label>
      <div class="controls">
        <input type="password" id="inputPassword" v-model="password" placeholder="请输入密码">
      </div>
    </div>
    <div class="control-group">
      <div class="controls">
        <label class="checkbox">
          <input type="checkbox"> 记住我
        </label>
        <button type="submit" class="btn" v-on:click="login">登录</button>
      </div>
    </div>
  </div>
</template>

<script>
import md5 from 'js-md5'
import api from '../../../fetch/api'
export default {
  name: 'login',
  data () {
    return {
      user: '',
      password: ''
    }
  },
  methods: {
    login () {
      const user = this.user
      const password = md5(this.password)
      api.loginApi(user, password).then(res => {
        if (res.errorCode === 0) {
          localStorage.token = res.restbody.token
          this.$router.push({path: '/admin'})
        }
      })
    }
  }
}
</script>


<style scoped>

</style>