## CSS

### Flex

​	**容器上**

- flex-direction：row、column---reverse
- flex-wrap：nowrap、wrap、wrap-reverse
- flex-flow：前两者的简写
- justify-content：flex-start-end、space-between-around、center
- align-items：flex-start-end、center、baseline(文字基线)、stretch(撑满容器)
- align-content（多轴线）：flex-start-end、space-between-around、stretch、center

​	**项目上**

- order：项目的排列顺序，越小越靠前
- flex-grow：放大，默认0
- flex- shrink：缩小，默认1，空间不足缩小
- flex-basis：定义了在分配多余空间之前，项目占据的主轴空间，默认 auto
- flex：1 === flex：1 1 任意数字 + 任意长度单位

- align-self：允许单个项目有不一样的对齐方式

### 水平垂直居中

- text-align + line-height
- absolute + 负 margin
- absolute + margin:auto
- absolute + calc
- absolute + transform
- flex
- `display:table-cell;vertical:middle;text-align:center`+`display:inline-block`

### 常见布局

​	**两栏**

- float + overflow（BFC 原理）
- float + margin
- flex
- grid

​	**三栏**

- 圣杯布局

- 双飞翼布局

- flex

- float + overflow（左右 float）

- grid

  ```javascript
  display:grid;
  grid-template-columns:200px auto 200px;
  ```

### 文本超出省略

- 字符超出部分换行： `overflow-wrap: break-word`

- 字符超出部分连字符：`hyphens:auto`

- 单行文本超出省略

  ```javascript
  white-space:nowrap;
  overflow:hidden;
  text-overflow:ellipsis;
  ```

- 多行文本超出省略

  ```javascript
  overflow:hidden;
  text-overflow:ellipsis;
  display:-webkit-box;
  -webkit-line-clamp:2;
  -webkit-box-orient:vertical;
  ```

### BFC

- 创建
  - 根元素：html
  - 非溢出的可见元素：overflow 不为 visible
  - 浮动：float 不为 none
  - 定位：position 为 absolute 或 fixed
  - 定义成块级的非块级元素：display：inline-block/flex/inline-flex/grid/table-cell
- 渲染规则
  - 内部盒子垂直放置
  - 同一个 BFC 相邻盒子的 margin 会重叠
  - BFC 区域不与 float 盒子重叠
  - 计算高度时，浮动元素也参与计算
- 应用场景
  - 自适应两栏布局：左侧 float，右侧 BFC
  - 防止 margin 合并：使元素不再同一 BFC 中
  - 清除内部浮动

### 清除浮动

- 父元素 BFC：overflow 设置为 hidden、auto
- 空 div，伪元素，浮动元素后面的元素 加上clear:both

### 移动端 1px 解决方案

1. border:0.5px solid #E5E5E5 仅限IOS端

2. border-image

3. box-shadow

4. 使用伪元素：绝对定位，长宽两倍，再进行 scale(0.5) 缩放

   ```css
   ::after {
       content: '';
       position:absolute;
       top: 0; left: 0;
       width: 200%; height: 200%;
       border: 1px solid #000;
       transform: scale(0.5);
   }
   ```

5. 设置 viewport 的 scale 值，使用 DOM 修改 content 属性

   - 可用该方法画 0.5px 的线（也可以用 transform:scale(0.5,0.5)

   ```javascript
   <meta name="viewport" id="WebViewport" 
         content="initial-scale=1, maximum-scale=1, minimum-scale=1, user-scalable=no">
   ```

### 命名冲突

- 命名约定

- CSS in JS

- CSS Modules

  - webpack--css-loader 和 postcss--postcss-modules

  ```javascript
  module: {
    loaders: [
      {
        test: /\.css$/,
        loader: "style-loader!css-loader?modules&localIdentName=[path][name]---[local]---[hash:base64:5]"
      },
    ]
  }
  ```

  

- HTML5 的 style scoped 解决部分，缺陷很多

### Sass 的优点

- 嵌套

- 变量

- 数学函数

- 混合宏：统一编写大段重复的样式

  ```javascript
  @mixin border-radius{
      -webkit-border-radius: 5px;
      border-radius: 5px;
  }
  // 调用
  button {    @include border-radius;}
  ```

### 父元素内创建正方形

​	**padding-top：100%**

### @ 规则

- @import：告诉 css 引擎引入一个外部样式表
  - 从属关系：link 是 html 标签，还能导入图片等，还可以定义 RSS、rel 连接属性，后者只导入 css
  - 加载顺序：link 导入样式同时加载，后者等页面加载完加载
  - 兼容性：link 无问题，后者不兼容 ie5 以下
  - 权重：link 权重高于后者
  - DOM 可控性：可以通过 js 操作 DOM 动态引入样式表改变样式，后者不行
- @media：`@media (min-height: 680px), screen and (orientation: portrait) {}`
- @keyframes：描述 css 动画的关键帧
- @supports：查询特定的 css 是否生效，可以结合 not、and、or
- @namespace：告诉 css 引擎必须考虑 XML 命名空间
- @font-face：描述将下载的外部字体
- @document：文档样式表满足给定条件则生效
- @charset：使用的字符编码

### 优先级

- 10000：！important
- 01000：内联样式
- 00100：ID 选择器
- 00010：类选择器、伪类选择器、属性选择器
- 00001：元素选择器、伪元素选择器
- 00000：通配选择器、后代选择器、兄弟选择器

### 继承性

