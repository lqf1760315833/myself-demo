import router from "./router"

// 白名单
const whiteList = ['/login']

router.beforeEach((to, from, next) => {
  // 获取token以验证
  const hasToken = localStorage.getItem('token')

  if (hasToken) {
    if (to.path === '/login') {
      // 已登录直接放入首页
      next('/')
    } else {
      // 直接通过并处理后续逻辑
      next()
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