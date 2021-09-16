/*
 * @Author: Lqf
 * @Date: 2021-09-10 14:42:06
 * @LastEditors: Lqf
 * @LastEditTime: 2021-09-16 16:57:27
 * @Description: 我添加了修改
 */
const methods = ['pop', 'shift', 'push', 'splice', 'unshift', 'sort', 'reverse']
const originProto = Array.prototype
const arrayProto = Object.create(originProto)
methods.forEach(method => {
  arrayProto[method] = function () {
    originProto[method].apply(this, arguments)
    console.log('执行了' + method + '操作');
  }
})

function defineReactive (obj, key, val) {
  observe(val)
  const dep = new Dep()
  Object.defineProperty(obj, key, {
    get () {
      Dep.target && dep.addDep(Dep.target)
      return val
    },
    set (v) {
      if (val !== v) {
        val = v
        observe(val)
        dep.notify()
      }
    }
  })
}


function observe (obj) {
  if (typeof obj !== 'object' || obj === null) return obj
  if (Array.isArray(obj)) {
    obj.__proto__ = arrayProto
    Object.keys(obj).forEach(key => observe(obj[key]))
  } else {
    new Observe(obj)
  }
}

class Observe {
  constructor(val) {
    this.val = val
    this.walk(this.val)
  }
  walk (obj) {
    Object.keys(obj).forEach(key => defineReactive(obj, key, obj[key]))
  }
}

function proxy (vm, key) {
  Object.keys(vm[key]).forEach((k) => {
    Object.defineProperty(vm, k, {
      get () {
        return vm[key][k];
      },
      set (v) {
        vm[key][k] = v;
      },
    });
  });
}

class LVue {
  constructor(options) {
    this.$options = options
    this.$data = options.data

    observe(this.$data)
    proxy(this, '$data')

    if (options.el) {
      this.$mount(options.el)
    }
  }

  $mount (el) {
    this.$el = document.querySelector(el)
    const updateComponent = () => {
      // dom 执行render，获取视图结构
      // const el = this.$options.render.call(this);
      // const parent = this.$el.parentElement;
      // parent.insertBefore(el, this.$el.nextSibling);
      // parent.removeChild(this.$el);
      // this.$el = el;

      // vnode
      const vnode = this.$options.render.call(this, this.$createElement.bind(this))
      console.log('vnode: ', vnode);
      this._update(vnode)
    }
    new Watcher(this, updateComponent)
  }

  $createElement (tag, data, children) {
    const obj = { tag, data, children }
    // 指令、方法等（后续
    if (data && data.directives) {
      for (const directive in data.directives) {
        if (Object.hasOwnProperty.call(data.directives, directive)) {
          const dir = directive.slice(2)
          const exp = data.directives[directive]
          this[dir] && this[dir](obj, exp)
        }
      }
    }
    return obj
  }

  _update (vnode) {
    const prevVnode = this._vnode
    if (!prevVnode) {
      this.__patch__(this.$el, vnode)
    } else {
      this.__patch__(prevVnode, vnode)
    }
  }

  __patch__ (oldVnode, vnode) {
    if (oldVnode.nodeType) {
      // init
      const el = this.createElm(vnode)
      const parent = oldVnode.parentElement
      const refElm = oldVnode.nextSibling
      parent.insertBefore(el, refElm)
      parent.removeChild(oldVnode)
    } else {
      // update
      const el = (vnode.el = oldVnode.el)
      if (oldVnode.tag === vnode.tag) {
        const oldCh = oldVnode.children
        const newCh = vnode.children
        if (typeof newCh === 'string') {
          if (typeof oldCh === 'string') {
            if (oldCh !== newCh) {
              el.textContent = newCh
            }
          } else {
            el.textContent = newCh
          }
        } else {
          if (typeof oldCh === 'string') {
            el.innerHTML = ''
            newCh.forEach((child) => {
              el.appendChild(this.createElm(child))
            })
          } else if (Array.isArray(oldCh)) {
            this.updateChildren(el, oldCh, newCh)
          }
        }
      }
    }

    this._vnode = vnode
  }

  createElm (vnode) {
    const el = document.createElement(vnode.tag)

    if (vnode.children) {
      if (typeof vnode.children === 'string') {
        el.textContent = vnode.children
      } else {
        vnode.children.forEach((child) => {
          el.appendChild(this.createElm(child))
        })
      }
    }

    // 保存el和vnode关系，将来更新需要用到
    vnode.el = el
    return el
  }

  updateChildren (parentElm, oldCh, newCh) {
    const len = Math.min(oldCh.length, newCh.length)
    for (let i = 0; i < len; i++) {
      this.__patch__(oldCh[i], newCh[i])
    }
    if (oldCh.length < newCh.length) {
      newCh.slice(len).forEach((child) => {
        parentElm.appendChild(this.createElm(child))
      })
    } else {
      oldCh.slice(len).forEach((child) => {
        parentElm.removeChild(child.el)
      })
    }
  }

  text (node, exp) {
    node.children = String(this[exp])
  }

  // 后续继续优化
  html (node, exp) {

  }
}

class Watcher {
  constructor(vm, fn) {
    this.vm = vm
    this.getter = fn
    this.get()
  }

  update () {
    this.get()
  }

  get () {
    Dep.target = this
    this.getter.call(this.vm)
    Dep.target = null
  }
}

class Dep {
  constructor() {
    this.deps = new Set()
  }

  addDep (watcher) {
    this.deps.add(watcher)
  }

  notify () {
    this.deps.forEach(watcher => watcher.update())
  }
}