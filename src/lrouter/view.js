export default {
  render (h) {
    this.$vnode.data.routerView = true
    let component = null
    let depth = 0
    let parent = this.$parent
    while (parent) {
      if (parent.$vnode && parent.$vnode.data && parent.$vnode.data.routerView) depth++
      parent = parent.$parent
    }
    const { matched } = this.$router
    const route = matched[depth]
    console.log('depth', depth)
    if (route) component = route.component
    return h(component)
  }
}