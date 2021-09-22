/*
 * @Author: Lqf
 * @Date: 2021-09-22 16:35:01
 * @LastEditors: Lqf
 * @LastEditTime: 2021-09-22 16:46:15
 * @Description: 我添加了修改
 */
import axios from '@/utils/request'

export function login (data) {
  console.log('data: ', data)
  return axios.post('/user/login', data)
}

export function getInfo () {
  return axios.get('/user/info')
}