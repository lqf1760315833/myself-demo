
import RouterLink from './link'
import RouterView from './view'
import createMatcher from './create-matcher'
let Vue

class VueRouter {
  constructor(options) {
    this.matcher = createMatcher(options.routes)
    Vue.util.defineReactive(this, 'matched', [])
    this.matched = this.match(this.getHash())
    window.addEventListener('hashchange', () => {
      this.matched = this.match(this.getHash())
    })
  }
  getHash () {
    return window.location.hash.slice(1) || '/'
  }
  match (path) {
    return this.matcher.match(path)
  }
}

VueRouter.install = function (_Vue) {
  Vue = _Vue
  Vue.mixin({
    beforeCreate () {
      if (this.$options.router) {
        Vue.prototype.$router = this.$options.router
      }
    },
  })
  Vue.component('router-link', RouterLink)
  Vue.component('router-view', RouterView)
}

export default VueRouter