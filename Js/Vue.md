# Vue

### 1. 对 Vue 的理解

- 轻量级框架：视图，数据分离，只需操作数据
- 核心库加插件：本身只关注 UI，可以轻松引入 Vue  插件或第三方库
- 代码简洁体积小，运行效率高，适合移动 PC 端开发
- 核心思想：数据驱动和组件化思想

### 基础语法指令

- v-model

  + 语法糖：`v-bind:value="inputValue" + v-on：input="inputValue = $event.target.value"`
  + 自定义组件：`:value="inputValue + @input="inputValue = argument[0]" + this.$emit('input', value)`
  + .number：自动将输入值转换为数值
  + .lazy：在 input 加上将转换为 change 时更新
  + .trim
- v-html：容易受到 xss 攻击、替换标签内的元素
- v-once：渲染后不更改
- v-text：纯文本输出，不会闪烁
- v-cloak：编译结束前可以使用样式，解决闪烁问题
- 事件修饰符

  - stop--阻止冒泡   
  - prevent--阻止浏览器默认行为--a标签
  - capture--捕获事件
  - self 只触发本身的事件  
  - once 事件只执行一次
  - trim、lazy、number
- computed：也是一个 watcher，具备缓存，数据变化重新计算。一个数据依赖于其他数据
- watch：每次都需要执行函数。适用于数据变化时的异步操作
- data：实例可以为对象，组件中必须为函数，函数返回对象，确保每个实例的数据独有

### 生命周期

- beforeCreate
  - new Vue 实例后，只有默认钩子和默认事件，data、methods 数据未初始化
- created
  - data、methods 初始化完成，可以调用；一般初始化某些属性值
  - 在这里请求能更快取到服务端数据，减少 loading 时间，
  - ssr 不支持 beforeMount、mounted 钩子函数
- beforeMount
  - 此时内存中模版编译完成但是未挂载
  - 可以获取数据
- mounted
  - 旧的被新创建的`vm.$el`替换并挂载后调用
  - 进行 DOM 操作
- beforeUpdata
  - 数据更新前调用，发生在虚拟 DOM 重新渲染和打补丁
  - 进一步更改状态，不会触发重渲染
  - 页面数据--旧，data 数据--新
- updated
  - 可以执行 DOM 操作，但要避免更改状态，不然可能导致无限循环
- beforeDestroy：实例销毁前调用
- destroyed
  - 销毁后调用，实例指示的所有东西解绑，监听器、子实例移除

### 虚拟 DOM

- 模版编译原理
  - 解析：将模版转换成 AST 树，1 普通元素，2 表达式，3 纯文本
  - 优化语法树：深度遍历 AST 树，检测是否为静态节点，如果是，则 DOM 永远无需改变
  - 生成代码：通过 generate 方法，生成 render 函数 `const code = generate(ast, options)`
- 使用 key
  - 主要是为了更高效的对比虚拟 DOM 中某个节点是否相同
  - 源码中，判断节点相同是根据 key 以及元素类型
- diff 算法 O(n)
  - 只进行同层比较
  - 最小量更新，key 是节点的唯一标识，告知 diff 更改前后它们是同一 DOM
  - 只有同一虚拟节点才会精细化比较，否则暴力删除插入

## 响应式 异步

### MVVM

**概念**：model-view-view-model，分别为数据模型层，视图层以及两者的桥梁。数据绑定到 viewModel 层并自动渲染到页面中，视图	变化通知 viewModel 层更新数据

### new Vue() 做了什么

- 创建了 vue 实例，内部执行了根实例的初始化过程
- 具体包括
  - 选项合并
  - $children，$refs，$slots，$createElement 等实例属性和方法初始化
  - 自定义事件处理
  - 数据响应式处理
  - 生命周期钩子调用
  - 进行挂载
- 总结：new Vue() 创建了根实例并准备好数据和方法，执行挂载时，此过程会递归的应用于它的子组件上，形成有密切关系的组件实例树

### 数据响应式原理

