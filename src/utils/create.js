/*
 * @Author: Lqf
 * @Date: 2021-09-17 15:54:19
 * @LastEditors: Lqf
 * @LastEditTime: 2021-09-17 17:33:42
 * @Description: 我添加了修改
 */
import Vue from 'vue'

export default function create (Component, props) {
  const Ctor = Vue.extend(Component)
  const comp = new Ctor({
    propsData: props
  })

  // 空挂载，如果$mount传入body，会将原body删除
  comp.$mount()

  document.body.appendChild(comp.$el)

  comp.remove = function () {
    document.body.removeChild(comp.$el)
    comp.$destroy()
  }
  return comp
}