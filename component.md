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