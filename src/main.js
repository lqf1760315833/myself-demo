/*
 * @Author: Lqf
 * @Date: 2021-09-17 11:21:14
 * @LastEditors: Lqf
 * @LastEditTime: 2021-09-18 10:39:01
 * @Description: 我添加了修改
 */
import Vue from 'vue'
import App from './App.vue'
// import router from './router'
import router from './lrouter'

// import store from './store'
import store from './lstore'

import create from './utils/create'
import Notice from './components/Notice.vue'

// 引入 svg 全局配置
import '@/icon'

Vue.config.productionTip = false

// 总线
Vue.prototype.$bus = new Vue()

// 注册全局notice选项
Vue.prototype.$notice = function (props) {
  const notice = create(Notice, props)
  notice.show()
}

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
