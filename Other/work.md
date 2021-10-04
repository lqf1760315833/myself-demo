### .browserslistrc

**可以配置在 package.json 中** "browserslist": []

>`> 5%` 基于全球使用率统计而选择的浏览器版本 5% in US / alt-AS / in my stats 
>
>`cover 99.5%` 使用率总和为 99.5% 的浏览器版本，前提是浏览器提供使用覆盖率
>
>`maintained node versions` 所有还被 node 基金会维护的 node 版本
>
>`node 10 and node 10.4` node 10.x.x 或者 10.4.x 版本
>
>`current node` 当前被 browserslistrc 使用的版本
>
>`last 2 versions` 每个浏览器最近的两个版本
>
>`dead` 通过`last 2 versions`筛选的浏览器版本中，全球使用率低于0.5%并且官方声明不在维护或者事实上已经两年没有再更新的版本。目前符合条件的有 `IE10`,`IE_Mob 10`,`BlackBerry 10`,`BlackBerry 7`,`OperaMobile 12.1`
>
>`defaults`：默认配置`> 0.5%, last 2 versions, Firefox ESR, not dead`

### .eslintrc.js

>**创建文件**：
>
>`./noee_modules/.bin/eslint --init`，支持js，yaml，yal，json
>
>在 `package.json` 创建 `eslintConfig` 属性，`.eslintrc.js` 优先
>
>**选项说明**
>
>`"root": true` 默认情况一直往上查找配置文件直到根，增加选项后停止在父级寻找
>
>`"parserOptions"` 解析器选项
>
>- "parser"："babel-eslint", // 默认使用 Espree
>- "ecmaVersion": 6, // 支持 ES6，但是不代表支持新的 ES6 全局变量等
>- "sourceType": "module", // 指定来源的类型，"script"(默认) 或 "module"(ECMAScript 模块)
>- "ecmaFeatures" // 使用额外的语言特性
>   - "jsx": true, // 启用JSX
>   - "globalReturn": true, // 允许全局使用 return
>   - "impliedStrict": true, // 启用全局 strict mode
>   - "experimentalObjectRestSpread": true, // 启用全局性的 object rest
>
>`"env"` 指定想要启动的环境
>
>- es6: true,
>- node: true,
>- brower: true, // 浏览器全局变量
>- jquery: true
>
>`"globals"`
>
>- template: false,
>- _util: false
>
>`"plugins"` 加载插件
>
>`"extends": "eslint: recommended"`从基础配置中继承已启用的规则
>
>`"rules"` 
>
>- `"off/0"` 关闭规则
>- `"warn/1"` 开启规则，警告级别
>- `"error/2"` 开启规则，错误级别，程序会推出



`require.context(directory{string}, useSubdirectories{boolean}, regExp(RegExp))`

`require.context('./test', false,/.test.js$/) 遍历 test 文件夹下的所有 .test.js 文件，不遍历子目录`

