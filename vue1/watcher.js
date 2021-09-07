/*
 * @Author: Lqf
 * @Date: 2021-09-06 16:27:43
 * @LastEditors: Lqf
 * @LastEditTime: 2021-09-06 16:27:44
 * @Description: 我添加了修改
 */

import Dep from './dep'

class Watcher {
  constructor(vm, key, updater) {
    this.vm = vm
    this.key = key
    this.updater = updater
    Dep.target = this
    this.vm[this.key]
    Dep.target = null
  }
  update () {
    this.updater.call(this.vm, this.vm[this.key])
  }
}

export default Watcher