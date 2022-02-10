/*
 * @Author: Lqf
 * @Date: 2021-09-22 09:12:05
 * @LastEditors: Lqf
 * @LastEditTime: 2021-09-22 09:28:31
 * @Description: 我添加了修改
 */
import store from '@/store'

const permission = {
  inserted (el, binding) {
    const { value: pRole } = binding
    const roles = store.getters && store.getters.roles

    if (pRole && Array.isArray(pRole) && pRole.length > 0) {
      const hasPermission = roles.some(role => pRole.includes(role))
      if (!hasPermission) {
        el.parentNode && el.parentNode.removeChild(el)
      }
    } else {
      throw new Error(`需要指定按钮要求角色数组，如v-permission="['admin','editor']"`)
    }
  }
}

export default permission