## React 基础

### 特点

- 虚拟 DOM
- 库的兼容性好
- 单向数据流，模块化
- 纯粹的 JS
- 同构的 JS：可以在服务器预渲染应用再发到客户端，从预渲染的静态内容中恢复记录。利于 SEO

### JSX

- 执行更快，因为它在编译为 JavaScript 代码后进行了优化
- 它是类型安全的，在编译过程中就能发现错误
- 编写模板更加简单快速
- 更加直观，可读性高

### 生命周期

- 组件挂载
  + constructor
    * 使用 React.createClass 创建组件
    * 会有 getDefaultProps、getInitialState（ES6 语法没有）
  + static getDerivedStateFromProps
    * 父组件重新渲染触发，是静态方法，没有 this，不能使用 setState，return 的对象相当于 setState 的参数
    - 常用于强制性的根据 props 设置 state
  - conponentWillMount：17 版本删除
  - render
  - componentDidMount---ajax请求生成 DOm
- 组件更新
  - static getDerivedStateFromProps
  - componentWillReceiveProps：17版本废除
  - shouldComponentUpdate：参数：nextProps、nextState；性能优化
  - render
  - getSnapshotBeforeUpdate：在最近一次渲染输出（提交到 DOM 节点）之前调用，返回值为下第三个参数
  - componentDidUpdate：preProps，preState，snapshot
- 组件销毁
  
  - componentWillUnmount：清除定时器，解绑事件，取消网络请求
- 错误处理
  - static getDerivedStateFromError
    - 子组件抛出错误后调用，错误作为参数，返回一个值更新state
  - componentDidCatch
- 强制刷新组件
  
  - forceUpdate：跳过 shouldComponentUpdate

### props vs state

|                          | props | state |
| ------------------------ | ----- | ----- |
| 从父组件获得初始值       | ✔     | ✔     |
| 被父组件改变             | ✔     | ✖     |
| 内部(当前)组件设置默认值 | ✔     | ✔     |
| 改变内部组件             | ✖     | ✔     |
| 为子组件设置初始值       | ✔     | ✔     |
| 改变子组件               | ✔     | ✖     |

### this.setState

- setState 在合成事件和钩子函数中“异步”，在原生事件和 setTimeout 同步

- 并不是内部由异步代码实现，本身执行中同步，只是合成事件和钩子函数的调用顺序在更新之前

- 更新优化建立在“异步”之上

- 可以传入状态计算函数

  ```javascript
  this.setState((prevState, props) => ({
      count: prevState.count + 1
  }))
  ```

### 调用 setState 发生了什么

- React 将传入的参数对象与组件当前的状态合并，然后触发调和过程
- 经过调和，React 以相对高效的方式根据新状态构建 React 树并开始着手渲染整个 UI 界面
- 在 React 得到元素树之后，React 自动计算节点差异，进行最小化渲染
- 在差异计算算法中，React 能够知道位置的改变情况，保证按需更新

### Fiber

**时间切片**

- 通过对象 记录组件上需要或者已经完成的更新，一个组件可以对应多个 Fiber
- 第一次渲染会创建一模一样的 Fiber 节点树
- 一个 React Element 可以对应不止一个 Fiber
  - 在 update 时，从原本的 Fiber( current ) clone 出一个新的 Fiber( alternate )
  - 两个 Fiber diff 出的变化记录在 alternate 上，更新结束它会取代 current 成为新 current
- 更新任务
  - Reconciliation Phase：Diff Fiber Tree，找出更新，就是一个计算阶段，结果可以缓存（打断）
  - Commit Phase：提交所有更新并渲染，不能打断（防止页面抖动）

### render 

返回一个 React 元素，是原生 DOM 组件的表示

### 事件注册原理

- 事件注册
- 事件存储

> 1. ReactDOM.render ->React.createElement -> 虚拟 DOM 树
>
> 2. 处理组件 props 是否为事件 -> 得到事件类型与回调函数
> 3. document 上注册对应的事件类型 -> 存储事件回调到 listenerBank 中

## 组件

### 组件创建方法

- 函数式组件：

  - 不能访问 this 对象
  - 不能访问生命周期方法

  ```javascript
  function myComponent(props) {
      return `Hello${props.name}`
  }
  ```

- React.createClass（ES5）

  ```javascript
  var myCreate = React.createClass({
      defaultProps:function(){},
      getInitialState:function(){},
      render:function(){}
  })
  ```

- ES6 Class

  ```javascript
  class HelloComponent extends React.Component {
      constructor(props) {
          super(props)
         	this.state = {
         		state_exam: props.exam
      	}
      	this.handleChange = this.handleChange.bind(this)     
      }
      handleChange() {this.setState({state_exam: 'hello'})}
      render(){ return ()}
  }
  ```

### 组件通讯

- 父 -> 子：props

- 子 -> 父：props 回调

- 跨级组件间通讯

  ```javascript
  static childContextTypes = { propA:PropTypes.string }
  getChildContext(){ rerurn { propA: 'propA' } }
  // 访问父组件 context 对象
  static contextTypes = { propA: PropTypes.string }
  <p>{ this.context.propA }</p>
  ```

- 非嵌套组件间通讯

  - 引入 Events 包中的 emitter
  - addListener 监听、removeListener 销毁、emit 发布

### 事件绑定方法

- 构造函数

  ```javascript
  constructor(props) { super(props) this.onClickList = this.onClickList.bind(this) }
  onClickList(){}
  render(){ return <div onClick={this.onClickList}}/>
  ```

