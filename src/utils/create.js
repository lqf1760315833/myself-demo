/*
 * @Author: Lqf
 * @Date: 2021-09-17 15:54:19
 * @LastEditors: Lqf
 * @LastEditTime: 2022-01-21 10:53:17
 * @Description: 我添加了修改
 */
import Vue from 'vue'

export default function create (Component, props) {
  // 组件实例化
  const Ctor = Vue.extend(Component)
  const comp = new Ctor({
    propsData: props
  })

  // 空挂载，如果$mount传入body，会将原body删除
  comp.$mount()

  // 挂载到body
  document.body.appendChild(comp.$el)

  // 卸载
  comp.remove = function () {
    document.body.removeChild(comp.$el)
    comp.$destroy()
  }

  // 返回实例
  return comp
}