>  vue2 的数据响应式根据是采用数据劫持结合发布者-订阅者模式的方式，对不同数据类型处理，对象采用 Object.defineProperty() 进行数据劫持，数组则扩展了它的 7 个变更方法，当数据被访问或变化时，我们就感知并且响应

1. 需要 observe 的数据对象进行递归遍历，包括子属性对象的属性，都加上 setter 和 getter 这样的话，给这个对象的某个值赋值，就会触发 setter，那么就能监听到了数据变化
2. compile 解析模板指令，将模板中的变量替换成数据，然后初始化渲染页面视图。并将每个指令对应的节点绑定更新函数，添加监听数据的订阅者，一旦数据有变动，收到通知，更新视图
3. Watcher 订阅者是 Observer 和 Compile 之间通信的桥梁，主要做的事情是:
   - 在自身实例化时往属性订阅器(dep)里面添加自己
   - 自身必须有一个 update()方法
   - 待属性变动 dep.notify()通知时，能调用自身的 update() 方法，并触发 Compile 中绑定的回调，则功成身退。
4. MVVM 作为数据绑定的入口，整合 Observer、Compile 和 Watcher 三者，通过 Observer 来监听自己的 model 数据变化，通过 Compile 来解析编译模板指令，最终利用 Watcher 搭起 Observer 和 Compile 之间的通信桥梁，达到数据变化 -> 视图更新；视图交互变化(input) -> 数据 model 变更的双向绑定效果。

### computed 实现

1. 当组件初始化的时候， computed 和 data 会分别建⽴各⾃的响应系统， Observer 遍历 data
中每个属性设置 get/set 数据拦截
2. 初始化 computed 会调⽤ initComputed 函数
   1. 注册⼀个 watcher 实例，并在内实例化⼀个 Dep 消息订阅器⽤作后续收集依赖（⽐如渲染函数的 watcher 或者其他观察该计算属性变化的 watcher ）
   2. 调⽤计算属性时会触发其 Object.defineProperty 的 get 访问器函数
   3. 调⽤ watcher.depend() ⽅法向⾃身的消息订阅器 dep 的 subs 中添加其他属性的
       watcher
   4. 调⽤ watcher 的 evaluate ⽅法（进⽽调⽤ watcher 的 get ⽅法）让⾃身成为其他
       watcher 的消息订阅器的订阅者，⾸先将 watcher 赋给 Dep.target ，然后执⾏ getter
       求值函数，当访问求值函数⾥⾯的属性（⽐如来⾃ data 、 props 或其他 computed ）时，
       会同样触发它们的 get 访问器函数从⽽将该计算属性的 watcher 添加到求值函数中属性的
       watcher 的消息订阅器 dep 中，当这些操作完成，最后关闭 Dep.target 赋为 null 并
       返回求值函数结果。
3. 当某个属性发⽣变化，触发 set 拦截函数，然后调⽤⾃身消息订阅器 dep 的 notify ⽅法，遍
历当前 dep 中保存着所有订阅者 wathcer 的 subs 数组，并逐个调⽤ watcher 的 update ⽅
法，完成响应更新

### nextTick

- Vue 在更新 DOM 时异步执行，只要侦听到数据变化，Vue 将开启一个队列，并且缓冲在同一事件循环的数据变更。
- 而 nextTick 会在队列加一个回调，确保该函数在 DOM 操作完成后调用
- nextTick 的实现是在 callbacks 里面加入传入的函数，然后用 timerFunc 异步方式调用，首选方法是 Promise。

### Vue 的异步渲染

**过程**

1. 数据变动后，`setter`函数中的`dep.notify()`通知`watcher`更新
3. `queueWatcher`将`watcher`去重，放入队列
4. 使用 nextTick 方法添加`flushSchedulerQueue)`回调，它被加入 callbacks 数组
5. 异步启动 timerFunc，依次 Promise、MutationObserve、setImmediate，最后不行，使用 setTimeout(fn, 0)
5. timeFunc 用 Promise.then 向队列添加 flushCallbacks, 它遍历 callbacks，执行所有回调
6. 回调中有 flushSchedulerQueue，它执行所有 watcher 的 run 方法，使组件更新

