<!--
 * @Author: Lqf
 * @Date: 2021-09-22 19:48:22
 * @LastEditors: Lqf
 * @LastEditTime: 2022-01-21 09:33:08
 * @Description: 我添加了修改
-->

<template>
  <div>
    <h2>用户登录</h2>
    <div>
      <input
        v-model="username"
        type="text"
      />
      <button @click="login">登录</button>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      username: 'admin'
    }
  },
  methods: {
    login() {
      this.$store
        .dispatch('user/login', { username: this.username })
        .then(() => {
          // 路由跳转至首页
          this.$router.push({
            path: this.$route.query.redirect || '/'
          })
        })
        .catch(err => {
          alert(err)
        })
    }
  }
}
</script>

<style lang="less" scoped>
</style>