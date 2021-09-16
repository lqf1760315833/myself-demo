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