**vue 同步渲染**

- Vue.config.async = false
- this._watcher.sync = true

**优点**

- 节省打包结果，用 jsonp 方式加载，解决文件过大问题
- 依赖import()函数，实现文件分割加载

## 组件

### 组件的创建

- 使用 Vue.extend 来创建全局 Vue 组件

  ```javascript
  var coml = Vue.extend({
      template:'<h3>这是使用Vue.extend 创建的组件</h3>'
  })
  
  Vue.component('myComl', coml)
  <my-coml><my-coml/>
  ```

- Vue.component 创建组件

  ```javascript
  Vue.component('mycom2', {
      template:'<div>
   		<h3>
      		这是直接使用Vue.component 创建出来的组件
   		</h3>
  	</div>'
  })
  ```

- template 创建组件

  ```javascript
  <template id='tmp1'>
  	<div>
  		 <h1>
   			这里通过template元素,在外部定义的组件结构,这个方式,有代码的智能提示和高量
  		 </h1> 
  	</div>
  </template>
  
  Vue.component('mycom3', {
      template:'#tmp1'
  })
  ```

- 私有组件 component

  ```javascript
  <template id='temp2'>
   	<h1>这是私有login组件</h1>
  </template>
  
  component:{
      login:{
          template:'temp2'
      }
  }
  ```

### 组件通信

- 父子间通信：props 传递属性，v-on传递方法，$emit 触发事件

- $emit  / $on

  ```javascript
  Vue.prototype.$bus = new Vue()
  this.$bus.$emit('foo',value)
  this.$bus.$on('foo',(value)=>{})
  ```

- provide 与 inject：父组件 provide 注册，子组件 inject 调用

- $attrs：父组件绑定的非 props 属性；$listeners：父组件中 v-on 事件监听器(不含.native)

  - 通过 v-bind="$attrs" v-on="$listeners" 传入内部组件

- $root $parent / $children 与 ref：直接访问实例

- Vuex

### 组件渲染和更新过程

- 渲染：通过`Vue.extend()`方法构建子组件的构造函数并实例化，最后调用`$mount()`挂载
- 更新：进行`patchVnode`流程，核心为 diff 算法

### keep-alive

- 概念：包裹动态组件时，缓存不活动的组件，自身不会渲染 DOM，也不出现在父组件链中
- 作用：组件切换时将状态保留在内存中，防止重复渲染 DOM，减少加载时间及性能消耗
- 原理
  - 在 created 函数调用时将需要缓存的 VNode 节点保存在 this.cache 中
  - 在 render 时，如果 VNode 的 name 符合缓存条件，从 this.cache 取出缓存的实例渲染
  - props：include、exclude、max
- 生命周期函数：activated、deactived

### 组件的扩展

**插槽与作用域插槽**

- 普通插槽

  ```javascript
  父<div slot="footer">vue</div>
  子<slot name="header"></slot>
  ```
  
- 作用域插槽

  ```javascript
  父<div slot-scope="msg" slot="footer">{{msg.a}}</div>
  子<slot name="footer" a="1" b="2"></slot>
  ```

**vue.mixin 混入**

- 分发 Vue 组件的可复用功能
- 组件和混入对象同名，数据对象都以组件的为先
- 混入对象的钩子在组件自身钩子之前调用

- 全局：`Vue.mixin(component)` 局部 ：`mixins: [component]`

**extends**

- 仅作用于当前组件，且只能扩展单个对象
- 优先级高于混入
- `extend: component`

**composition( vue3 )**

```javascript
// 复用逻辑
function useXX(){}
function useYY(){}
// 逻辑组合
const Comp = {
    setup(){
        const {xx} = useXX()
        const {yy} = useYY()
        return {xx, yy}
    }
}
```

## Vue-router

