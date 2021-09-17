/*
 * @Author: Lqf
 * @Date: 2021-09-17 11:21:14
 * @LastEditors: Lqf
 * @LastEditTime: 2021-09-17 13:57:10
 * @Description: 我添加了修改
 */
import Vue from 'vue'
import App from './App.vue'
// import router from './router'
import router from './lrouter'

// import store from './store'
import store from './lstore'

Vue.prototype.$bus = new Vue()

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
