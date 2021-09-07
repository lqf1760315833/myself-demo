/*
 * @Author: Lqf
 * @Date: 2021-09-03 16:31:28
 * @LastEditors: Lqf
 * @LastEditTime: 2021-09-07 09:09:38
 * @Description: 我添加了修改
 */

import Compile from './compile'
import observe from './observe'
import proxy from './proxy'


class LVue {
  constructor(options) {
    this.$options = options
    this.$data = options.data
    observe(this.$data)
    proxy(this)
    new Compile(options.el, this)
  }
}