1. **路由模式**

   + hash 模式（默认）

     + hash 值只是客户端的一种状态，发送请求时 hash 部分不会发出

     + hash 值的改变加一个记录到访问历史，可以通过回退前进控制切换

     + 使用 hashchange 可以监听 hash 变化

       `<a href="#search"></a>   location.hash="#search"`

   + history 模式：router 中加上`mode:'history'`

     + 使用 popstate 监听 url 变化
     + 刷新时，会返回 404，需要重定向

     ```javascript
     window.histort.pushState(null, null, path) // 标题传 null
     window.histort.replaceState(null, null, path)
     // 这两个事件不触发 popstate
     ```

2. **导入路由**

   ```javascript
   // router.js
   import Vue from 'vue'
   import VueRouter from 'vue-router'
   Vue.use(VueRouter)
   import page1 from '...'
   const routes = [
       {path: '/page1', component: page1}
   ]
   const router = new VueRouter({
       routes
   })
   export default router
   // main.js
   ...
   import router from './router.js'
   ...
   new Vue({
       el: '#app',
       router, // 注入实例中
       components: { App },
       template: '<App/>'
   })
   // App.vue
   <div>
       <router-link to="..."></>
   </div>
   <router-view></router-view>
   
   // router-link 使用 active-class
   1. <router-link ... active-class="active"></>
   2. export default new Router({ linkActiveClass: 'active' })
   // router-link 默认阻止 click 事件，需要使用 @click.native
   ```

3. **重定向、别名（link 的 to 属性不认）、精确匹配**

   ```javascript
   { path: '/a', redirect: '/b', alias: '/c'}
   { path: '/a', redirect: to => {
       // 接收 目标路由为参数 
       return '/home'
   }}
   <router-link to="/" exact></>
   ```

4. **嵌套路由**：children 中的 path 属性 只设置当前路径，path 空即为默认值

5. **命名路由**：name 属性，link 的 to 属性设置必须为完全路径，用 name 更简便，此时用 query 查询

   ```javascript
   { path: '/user/:userId', name: 'user', component: User }
   <router-link :to="{ name: 'user', params: {userId: 123}}"></>
   router.push({ name: 'user', params: {userId: 123}})
   ```

6. **命名视图**：router-view 默认 default

   ```javascript
   <router-view class="view one"></>
   <router-view class="view two" name="a"></>
   routes:[
       {
           path: '/',
       	component: {
               default: Foo,
               a: Bar
           }
       }
   ]
   ```

7. **动态路径**

   - 使用 (this.)$route.params 可以获得参数值

   - 可以设置多段路径参数

   - $route.query、$route.hash、$route.name

   - 使用 watch 观察 $route 对象（无法调用钩子）

   - 路径后加 ？ 表示可以匹配子路径---查询字符串

     `<router-link to="?info=share" exact>分享</router-link>`

8. **编程式导航**
   - router.push(location)
   - router.replace(location)
   - router.go(n) `前进或推后 n 步，记录不够用静默失败`

9. **导航钩子**
   - 全局导航钩子
     - router.beforeEach
     - router.beforeResolve
       - 所有组件内守卫和异步路由组件被解析之后
     - router.afterEach
       - 一般用于恢复滚动条
   - 组件内钩子
     - beforeRouteEnter
       - 不能访问实例 this
     - beforeRouteUpdate
       - 组件被复用时调用
     - beforeRouteLeave
   - 单独路由独享组件
     - beforeEnter：可以直接在配置定义

10. **懒加载**

    ```javascript
    1. vue 异步组件技术
    {path:'./home', name: 'Home',component: reslove => require(['@/components/Login'], resolve)}
    
    2. import // 注释代表会合并打包成一个 js 文件
    const Foo = ()=>import(/*webpackChunkName:'group-foo'*/ './foo.vue')
    const Bar = ()=>import(/*webpackChunkName:'group-foo'*/ './Bar.vue')
    
    3. require.ensure() // demo 相同就打包成一个 js
    {path:'./home', name: 'Home',component: 
    	reslove => require.ensure([],()=> resolve(require('@/components/Login')), 'demo')}
    ```

