/*
 * @Author: Lqf
 * @Date: 2021-09-07 09:05:38
 * @LastEditors: Lqf
 * @LastEditTime: 2021-09-07 09:05:38
 * @Description: 我添加了修改
 */

import Dep from './dep'

const methods = ['push', 'shift', 'pop', 'unshift', 'sort', 'reverse', 'splice']
const originalProto = Array.prototype
const arrayProto = Object.create(originalProto);
methods.forEach(method => {
  arrayProto[method] = function () {
    originalProto[method].apply(this, arguments)
    console.log('数组执行了 ' + method + ' 操作')
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
      if (v !== val) {
        val = v
        observe(val)
        dep.notify()
      }
    }
  })
}

function observe (obj) {
  if (typeof obj !== 'object' || obj === null) return
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
    this.walk(val)
  }
  walk (obj) {
    Object.keys(obj).forEach(key => defineReactive(obj, key, obj[key]))
  }
}