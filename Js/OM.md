## Event

### 事件监听器

```javascript
addEventListener(type， listener[, options|useCapture)
// options可以为 boolean，默认 false 冒泡，true 为捕获 preventDefault
// 可以为对象: {capture:true;once: true执行一次;passive: true;阻止取消默认事件}
removeEventListener('click', fn)
```

### 事件对象

- Event 事件
  - e.target 事件触发的目标源元素，会变

  - e.currentTarget 事件绑定的元素

  - 事件委托（事件代理）

    ```javascript
    ul.addEventListener('click', function(e) {
        if (e.target.tagName == 'LI') {
            e.target.style.background = 'yellow'
        }
    })
    ```

  - mouseenter、mouseleave 不会在鼠标移动父子级切换过程中触发

    - mouseover、mouseout 会触发 mousemove 鼠标移动

  - e.stopPropagation()、e.cancelBubble=true 取消事件冒泡

  - e.clientX、e.clientY 鼠标相对显示区域位置

    - e.pageX、e.pageY 鼠标相对页面位置

- contextmenu 鼠标右键事件

- 键盘事件

  - keydown、keyup
  - e.keyCode 键码 e.key 键值
  - e.ctrlKey、e.altKey、e.shiftKey 是否按下

- 拖拽思路详解

  - mousedown、mousemove、mouseup

- 鼠标滚动事件

  - mousewheel、DOMMouseScroll
  - e.whlleDelta 和 e.detail 滚轮方向获取

- 其他常用事件

  - dblclick
  - blur、focus、change、input、submit、reset
  - 表单其他方法：blur()、focus()、select()

## DOM

### 节点类型

- 元素节点（标签名称）1   **nodeName、nodeType**
- 文本节点（#text）3
- 注释节点（#comment）8
- document（#document）9
- 文档声明（html）10

### DOM 关系

- childNodes 子节点
- parentNode 父亲节点 parentElement
- offsetNode 定位父级---元素根据定位的父级：absolute

- children 子元素 

- firstChild 第一个子节点  lastChild
- firstElementChild 第一个元素节点 lastElementChild
- nextSibling 下一个兄弟节点 previousSibling 上一个
- nextElementSibling 下一个兄弟元素 previousElementSibling

### 查找内容

- nodeList
  - childNodes 
  - querySelector(All)
- HTMLCollection
  - children
  - getElementsByTagName
  - getElementsByClassName
- 区别
  - nodeList 有 forEach 方法，但是 HTMLCollection没有
  - HTMLCollection 动态更新，querySelectorAll 没有

### DOM 属性操作

- el.attributes：元素所有属性集合，可以获得自定义属性
- el.getAttribute("")
- el.setAttribute("","val")
- el.removeAttribute("")
- el.hasAttribute("")

### ECMAScript 与 DOM 属性操作

- 前者内容存在内存中，可以存储各种属性类型

- 后者内容存在文档中，只能是字符串，强制转换

- 如果操作了 innerHtml 元素，所有子元素**内存**中事件和属性消失

- 自定义属性（data-）

  ```javascript
  <div data-kkb="hello"></>
  
  box.dataset.kkb // hello
  ```

### 节点操作

- 创建元素：ducument.createElement("tagname")

- 添加节点

  - parent.appendChild(node)
  - parent.insertBefore(newNode, oldNode)

- 替换节点：parent.replaceChild(newNode, oldNode) 返回值是被替换的节点

- 删除节点

  - node.remove()
  - parent.removeChild(node) 返回值为删掉的节点

- 克隆节点：node.cloneNode(deep)---deep 为 true 即为深拷贝，但是不拷贝事件

- 文档碎片（优化性能）：createDocumentFragment

  ```javascript
  let fragment = document.createDocumentFragment()
  for(let i = 0; i < 1000; i++) {
      let div = document.createElement("div")
      div.innerHTML = i
      fragment.appendChild(div) // box.appendChild(div) 性能较差
  }
  box.appendChild(fragment)
  ```

### 尺寸相关

```javascript
- offset
  - offsetWidth // 可视宽高 width + padding + border
  - offsetHeight
  - offsetTop // 元素距离定位父级左上角距离
  - offsetLeft
  - offsetParent
- client
  - clientWidth // width + padding
  - clientHeight
  - clientTop // 左/上边框宽度
  - clientLeft
- scroll
  - scrollHeight // 内容高宽度和 box 宽度的较大值
  - scrollWidth
  - scrollTop // 上下滚动条位置
  - scrollLeft // 左右滚动条位置
- getBoundingClientRect()
  - top // 元素顶部相对可视区顶部的距离
  - bottom // 顶部
  - left // 左侧
  - right // 左侧

```

## BOM 

### window

- innerHeight：可视区高度

- innerWidth

- open：打开新窗口

  - url
  - target：_blank，__self
  - specs 新窗口规格
  - replace

- close

- alert

- comfirm：带确定取消

- prompt（"title"，"content"）

- onscroll：监听滚动事件

- onresize：监听窗口大小发生改变

  ```javascript
  window.onload = function() {
      let banner = document.querySelector("#banner")
      let resizeBanner = () => {
          let l = (window.innerWidth -banner.offsetWidth)/2
          let t = (window.innerHeight -banner.offsetHeight)/2
         	let scrollL = document.body.scrollLeft || ducument.documentElement.scrollLeft
          let scrollT = document.body.scrollTop || ducument.documentElement.scrollTop
          // window.srcrollY--X--To(x,y)
          banner.style.left = l + scrollY + "px"
          banner.style.top = t + scrollT + "px"
      }
      resizeBanner()
      window.onresize = function() {
          banner.style.transition = "1s"
          resizeBanner()
      }
      window.onscroll = function() {
          banner.style.transition = "1s"
          reziseBanner()
      }
  }
  ```

### location

- host
- hostname：域名
- href：完整地址
- hash：# 后内容
- search：？ 后内容



