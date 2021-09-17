/*
 * @Author: Lqf
 * @Date: 2021-08-30 14:03:38
 * @LastEditors: Lqf
 * @LastEditTime: 2021-09-01 09:33:56
 * @Description: 我添加了修改
 */
import Vue from 'vue'
import Vuex from './lvuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    counter: 0
  },
  mutations: {
    add (state) {
      state.counter++
    }
  },
  actions: {
    add ({ commit }) {
      setTimeout(() => {
        commit('add')
      }, 1000);
    }
  },
  getters: {
    doubleCounter: state => {
      return state.counter * 2;
    }
  }
})