11. **单页面优缺点**

    **优点**

    - 用户体验好，快，内容的改变不用加载整个页面，服务器压力小
    - 更多的采用组件化的思想，代码结构和组织方式更加规范化，便于修改调整
    - 前后端分离

    **缺点**

    - 数据在前端加载，不利于 SEO
    - 首次加载时，需要大量的静态资源，时间长
    - 页面导航不可用，自建堆栈管理

## Vuex

> Vuex 是 vue 专有的状态管理库，以全局方式管理应用的状态，可以保证状态变更的可预测性

- state：存放状态

- mutations：state 成员操作

  - 形参：state、挂载参数

  - 增删成员

    ```javascript
    Vue.set(state. 'age', 15)
    Vue.delete(state, 'age')
    ```

- getters：加工 state 成员

  - 形参：state、getters（对象本身）

- actions：异步操作

  - 形参：context（上下文），挂载参数

    ```javascript
    actions: {
        aEdit(context, payload) {
            // return new Promise((reslove, reject) => {})
            setTimeout(() => {
                context.commit('edit', payload) // this.$store.dispatch('')
                // resolve()
            }, 2000)
        }
    }
    
    this.$store.dispatch('aEdit', {age: 15})
    ```

- modules：模块化状态管理

  ```javascript
  models: {
      a: {  // 调用 this.$store.state.a
          state: {key: 5},
          mutations: {
              ediKey(state) { // 自身 state
                  state.key = 9
              }
          },
          getters: {
              getKeyCount(state, getter, rootState) { // 自身状态，根节点状态
                  return rootState.key + state.key
              }
          },
          actions: {
              aEidKey(context) {
                  if(context.state.key === context.rootState.key) {
                      context.commit('editKey')
                  }
              }
          }
      }
  }
  ```

## 性能优化

- 编码优化
  - keep-alive 缓存页面
  - key 保证唯一性
  - 使用 v-show 复用 DOM
  - 路由懒加载
  - 子组件分割
  - 防抖节流
  - 事件代理
- Vue 加载性能优化
  - 按需导入第三方模块（babel-plugin-component）
  - 图片懒加载 `<img v-lazy="/src">`
- 用户体验
  - app-skeleton 骨架屏
  - pwa
- SEO 优化
  - 服务端渲染 SSR
  - 预渲染

### vue-loader

vue-loader 是解析`.vue`文件的一个加载器，将`template/js/style`转换成`javascript`模块；通过 vue-loader，JS 可以写 ES6 语法，可以应用 scss 或 less，template 可以添加 jade 语法

## Vue 3.0

### Proxy & defineProperty

- 为什么代替

  - 无法监控数组下标变化与对象值的变化
    - `Vue.set(vm, obj, 'e', 0)`
    - `this.$set(this, obj, 'e', 0)`
    - `this.obj = Object.assign({}, this.obj, {a: 1, e: 2})`
    - 数组：`target.splice(key, 1, val)`
  - 只能劫持属性，所以对每个属性进行遍历，劫持完整对象更优

- Proxy 实现输入框的双向绑定

  ```javascript
  const obj = {}
  const input = document.getElementById("input")
  const title = document.getElementById("title")
  const newObj = new Proxy(obj, {
      get: function(target, key, receiver) {
          return Reflect.get(target, key, receiver)
      },
      set: function(target, key, value, receiver) {
          if(key === "text") {
              input.value = value
              title.innerHTML = value
          }
          return Reflext.set(target, key, value, receiver)
      }
  })
  input.addEventListener('keyup', function(e) {
      newObj.text = e.target.value
  })
  ```

  

### axios

- 从浏览器中创建 XMLHttpRequest
- node.js 创建 http 请求
- 支持 Promise API
- 拦截请求和响应
- 转换请求数据和响应数据
- 取消请求
- 自动换成json
- axios中的发送字段的参数是data跟params两个，两者的区别在于params是跟请求地址一起发送的，data的作为一个请求体进行发送
- params一般适用于get请求，data一般适用于post put 请求。

### 封装 Vue





the-super-tiny-compiler 200 行代码实现小型 vue