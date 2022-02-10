/*
 * @Author: Lqf
 * @Date: 2021-09-22 16:17:38
 * @LastEditors: Lqf
 * @LastEditTime: 2021-09-22 19:39:01
 * @Description: 我添加了修改
 */
import Axios from 'axios'
import { Message, MessageBox } from 'element-ui'
import store from '@/store'

const axios = Axios.create({
  baseURL: process.env.VUE_APP_BASE_API,
  // withCredentials: true, // 跨域时若要发送cookies需设置该选项
  timeout: 5000
})

axios.interceptors.request.use(config => {
  const token = localStorage.getItem('token')
  if (token) {
    config.headers['Authorization'] = 'Bearer' + token
  }
  return config
}, error => {
  return Promise.reject(error)
})

axios.interceptors.response.use(response => {
  // 仅返回数据部分
  const res = response.data
  if (res.code !== 1) {
    Message({
      message: res.message || "Error",
      type: "error",
      duration: 5 * 1000
    })
    // 假设：10008-非法令牌; 10012-其他客户端已登录; 10014-令牌过期;
    if (res.code === 10008 || res.code === 10012 || res.code === 10014) {
      // 重新登录
      MessageBox.confirm(
        "登录状态异常，请重新登录",
        "确认登录信息",
        {
          confirmButtonText: "重新登录",
          cancelButtonText: "取消",
          type: "warning"
        }
      ).then(() => {
        store.dispatch('user/resetToken').then(() => {
          location.reload()
        })
      })
    }
  } else {
    return res
  }
}, error => {
  Message({
    message: error.message,
    type: 'error',
    duration: 5 * 1000
  })
  return Promise.reject(error)
})

export default axios