/*
 * @Author: Lqf
 * @Date: 2021-09-17 11:21:14
 * @LastEditors: Lqf
 * @LastEditTime: 2021-09-22 10:42:59
 * @Description: 我添加了修改
 */
import Vue from 'vue'
import App from './App.vue'
import './plugins/element.js'

import router from './router'
import store from './store'

// import router from './lrouter'
// import store from './lstore'

import create from './utils/create'
import Notice from './components/Notice.vue'

// 引入 svg 全局配置
import '@/icon'

// 引入路由守卫 beforeEach
import './premission'

// 引入按钮权限
import vPermission from './directives/permission'
Vue.directive('permission', vPermission)


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
