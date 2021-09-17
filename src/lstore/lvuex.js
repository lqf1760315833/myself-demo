/*
 * @Author: Lqf
 * @Date: 2021-08-31 18:46:35
 * @LastEditors: Lqf
 * @LastEditTime: 2021-09-17 12:48:02
 * @Description: 我添加了修改
 */
let Vue

class Store {
  constructor(options) {
    this.$options = options
    this._mutations = options.mutations
    this._actions = options.actions

    this._vm = new Vue({
      data () {
        return {
          $$state: options.state
        }
      }
    })

    this.getters = {}
    Object.keys(options.getters).forEach(key => {
      Object.defineProperty(this.getters, key, {
        get: () => {
          return options.getters[key](this.state)
        },
        enumerable: true
      })
    })

    this.commit = this.commit.bind(this)
    this.dispatch = this.dispatch.bind(this)
  }

  get state () {
    return this._vm._data.$$state
  }

  set state (newValue) {
    console.log('no no no', newValue)
  }

  commit (type, payload) {
    const mutation = this._mutations[type]
    mutation && mutation(this.state, payload)
  }

  dispatch (type, payload) {
    const action = this._actions[type]
    action && action(this, payload)
  }
}

function install (_Vue) {
  Vue = _Vue
  Vue.mixin({
    beforeCreate () {
      if (this.$options.store) {
        Vue.prototype.$store = this.$options.store
      }
    }
  })
}
export default { Store, install }
