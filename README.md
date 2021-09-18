<!--
 * @Author: Lqf
 * @Date: 2021-09-18 10:53:00
 * @LastEditors: Lqf
 * @LastEditTime: 2021-09-18 10:55:35
 * @Description: 我添加了修改
-->
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
  + 构造了一个 pathMap 的闭包以便后续查找
  + 实现了嵌套路由的功能，包括产生响应式 matched 数组（Vue.util.defineReactive）以及实时更新值，利用深度层级 depth 进行路由匹配
  
- 手写简版 vuex src/lstore
  + 实现 state 响应式（new Vue）
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