### 数组方法

- 改变原数组的方法：pop、push、reverse、shift、sort、splice、unshift，以及两个ES6新增的方法copyWithin 和 fill；
- 不改变原数组：concat、join、slice、toString、toLocaleString、indexOf、lastIndexOf、includes、toSource；
- 循环遍历：forEach、every、some、filter、map、reduce、reduceRight 以及ES6新增的方法entries、find、findIndex、keys、values。

### 字符串方法

- indexOf、lastIndexOf、search、charAt、charCodeAt、charFromCode、replace、trim、split、slice、substring、substr、toUpperCase、concat


### 数组去重

1. Set去重: Arrary.from(new Set(arr))；[…new Set(arr)]

2. for+for+splice：if(arr[i]==arr[j]){ arr.splice(j,1); j--;}

3. 新建空数组加indexOf：if (array .indexOf(arr[i]) === -1) { array .push(arr[i])}

4. sort加相邻元素对比是否相等

5. 新建数组加includes，类似于indexOf

6. filter：arr.filter(function(item, index, arr) {return arr.indexOf(item, 0) === index;

7. hasOwnProperty

8. 递归去重

9. Map去重

10. reduce+includes：arr.reduce((prev,cur) => prev.includes(cur) ? prev : [...prev,cur],[])

### 判断数据类型

object.prototype.toString.call(…)

instanceof

typeof

constructor

（数组）isArray

### Map（parseInt）

parseInt(string[, radix])    array.map(function callback(currentValue[, index[, array]]){}[, thisArg]) arr.map(parseInt)

### JSONP优缺点

**优点**

- 跨越同源策略
- 兼容性好
- 可以调用 callback 回传结果

**缺点**

- 只支持 GET
- 只支持跨域 HTTP 请求，不能解决不同域页面间 JS 的调用
- 调用失败不会返回状态码
- 安全性不高

### 内存泄漏

- 意外的全局变量
- 闭包
- 没有清理的 DOM 元素引用
- 被遗忘的定时器或者回调
- 子元素存在引起的内存泄漏

### 垃圾回收技术

1.标记清除（多）

垃圾收集器在运行的时候会给存储在内存中的所有变量都加上标记（可以使用任何标记方式）。然后，它会去掉环境中的变量以及被环境中的变量引用的变量的标记。而在此之后再被加上标记的变量将被视为准备删除的变量，原因是环境中的变量已经无法访问到这些变量了。最后，垃圾收集器完成内存清除工作，销毁那些带标记的值并回收它们所占用的内存空间。

2.引用计数

引用计数（reference counting）的含义是跟踪记录每个值被引用的次数。当声明了一个变量并将一个引用类型值赋给该变量时，则这个值的引用次数就是1。如果同一个值又被赋给另一个变量，则该值的引用次数加1。相反，如果包含对这个值引用的变量又取得了另外一个值，则这个值的引用次数减1。当这个值的引用次数变成0 时，则说明没有办法再访问这个值了，因而就可以将其占用的内存空间回收回来。这样，当垃圾收集器下次再运行时，它就会释放那些引用次数为零的值所占用的内存。

导致问题：会导致循环引用的变量和函数无法回收。

解决：将用完的函数或者变量置为null

### ES5 和 ES6 继承区别

ES5的继承时通过prototype或构造函数机制来实现。ES5的继承实质上是先创建子类的实例对象，然后再将父类的方法添加到this上（Parent.apply(this)）。

ES6的继承机制完全不同，实质上是先创建父类的实例对象this（所以必须先调用父类的super()方法），然后再用子类的构造函数修改this。

具体的：ES6通过class关键字定义类，里面有构造方法，类之间通过extends关键字实现继承。子类必须在constructor方法中调用super方法，否则新建实例报错。因为子类没有自己的this对象，而是继承了父类的this对象，然后对其进行加工。如果不调用super方法，子类得不到this对象。

ps：super关键字指代父类的实例，即父类的this对象。在子类构造函数中，调用super后，才可使用this关键字，否则报错。



### ES6 class 特性

所有方法不可枚举

内部严格模式，也无法重写类名

必须用new调用（内部方法不能用new）

声明提升但是不赋值，有暂时性死区



### 复杂函数-->字符串

- 调用 valueOf，如果仍是复杂数据类型，调用 toString





### 普通函数和构造函数

1.调用方式 直接调用和new

2.调用时，构造函数内部会创建新对象

3.构造函数内部的this指向实例，普通指向调用函数的对象

4.构造返回值是对象（实例），普通函数看return

5.构造函数的函数名和类名相同



### 正则

- 去除所有字符串空格：`str.replace(/\s*/g, "")`
- 去除两头空格：`str.replace(/^\s*|\s*$/g,"")`



### ES6 新特性



### 对象方法

- 定义与获取属性
  - defineProperty（三个参数）defineProperties（两个）
  - 
- 遍历：keys，values，entries（可枚举）
- Object.fromEntries()从可迭代的[key, value]对中返回一个新对象。（这是的反向 Object.entries）。





Object.assign()将所有可枚举的自身属性的值从一个或多个源对象复制到目标对象。

Object.create()用指定的原型对象和属性创建一个新对象。



Object.getPrototypeOf()返回prototype指定对象的。

Object.setPrototypeOf()设置对象的原型（其内部[[Prototype]]属性）。

Object.getOwnPropertyDescriptor()返回对象的命名属性的属性描述符。

Object.getOwnPropertyDescriptors()返回一个包含对象自身所有属性描述符的对象。

Object.getOwnPropertyNames()返回一个数组，其中包含给定对象自己的所有可枚举和不可枚举属性的名称。

Object.getOwnPropertySymbols()返回直接在给定对象上找到的所有符号属性的数组。



isPrototypeOf

hasOwnProperty是否......

Object.is()比较两个值是否相同。求所有NaN值（不同于“抽象相等比较”和“严格相等比较”）。



Object.isFrozen()确定对象是否冻结。

Object.isSealed()确定对象是否密封。

Object.freeze()冻结对象。其他代码无法删除或更改其属性。

Object.seal()防止其他代码删除对象的属性。

Object.isExtensible()确定是否允许扩展对象。

Object.preventExtensions()防止对象的任何扩展。