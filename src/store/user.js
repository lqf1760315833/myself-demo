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
  },
  getInfo ({ commit, state }) {
    return new Promise(res => {
      setTimeout(() => {
        const roles = state.token === 'admin' ? ['admin'] : ['editor']
        commit('setRoles', roles)
        res({ roles })
      }, 500)
    })
  },
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