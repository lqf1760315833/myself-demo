const state = {
  token: localStorage.getItem('token')
}

const mutations = {
  setToken (state, token) {
    state.token = token
  }
}

const actions = {
  login ({ commit }, userInfo) {
    const { username } = userInfo
    return new Promise((res, rej) => {
      setTimeout(() => {
        if (username === 'Lqf' || username === 'admin') {
          commit('setToken', username)
          localStorage.setItem('token', username)
          res()
        } else {
          rej('用户名、密码错误')
        }
      }, 500)
    })
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}