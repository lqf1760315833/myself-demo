/*
 * @Author: Lqf
 * @Date: 2021-09-22 15:50:58
 * @LastEditors: Lqf
 * @LastEditTime: 2021-09-22 16:00:05
 * @Description: 我添加了修改
 */
import router from "./router"
import store from './store'

// 白名单
const whiteList = ['/login']

router.beforeEach(async (to, from, next) => {
  // 获取token以验证
  const hasToken = localStorage.getItem('token')

  if (hasToken) {
    if (to.path === '/login') {
      // 已登录直接放入首页
      next('/')
    } else {
      const hasRoles = store.getters.roles && store.getters.roles.length > 0
      if (hasRoles) {
        next()
      } else {
        // 获取权限路由
        try {
          const { roles } = await store.dispatch('user/getInfo')
          const accessRoutes = await store.dispatch('permission/generateRoutes', roles)
          router.addRoutes(accessRoutes)
          next({ ...to, replace: true })
        } catch (error) {
          await store.dispatch('user/resetToken')
          next(`/login?redirect=${to.path}`)
          alert(error)
        }
      }
    }
  } else {
    if (whiteList.indexOf(to.path) !== -1) {
      // 白名单放行
      next()
    } else {
      // 定位首页并加入重定向
      next(`/login?redirect=${to.path}`)
    }
  }
})