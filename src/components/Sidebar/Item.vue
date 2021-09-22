<!--
 * @Author: Lqf
 * @Date: 2021-09-22 14:13:15
 * @LastEditors: Lqf
 * @LastEditTime: 2021-09-22 14:16:22
 * @Description: 我添加了修改
-->
<script>
export default {
  name: 'MenuItem',
  functional: true,
  props: {
    icon: {
      type: String,
      default: ''
    },
    title: {
      type: String,
      default: ''
    }
  },
  render (h, context) {
    const { icon, title } = context.props
    const vnodes = []

    if (icon) {
      vnodes.push(<svg-icon icon-class={icon} slot="title" />)
    }

    if (title) {
      vnodes.push(<span slot="title">{title}</span>)
    }
    return vnodes
  }
}
</script>