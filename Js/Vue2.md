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

### 更新过程

> set()：更新操作
>
> dep.notify() ：变更通知
>
> watcher.update()：循环 watcher 实例，执行 update
>
> queueWatcher(this) ：watcher入队 --- id 去重 / flushing
>
> queue.push(watcher)：入队
>
> nextTick(flushSchedulerQueue)：waiting 置 true，异步启动队列冲刷任务
>
> callbacks.push(flushSchedulerQueue)
>
> timerFunc()
>
> - 往微任务队列中放入 flushCallbacks   
>
> - Promise > MutationObserver > setImmediate > setTimeout
>
> ----------async----------
>
> flushCallbacks()：循环执行 callbacks 中的函数
>
> flushSchedulerQueue()：id 排序
>
> watcher.run()
>
> watcher.get()
>
> watcher.getter()   ===  updateComponent()
>
> vm._render() === createElement(h)
>
> vm_update(vnode)
>
> patch(oldVnode, vnode) diff
>
> patchVnode(oldVnode, vnode) / createElm / createComponent	 **!important**
>
> updateChildren()



> nextTick的理解？
>
> nextTick：
>
> ​	概念：vue批量异步更新策略策略，组件更新的时候，不会立刻执行，而是通过nextTick异步启动
>
> ​    作用：nextTick(cb),应用：数据变化，需要访问dom最新的值的时候
>
> ​    如何工作：源码描述，数据变化，watcher入队，异步冲刷队列，最后真正watcher.run
>
> ​    结合实践：



### 组件化机制

- 步骤

  - 注册组件

    - Vue.component(id, comp)
    - Components

  - 声明组件

    ```html
    <template>
    	<comp></comp>
    </template>
    ```

    template => render()

    ```javascript
    // console.log(app.$options.render)
    ƒ anonymous(
    ) {
    with(this){return  // this 是当前组件
        _c('div',{attrs:{"id":"demo"}},[
          _c('h1',[_v("Vue组件化机制")]),
          _v(" "),
          _c('comp')],
           1)}
    }
    _v,l,s,t:render-helpers
    _c:render   
    initRender(): 1. 注册slots,scopedSlots 2. 注册_c
    vdom/create-element: createElement(a, b, c, d, false/true) false/true 为标准化处理标识符
    _createElement: 实际调用 h,返回 vnode
    Ctor = resolveAsset(context.$options, 'components', tag)) 
    Ctol 是之前挂载到Vue.$options的components下的组件构造函数
    createElement 转换自定义组件 Ctol 为 vnode
    vnode = createComponent(Ctol,...args)
    
    installComponentHooks(data)
    hooksToMerge
    ```

    

  - 某个时刻:挂载 $mount => mountComponent =>  render() => vdom

  - patch()





initGlobalAPI

initAssetRegisters







this.option._base 是 Vue 实例

const Crol = Vue.extend({}: 组件定义) 返回 Vue 构造函数.  // 看看 extend 实现

const comp = new Ctol() 获取到组件实例

comp.$mount 执行挂载

mergeOptions 时把所有组件都合并到选项中

`this.options[type + 's'][id] = definition 将所有组件挂到 Vue 到 options 到 components 选项中`



组件与正常标签的区别?



组件定义 => 组件实例 => 挂载



$mount

render()

createElement()

createComponent => vnode 

...

patch

createComponent(从 vnode 中获取组件初始化钩子)

执行 init 方法(创建自定义组件并挂载它)

child = vnode.componentInstance = createComponentInstanceForVnode

return new vnode.componentOptions.Ctor(options)

child.$mount()

initComponent() 处理之后已经组件化以及完成

invokeCreateHooks() 创建钩子负责处理组件属性,事件等





断点

1. create-element --> typeof tag === 'String'

2. create-element --> isDef(*Ctor* = resolveAsset(context.$options, 'components', tag))

3. create-element --> installComponentHooks  data 数据
4. patch ---> createElm(vnode) 里面有 children 为 vue-component-1-comp --- 进