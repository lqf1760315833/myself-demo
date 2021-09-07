/*
 * @Author: Lqf
 * @Date: 2021-09-06 16:25:53
 * @LastEditors: Lqf
 * @LastEditTime: 2021-09-06 16:28:59
 * @Description: 我添加了修改
 */
import Watcher from './watcher'

class Compile {
  constructor(el, vm) {
    this.vm = vm
    const dom = document.querySelector(el)
    this.compile(dom)
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
            const listen = attrName.slice(1)
            this.eventHandler(node, exp, listen)
          }
        })
        if (node.childNodes.length > 0) {
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

  eventHandler (node, exp, listen) {
    const fn = this.vm.$options.methods && this.vm.$options.methods[exp]
    node.addEventListener(listen, fn.bind(this.vm))
  }
}

export default Compile