- render 内部使用 bind

  ```javascript
  render(){ return <div onClick={this.onClickList.bind(this)}}/>
  ```

- 箭头函数

  ```javascript
  onClick = () => {}
  render(){ return <div onClick={this.onClickList}}/>
  ```

- render 内部使用箭头函数

  ```javascript
  render(){ return <div onClick={() => this.onClickList()}}/>
  ```

## Redux

- Store
  - 生成：`import {createStore} from 'redux'  const store = createStore(fn)`
  - View 发出 Action：`store.dispatch(actions)`
  - 监听 state：`store.subscribe(listener)`
    - 调用该函数返回的函数，就可以解除监听

- State：`store.getState()`

- Actions

  - Action Creator 可以发送多条

    ```javascript
    function addTodo(text) { return { type: ADD_TODO, text } }
    ```

- Reducer：接受 Action 和 State，返回新的 State，纯函数
  
- `createStore(reducer)`在 dispatch 方法会触发 Reducer 的自动执行
  
- 工作流程
  - 用户发出 Action
  - Store 自动调用 Reducer，返回新的 State
  - listener 通过 store.getState 得到当前状态，触发重新渲染 View

## React-router

```javascript
import { BrowserRouter,HashRouter,Route,Redirect,Switch,Link,NavLink,withRouter } from 'react-router-dom'
<Router>
	<NavLink to="/home" className="link">跳转Home</>
	<Switch> // true 为 replace, false 为 push
		<Route path="/home" component={Home} replace={true}/>
        <Route path="/about" component={About}/>
        <Redirect to="/home"/>
    </>
</Router>
```

- 路由传参

  - 动态路由：参数通过`props.match.params`---对象形式

  ```javascript
  <NavLink to="/home/张三/18" className="link">跳转Home页面</>
  <Route path="/home/:name/:age" component={Home} />
  ```

  + 以 ？ 开头传参：`props.location.search = ?name=张三&age=18`

  ```javascript
  <NavLink to="/home?name=张三&age=18" className="link">跳转</>
  <Route path="/home" component={Home} />
  ```

  + 对象形式编写 to,通过 state 传参：`props.location.state`---对象形式

  ```javascript
  <NavLink to={{pathname: "/home",state: {name:'张三',age:18}}} className="link">跳转</>
  <Route path="/home" component={Home} />
  ```

- 函数式路由---props.history.push('')

  + push、replace(不保存上个页面的记录)、goForward、goBack、go

- 普通组件使用路由

  ```javascript
  export default withRouter(App) // 进行包装处理
  ```

## React-hook

- useState

  `const [count, setCount] = useState(0)`

- useEffect

  + 使用 useEffect 调度的 effect 不会阻塞浏览器更新屏幕，异步执行
  + 返回一个函数的方法清除副作用
  
  + 第二个参数：判断是否需要更新，未变化即跳过
  
  ```javascript
  useEffect(() => {
      fuction handleStatusChange(status) {
          setIsOnline(status.isOnline)
      }
      ChatAPI.subscribeToFriendStatus(props.friend.id, handleStatusChange)
      return () => {
          ChatAPI.unsubscribeFromFriendStatus(props.friend.id, handleStatusChange)
      }
  }, [props.friend.id])
  ```

## 性能优化

- shouldComponentUpdate 判断
- 传参优化：父 -> 传递的对象在 render 提前定义，不然每次都产生新对象
- 添加 key
- 多组件优化：`React.component -> React.PureComponentUpdate / React.memo`
- 做分片打包：引入 React.Lazy 和 React.Suspense
- 使用 React.Fragment 或空标签：避免添加额外的 DOM 

### 函数组件性能优化

- React.Memo(Mycomponent, areEqual)
- useCallback
- useMemo

### React 懒加载

- 导入

  ```javascript
  const LazyPDFDocument = React.Lazy(() => import("./PDPreview"))
  ```

- 使用

  ```javascript
  this.state.showPDFPreview && (
  	<Suspense fallback={<div>Loading...</div>}
  		<LazyPDFDocument title={greeting} />
  	</Suspense>
  ) // showPDFPreview 为 true 时加载，解析中显示 fallback
  ```

## Vue 和 React 的区别

- 数据是不是可变
  - React 状态和逻辑通过参数传入，单向数据流
  - Vue 响应式，基于数据可变
- 处理方式
  - React 通过 js 来操作一切，jsx，jss，styled-component
  - Vue 用各自的处理方式
- 写法
  - React 使用类式的组件写法，api 很少
  - Vue 使用声明式的写法，传入各种 options，api 和参数很多--vue3.0改进
- 功能
  - React 很多都是社区做的
  - Vue 很多都是内置
- diff 算法
  - 更新 DOM 时
    - Vue diff 时，调用 patch 打补丁函数，一边比较一边给真实 DOM 打补丁
    - React 使用 diff 队列保存需要更新的 DOM，得到 patch 树，再统一操作批量更新
  - 对比节点：类型相同，className 不同
    - Vue 认为是不同类型，删除重新创建
    - React 是认为同类型节点，进行修改
  - 列表比对
    - Vue 的列表对比，采用从两端到中间，旧集合和新集合两端各有一指针，匹配上就按照新集合去调整旧集合，向中间移动
    - React 从左到右依次对比，利用元素的 index 和标识 lastIndex 比较，满足 index < lastIndex 就移动元素，删除和添加则各自按照规则调整
    - 当最后一个节点移动到最前：React 会依次向后移动，Vue 会把最后一个节点放在最前面

## 待解决

hook API

高阶组件，和继承的优劣区别

ref

Immutable

antd 按需加载

