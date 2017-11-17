<template>
  <div class="container">
    <form>
      <fieldset>
        <legend>后台管理系统</legend>
        <label>用户名：</label>
        <input type="text" placeholder="请输入用户名">
        <label>密码：</label>
        <input type="text" placeholder="请输入密码">
        <button type="submit" class="btn">登录</button>
      </fieldset>
    </form>
  </div>
</template>

<script>
require('bootstrap')
export default {
  name: 'HelloWorld',
  data () {
    return {
      msg: 'Welcome to Your Vue.js App'
    }
  }
}
</script>


<style scoped>

</style>
