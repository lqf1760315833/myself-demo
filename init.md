### 初始化过程

```javascript
初始化 =》 根实例 =》挂载 =》执行render =》vdom =》patch(vdom) =》dom => append

// package.json > scripts > dev
// "dev": "rollup -w -c scripts/config.js --sourcemap --environment TARGET:web-full-dev",
// 1. 添加 --sourcemap
// 2. 打包入口文件 scripts/config.js 入口:target web-full-dev
// entry: resolve('web/entry-runtime-with-compiler.js')
// 1. alias -- web:reslove('src/platforms/web') -- 执行挂载操作
// 2. 扩展 $mount: vdom => dom => append
// 3. 添加 render 以便后续使用,(this.$options 中存在，直接返回挂载)
//    1. 获取 this.options.template
//      - typeof template === 'string'：使用 idToTemplate 函数获取 el innerHTML
//      - template.nodeType 存在：直接获取 innerHTML
//      - template 不存在：获取 el，获取 el 的 outerHTML
//    2. 编译 template 获得 render 函数
//      - 通过 compileToFunctions 获得 render, staticRenderFns 的匿名函数并挂到 options 下

顺着 Vue 传入位置往上查找
// runtime/index.js
// 1.  安装补丁(更新)函数 __patch__: vdom => dom
// 2. 实现Vue.prototype.$mount方法(mountComponent)

顺着 Vue 传入位置往上查找
// core/index：初始化全局静态 API： Vue.set/delect/component/use...

Vue 构建
// instance/index
// 1.构造函数声明,Vue 真正构建的位置（入口文件）
// 2.各种实例属性和方法的声明

// instance/init：产生初始化函数_init
// 1. 合并用户和系统默认选项 mergeOptions 
// 2. 初始化

//   vm._self = vm

//   initLifecycle(vm) // 生命周期相关的属性初始化$parent等
//   注册 $parent,$children,$root,$refs

//   // <comp @my-click="onclick"></comp>
//   initEvents(vm) // 自定义组件事件监听
//   this.$options._parentListeners 获取父级自定义事件,在子类中使用

//   initRender(vm) // 插槽处理，$createElm === render(h)
//   $slots,$scopedSlots,$createElement(vm._c)

//   // 调用生命周期的钩子函数
//   callHook(vm, 'beforeCreate')

//   // provide/inject
//   // 组件数据和状态初始化
//   initInjections(vm) // resolve injections before data/props
//   initState(vm) // data/props/methods/computed/watch
//   initProvide(vm) // resolve provide after data/props
//   callHook(vm, 'created')

//   // 设置了el选项组件，会自动挂载
//   if (vm.$options.el) {
//   	vm.$mount(vm.$options.el)
//   }

// 至此 构建结束，如果没有挂载，再接受外面的 $mount 函数

挂载操作
// $mount挂载 -- mountComponent  --lifecycle.js
// 1. 丢出 beforeMount
// 2. updateComponent: 组件更新函数声明
// 	 - 调用_update函数
//     - 获取上次计算的虚拟dom: const prevVnode = vm._vnode
//	   - 根据prevVnode值存在,判断初始化或更新(diff)
// 3. 生成当前组件的对应Watcher(调用一次updateComponent)
$mount -> mountComponent -> watcher -> updateComponent 
-> _update(render) -> vdom -> patch -> createElm -> dom

响应式 -- initData
// 处理顺序 props methods data
// 做响应式: observe 函数
```
