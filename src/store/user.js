/*
 * @Author: Lqf
 * @Date: 2021-09-22 15:50:58
 * @LastEditors: Lqf
 * @LastEditTime: 2021-09-22 16:45:30
 * @Description: 我添加了修改
 */
import { login, getInfo } from '@/api/user'

const state = {
  token: localStorage.getItem('token'),
  roles: []
}

const mutations = {
  setToken (state, token) {
    state.token = token
  },
  setRoles (state, roles) {
    state.roles = roles
  }
}

const actions = {
  // login ({ commit }, userInfo) {
  //   const { username } = userInfo
  //   return new Promise((res, rej) => {
  //     setTimeout(() => {
  //       if (username === 'Lqf' || username === 'admin') {
  //         commit('setToken', username)
  //         localStorage.setItem('token', username)
  //         res()
  //       } else {
  //         rej('用户名、密码错误')
  //       }
  //     }, 500)
  //   })
  // },
  login ({ commit }, userInfo) {
    return login(userInfo).then((res) => {
      commit("setToken", res.data)
      localStorage.setItem("token", res.data)
    })
  },
  // 获取用户权限情况
  // getInfo ({ commit, state }) {
  //   return new Promise(res => {
  //     setTimeout(() => {
  //       const roles = state.token === 'admin' ? ['admin'] : ['editor']
  //       commit('setRoles', roles)
  //       res({ roles })
  //     }, 500)
  //   })
  // },
  getInfo ({ commit, state }) {
    return getInfo(state.token).then(({ data: roles }) => {
      commit("setRoles", roles)
      return { roles }
    })
  },
  // 重置token
  resetToken ({ commit }) {
    return new Promise((res) => {
      commit('setToken', '')
      commit('setRoles', [])
      localStorage.removeItem('token')
      res()
    })

  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}