- 字体相关：`font-family`、`font-style`、`font-size`、`font-weight`
- 文本相关：`text-align`、`text-indent`、`text-decoration`、`text-shadow`、`letter-spacing`、`word-spacing`、`white-space`、`line-height`、`color`
- 列表相关：`list-style`、`list-style-image`、`list-style-type`、`list-style-position`
- 其他属性：`visibility`、`cursor`
- 控制继承行为
  - `inherit`：继承父元素
  - `initial`：应用属性默认值
  - `unset`：属性默认继承，取`inherit`，否则`initial`

### 值与单位

- 相关概念
  - 设备像素（Device pixels）：屏幕分辨率
  - 设备像素比（DPR）
    - 一个 css 像素等于几个物理像素
    - 通过 `window.devicePixelRatio`获取
  - 像素密度（DPI / PPI）
    - 像素密度 = 屏幕对角线像素尺寸 / 物理尺寸
  - 设备独立像素（DIP）--- 安卓
    - dip = px * 160 / dpi

- px
- em：相对于父元素
- rem：相对于根元素--多用于自适应网站或者 H5
- vh / vw：相对于视口 `100 vw = window.innerWidth`

### CSS Sprite

> 将多个小图片拼接到一个图片中，通过 background-position 和元素尺寸调

**优点**

- 减少 HTTP 请求数
- 更换风格方便，只需修改样式

**缺点**

- 图片合并麻烦
- 维护比较困难

### CSS3 新特性

- 颜色：新增RGBA、HSLA模式
- 文字阴影(text-shadow)
- 边框：border-radius，box-shadow
- 盒子模型：box-sizing
- 背景：background-size设置背景图片的尺寸，background-origin设置背景图片的原点，background-clip设置背景图片的裁剪区域，以“，”分隔可设置多背景，用于自适应布局
- 渐变：linear-gradient、radial-gradient
- 过渡：transition可实现动画
- 自定义动画
- 在CSS3中唯一引入的伪元素是::selection
- 多媒体查询、多栏布局
- border-image
- 2D转换：transform:translate(x,y)rotate(x,y)skew(x,y)scale(x,y)
- 3D转换

### 选择器

> 链接样式保持：link,visited,hover,active

- 属性选择器
  - `[attr]`：指定属性的元素；
  - `[attr=val]`：属性等于指定值的元素；
  - `[attr*=val]`：属性包含指定值的元素；
  - `[attr^=val]` ：属性以指定值开头的元素；
  - `[attr$=val]`：属性以指定值结尾的元素；
- 组合选择器
  - 相邻兄弟：A + B
  - 普通兄弟：A ~ B
  - 子选择器：A > B
  - 后代选择器：A  B
- 伪类（全加一个：）
  - 行为伪类
    - `:active`：鼠标激活的元素；
    - `:hover`： 鼠标悬浮的元素；
    - `::selection`：鼠标选中的元素；
  - 状态伪类
    - `:target`：当前锚点的元素；`:link`：未访问的链接元素；
    - `:visited`：已访问的链接元素；`:focus`：输入聚焦的表单元素；
    - `:required`：输入必填的表单元素；`:valid`：输入合法的表单元素；
    - `:invalid`：输入非法的表单元素；`:in-range`：输入范围以内的表单元素；
    - `:out-of-range`：输入范围以外的表单元素；`:checked`：选项选中的表单元素；
    - `:optional`：选项可选的表单元素；`:enabled`：事件启用的表单元素；
    - `:disabled`：事件禁用的表单元素；`:read-only`：只读的表单元素；
    - `:read-write`：可读可写的表单元素；`:blank`：输入为空的表单元素；
    - `:current()`：浏览中的元素；`:past()`：已浏览的元素；
    - `:future()`：未浏览的元素；
  - 结构伪类
    - `:root`：文档的根元素；`:empty`：无子元素的元素；
    - `:first-letter`：元素的首字母；`:first-line`：元素的首行；
    - `:nth-child(n)`：元素中指定顺序索引的元素；`:nth-last-child(n)`：元素中指定逆序索引的元素；；
    - `:first-child`：元素中为首的元素；`:last-child` ：元素中为尾的元素；
    - `:only-child`：父元素仅有该元素的元素；`:nth-of-type(n)`：标签中指定顺序索引的标签；
    - `:nth-last-of-type(n)`：标签中指定逆序索引的标签；`:first-of-type` ：标签中为首的标签；
    - `:last-of-type`：标签中为尾标签；`:only-of-type`：父元素仅有该标签的标签；
  - 条件伪类
    - `:lang()`：基于元素语言来匹配页面元素；
    - `:dir()`：匹配特定文字书写方向的元素；
    - `:has()`：匹配包含指定元素的元素；
    - `:is()`：匹配指定选择器列表里的元素；
    - `:not()`：用来匹配不符合一组选择器的元素；
- 伪元素`::before  ::after`

## HTML

### ！DOCTYPE

- BackCompat：怪异模式，浏览器自己的模式
- Css1Compat：标准模式，W3C标准

### meta 标签

- name：名称/值对中的名称。author、description、keywords、generator、revised、others。 把 content 属性关联到一个名称。
- http-equiv：没有name时，会采用这个属性的值。content-type、expires、refresh、set-cookie。把content属性关联到http头部
- content：名称/值对中的值，可以是任何有效的字符串。 始终要和 name 属性或http-equiv属性一起使用
- scheme：用于指定要用来翻译属性值的方案

### 浏览器内核

- Webket：Chrome、Safari
- Presto：Opera
- Gecko：FireFox
- Trident：IE、360

### HTML5 新特性

+ Canvas
+ video、audio
+ Webstorage
+ webworker、websocket、Geolocation
+ 表单控件：calendar、data、time
+ 新的语义化标签