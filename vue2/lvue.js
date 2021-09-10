/*
 * @Author: Lqf
 * @Date: 2021-09-10 14:42:06
 * @LastEditors: Lqf
 * @LastEditTime: 2021-09-10 17:30:43
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
    new Compiler(options.el, this)
  }
}

class Compiler {
  constructor(el, vm) {
    this.vm = vm
    const dom = document.querySelector(el)
    dom && this.compile(dom)
  }

  compile (el) {
    const childNodes = el.childNodes
    childNodes.forEach(node => {
      if (this.isElement(node)) {
        const attrs = node.attributes
        Array.from(attrs).forEach(attr => {
          const attrName = attr.name
          const exp = attr.value
          if (this.isDir(attrName)) {
            const dir = attrName.slice(2)
            this[dir] && this[dir](node, exp)
          }
          if (this.isMethod(attrName)) {
            const dir = attrName.slice(1)
            this.eventHandler(node, exp, dir)
          }
        })
        if (node.childNodes) {
          this.compile(node)
        }
      } else if (this.isInner(node)) {
        this.compileText(node)
      }
    })
  }

  update (node, exp, dir) {
    const fn = this[dir + 'Updater']
    fn && fn(node, this.vm[exp])
    new Watcher(this.vm, exp, function (val) {
      fn && fn(node, val)
    })
  }

  model (node, exp) {
    this.update(node, exp, 'model')
    node.addEventListener('input', e => {
      this.vm[exp] = e.target.value
    })
  }

  modelUpdater (node, val) {
    node.value = val
  }

  html (node, exp) {
    this.update(node, exp, 'html')
  }

  htmlUpdater (node, val) {
    node.innerHTML = val
  }

  text (node, exp) {
    this.update(node, exp, 'text')
  }

  textUpdater (node, val) {
    node.textContent = val
  }

  compileText (node) {
    this.update(node, RegExp.$1, 'text')
  }

  isMethod (attrName) {
    return attrName.startsWith('@')
  }

  isDir (attrName) {
    return attrName.startsWith('l-')
  }

  isElement (node) {
    return node.nodeType === 1
  }

  isInner (node) {
    return node.nodeType === 3 && /\{\{(.*)\}\}/.test(node.textContent)
  }

  eventHandler (node, exp, dir) {
    const fn = this.vm.$options.methods && this.vm.$options.methods[exp]
    node.addEventListener(dir, fn.bind(this.vm))
  }
}

class Watcher {
  constructor(vm, key, fn) {
    this.vm = vm
    this.key = key
    this.fn = fn
    Dep.target = this
    this.vm[this.key]
    Dep.target = null
  }
  update () {
    this.fn.call(this.vm, this.vm[this.key])
  }
}

class Dep {
  constructor() {
    this.deps = []
  }

  addDep (watcher) {
    this.deps.push(watcher)
  }

  notify () {
    this.deps.forEach(watcher => watcher.update())
  }
}