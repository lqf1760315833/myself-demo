<!--
 * @Author: Lqf
 * @Date: 2021-09-16 20:19:07
 * @LastEditors: Lqf
 * @LastEditTime: 2021-12-16 19:59:37
 * @Description: 我添加了修改
-->
<template>
  <div>
    <h2>自定义表单</h2>
    <l-form
      ref="loginForm"
      :model="model"
      :rules="rules"
    >
      <l-form-item
        label="用户名："
        prop="username"
      >
        <l-input
          v-model="model.username"
          placeholder="请输入用户名"
        />
      </l-form-item>
      <l-form-item
        label="密码："
        prop="password"
      >
        <l-input
          v-model="model.password"
          type="password"
          placeholder="请输入密码"
        />
      </l-form-item>
      <l-form-item>
        <button @click="onLogin">登录</button>
      </l-form-item>
    </l-form>
  </div>
</template>

<script>
import LForm from './LForm'
import LFormItem from './LFormItem'
import LInput from './LInput'
export default {
  components: {
    LForm,
    LFormItem,
    LInput
  },
  data() {
    return {
      model: {
        username: 'Tom',
        password: ''
      },
      rules: {
        username: [{ required: true, message: '用户名必填' }],
        password: [{ required: true, message: '密码必填' }]
      }
    }
  },
  methods: {
    onLogin() {
      this.$refs.loginForm.validate(isValid => {
        console.log('isValid: ', isValid)
        if (isValid) {
          console.log('submit')
        } else {
          // alert('校验失败')
          this.$notice({
            title: '来搬砖了喔',
            message: '校验失败',
            duration: 1000
          })
        }
      })
    }
  }
}
</script>

<style lang="less" scoped>
</style>
