<!--
 * @Author: Lqf
 * @Date: 2021-09-09 16:30:53
 * @LastEditors: Lqf
 * @LastEditTime: 2021-09-18 10:50:05
 * @Description: 我添加了修改
-->
### 多次阅读

> history / hash
> 节点属性更新过程，key怎么起作用
> _c,l,t,s,v
> keep-alive(LRU), 插槽， 编译器工作原理
> compileToFunctions：template => render
> mountComponent
> initGlobalAPI：set,delete,use,mixin,extend,component,directive,filter
> mergeOptions
> _init
> 响应式
> patch：patchVnode(oldVnode, vnode) / createElm / createComponent

### 异步组件
```javascript
Vue.component('Foo', () => {
  component: delay(4000, () => ('Foo.js')),
  loading: LoadingComponent,
 	error: ErrorComponent,
  timeout: 5000
})

const delay = (time, fn) => {
  return new Promise((res, rej) => {
    setTimeout(() => {
      resolve(fn())
    }, time)
  })
}

const LoadingComponent = {
  template: `<div>Loading...</div>`
}

const ErrorComponent = {
  template: `<div>Error</div>`
}
```

### Vue Plugins
1. 添加全局函数
2. 添加全局资源 - 组件,指令
3. 混入组件选项
4. 添加 Vue 的实例方法
