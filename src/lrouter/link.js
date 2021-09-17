/*
 * @Author: Lqf
 * @Date: 2021-09-02 16:49:32
 * @LastEditors: Lqf
 * @LastEditTime: 2021-09-03 10:49:53
 * @Description: 我添加了修改
 */
export default {
  props: {
    to: {
      type: String,
      required: true
    }
  },
  render (h) {
    return h('a', {
      attrs: {
        href: '#' + this.to
      }
    }, this.$slots.default)
  }
}