# vue-sundry

- 组件通信 src/components/communication
  + props + $emit
  + refs / ref
  + $parent / $children
  + provide / inject
  + $attrs / $listeners

- 创建全局弹框 $notice src/component/Notice src/utils/create
  
- 自定义表单 src/components/form
  + LForm
  + LFormItem
  + LInput

- 手写简版 vue-router src/lrouter
  + router-link / router-view 实现
  + 嵌套路由响应式实现
  
- 手写简版 vuex src/lstore
  + 实现 state 响应式
  + 实现 commit, dispatch, getters

- 手写简版 vue1 lvue1
  + data 响应式
  + 数组相应式（仅覆盖未通知
  + data 代理
  + 编译以及更新
  + Watcher 和 Dep

- 手写简版 vue2 lvue2
  + 对 vue1 挂载以及更新操作的修改
  + $mount -> Watcher -> updateComponent -> $createElement -> _update -> `__patch__` -> createElm / updateChildren