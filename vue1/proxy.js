/*
 * @Author: Lqf
 * @Date: 2021-09-07 09:08:59
 * @LastEditors: Lqf
 * @LastEditTime: 2021-09-07 09:09:02
 * @Description: 我添加了修改
 */
export default function (vm) {
  Object.keys(vm.$data).forEach(key => {
    Object.defineProperty(vm, key, {
      get () {
        return vm.$data[key]
      },
      set (v) {
        vm.$data[key] = v
      }
    })
  })
}