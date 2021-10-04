## Webpack--模块打包器

> 打包原理：把项目当成一个整体，通过一个给定主文件，从主文件开始找到项目的所有依赖，使用 loaders 类处理，最后打包成一个或多个浏览器可识别的 js 文件

### 1. 安装

```javascript
npm init (-y)
npm install webpack webpack-cli --global // 全局安装
// npm i webpack -g
npm install webpack webpack-cli --save--dev // 安装本地项目模块
// npm i webpack webpack-cli -D // 查看版本 npx webpack -v
```

### 2. 简单打包

```javascript
// webpack 全局安装下
webpack src/index.js --o(utput) dist/bundle.js
// 把 src 文件夹下的 index.js 打包到 dist 文件夹下的 bundle.js

// 开发环境
// 使用
./node_modules/.bin/webpack (-v) // 打包 / 查看版本
"script": "webpack" // 自动定位到 /.bin文件夹
npx webpack
```

### 3. 通过配置文件打包

- 修改 webpack.config.js 

```javascript
// webpack.config.js
module.exports = {
    // 打包模式 production 生产环境 | development 开发环境 | none 无预置配置
    mode: 'development',
    entry: __dirname + "/src/index.js", // 入口文件
    output: {
        path: __dirname + "/dist", // 打包后文件存放位置
        filename: "bundle.js" // 打包后输出的文件名
    }
}

// 脚手架配置, 采用 node.js 的 path 模块
const path = require('path')
module.exports = {
    entry: path.join(__dirname + "/src/index.js"),
    output: {
        path: path.join(__dirname + "/dist"),
        filename: "bundle.js" // 打包后输出的文件名
    }
}
// 此时终端运行 webpack 命令,会自动引入 webpack.config.js 配置
```

- 修改 package.json

```javascript
"scripts": {
    "start": "webpack" // 此时运行 npm start 进行打包
}
```

### 4. 构建本地服务器

- webpack-dev-server 配置本地服务器

  安装：`cnpm i webpack-dev-server -D`

  ```javascript
  // webpack.config.js
  module.exports = {
      devServer: {
          contentBase: "./dist", // 本地服务器加载文件目录,扩展的虚拟路径
          port: "8088", // 端口号
          inline: true, // 文件修改后实时刷新
          historyApiFallback: true, // 不跳转
          open: true, // 自动打开浏览器
          proxy: {
              "/api": {
                  // 当匹配到 /api 会自动加上前缀并且重写
                  target: 'http://localhost:3000',
                  pathRewrite: {
                      '^/api': ''
                  }
              }
          }
      }
  }
  
  // package.json
  "scripts": {
      "build": "webpack", // npm run build
      // webpack serve 也可以
      "dev": "webpack-dev-server --open" // 启动服务器并自动打开浏览器
      
  }
  ```

- Source Maps 调试配置

  ```javascript
  // webpack.config.js
  module.exports = {
      devtool: 'source-map' // 生成对于调试的完整的 .map 文件，会减慢打包速度
  } 
  // 打包后在 dist 文件夹中存在 bundle.js.map 文件，出现 bug 时，浏览器调试工具中提示错误出现的位置
  ```

### 5. Loader（模块加载）

- 配置内容
  - test：匹配 loaders 所处理文理扩展名的正则（必须）
  - loader：名称（必须）
  - include / exclude：必须或不需要处理的文件（夹）
  - options：提供额外的设置选项

- 安装 loader

  ```javascript
  css: cnpm i style-loader css-loader -D
  sass: cnpm i sass-loader node-sass -D
  // .txt
  npm i raw-loader
  // 图片
  npm u file-loader
  ```

- 引入配置

  ```javascript
  // webpack.config.js
  module.exports = {
      // 使用自定义模块
      resolveLoader: {
          // 会寻找 node_modules 和 目录下 loaders 文件夹的模块
          modules: ['node_modules', path.join(__dirname, 'loaders')],
      }
      module: {
          rules: [
              {
                  test: /\.css$/, // 以 .css 结尾
                  use: ['style-loader', 
                       	{
                              loader: 'css-loader',
                              options: {
                                  // 是否处理 url
                              	url: true,
                              	// 是否处理 @import
                              	import: true,
                              	// 是否生成对应 sourcemap 文件
                              	sourceMap: false
                              }
                          }
                       ] // 顺序固定，调用Loader 从右到左编译
              },
              {
                  test: /\.(scss|sass)$/,
                  use: ['style-loader', 'css-loader', 'sass-loader']
              },
              {
                  test: /\.(gif|png|jpe?g)/,
                  use: {
                      // url-loader limit 属性，小于该值转换为 base64
                      loader: 'file-loader',
                      options: {
                          name: '[name]_[contenthash].[ext]',
                          // 打包后文件所在文件，目录相对于打包文件夹
                          outputPath: '/images',
                          // 打包后文件url，相对于当前配置文件
                          publicPath: '/dist/images'
                      }
                  }
              },
              {
                  test: /\.md$/,
                  loader: 'doc-loader' // 会找到loaders 下的 doc-loader文件夹
              }
          ]
      }
  }
  ```

### 6. Babel

- 安装

  ```javascript
  cnpm i babel-core babel-loader babel-preset-env babel-preset-react -D
  // 核心功能位于 babel-core, 解析 ES6， 解析 JSX
  // -env 表示对当前环境的预处理，-es2015 只能针对某个环境
  ```

- 引入配置

  ```javascript
  // webpack.config.js
  module.exports = {
      module: {
          rules: [
              {
                  test: /(\.jsx|\.js)$/,
                  use: {
                      loader: "babel-loader",
                      options: {
                          presets: ["env", "react"]
                      }
                  },
                  exclude: /node_modules/
              }
          ]
      }
  }
  ```

- 错误情况

  ```javascript
  // 官方默认 babel-loader 与 babel 版本需要一致
  // 1. 回退低版本
  cnpm i babel-loader@1 babel-core babel-preset-env -D
  // 2. 更新到最高版本
  cnpm i babel-loader @babel/core @babel/preset-env webpack -D
  ```

- 优化配置

  >  提取出babel，放在根目录下的 .babelrc 文件下，webpack 自动调用

### 7. Plugins（扩展功能）

- 使用：安装 + 引入 + 添加配置

- 版权声明插件

  ```javascript
  const webpack = require('webpack')
  
  module.exports = {
      plugins: [
          new webpack.BannerPlugin('版权所有，翻版必究')
      ]
  }
  ```

- 自动生成 html 文件

  ```javascript
  // 删除整个 dist 文件夹
  // 在 src 文件夹下新建 index.template.html(自定义)---可选
  // 安装
  cnpm i html-webpack-plugin -D
  // 引入
  const HtmlWebpackPlugin = require('html-webpack-plugin')
  
  module.exports = {
      plugins: [
          new HtmlWebpackPlugin({
              // 不用绝对路径的话，则相对于入口文件，可具体看错误信息
              template: path.join(__dirname, "/src/index.template.html"),
              // 文件路径和名称
              filename: 'index.html',
              // 可以使用模版字符串,在 template 的html中
              // <title><%=htmlWebpackPlugin.options.title%></title>
              title: 'webpack-demo'
          })
      ]
  }
  ```

- 清理 /dist 文件夹

  ```javascript
  cnpm i clean-webpack-plugin -D
  const CleanWebpackPlugin = require('clean-webpack-plugin')
  module.exports = {
      plugins: [
          new CleanWebpackPlugin(['dist']) 
      ]
  }
  ```

- 生成css文件

  ```javascript
  npm i mini-css-extract-plugin
  const MiniCssExtractPlugin = require('mini-css-extract-plugin')
  
  	module: {
      	rules: [
          	{
                  test: /\.s[ac]ss$/,
                  use: [
                      // 可以取代 style-loader
                      {
                          loader: MiniCssExtraPlugin.loader
                      },
                      'css-loader',
                      'sass-loader'
                  ]
              }
      	]  
      },
  	plugins: [
          new MiniCssExtracrPlugin({
              // 相对于 js 文件名称
              filename: '[name].css'
          })
      ]
  ```
  
  
  
- 热更新：修改代码后自动刷新预览效果

  ```javascript
  const webpack = require('webpack')
  module.exports = {
      devServer: {
          ...
          hot: true, // 热更新
          hotOnly: true, // 即时 HMR 不生效，也不去刷新整个页面（选择开启）
      }
      plugins: [
          new webpack.HotModuleReplacementPlugin() // 好像不用配置
      ]
  }
  
  // index.js
  // 当模块发生变化，根据规则进行对应更新
  if (module.hot) { // 如果开始 HMR
      module.hot.accept('', function(){})
  }
  ```

### 8. 项目优化及扩展

- 代码分离（模块化）

  - 新建 `webpack.common---dev---prod.js`公共配置，开发环境配置，生产环境（项目上线时的环境）配置

  + 安装合并模块插件 `cnpm i webpack-merge -D`

  ```javascript
  // webpack.common.js
  const path = require('path')
  const webpack = require('webpack')
  const HtmlWebpackPlugin = require('html-webpack-plugin')
  
  module.exports = {
      entry: 
      output: {},
      module: {
          rules: [
              
          ]
      },
      plugins: [
          new webpack.BannerPlugin('版权所有'),
          new HtmlWebpackPlugin({
              template: path.join(__dirname, "./...")
          }),
          new webpack.HotModuleReplacementPlugin()
      ]
  },
      
      
  // webpack.dev.js
  const merge = require('webpack-merge')
  const common = require('./webpack.common.js')
  
  module.exports = merge(common, {
      devServer: {
          ...
      }
  })
      
  // webpack.prod.js
  const merge = require('webpack-merge')
  const common = require('./webpack.common.js')
  const CleanWebpackPlugin = require('clean-webpack-plugin')
  
  module.exports = merge(common, {
      devtool: 'source-map',
      plugins: [
          new CleanWebpackPlugin(['dist'])
      ]
  })
  
  // package.json
  "scripts": {
      "build": "webpack --config webpack.prod.js",
      "dev": "webpack-dev-server --open --config wenpack.dev.js"
  }
  // webpack 命令默认指向 webpack.config.js 这个文件名称
  // --config 为指向新的文件
  // package.json 用于安装依赖
  // -D 为 --save--dev 指开发环境需要用到的依赖,记录在devDependencies 选项中
  // -S 为 --save 指生产环境也就是上线环境用到的依赖，记录在 dependencies 选项
  // -g 为 --global 安装全局命令
  ```

- 多入口多出口

  ```javascript
  module.exports = {
      entry: {
          index: path.join(__dirname + "./"),
          two: path.join(__dirname + "./")
      },
      output: {
          path: path.join(__dirname, "./dist"),
          filename: "[name].js"
      }
  }
  ```

- 增加 css 前缀

  ```javascript
  // 安装
  cnpm i postcss-loader antoprefixer -D
  // 新建 postcss.config.js 文件
  module.exports = {
      plugins: [
          require('autoprefixer')
      ]
  }
  // 修改 webpack.common.js 中的 css-loader 配置
  module: {
      rules: [
          {
              test: /\.css$/,
              use: [
                  {loader: 'style-loader'}, // 对象配置 loader 写法
                  {loader: 'css-loader'},
                  {loader: 'postcss-loader'}
              ]
          }
      ],
  }
  ```

- 分离 css

  ```javascript
  // 安装
  cnpm i extract-text-webpack-plugin@next -D // @next 安装最新
  // webpack.common.js 引入
  const ExtractTextPligin = require('...')
  module: {
  	rules: [
          {
              test: /\.css$/,
              use: ExtractTextPlugin.extract({ // 调用分离插件方法
                  fallback: 'style-loader', // 相当于回滚，经前两者处理的 css 最终经过 style-loader 处理
                  use: ['css-loader', 'postcss-loader']
              })
          }
      ],
      plugins: [
          new ExtractTextPlugin('css/index.css') // 将 css 分离到 /dist 文件夹下的 css 文件夹的 index.css
      ]
  }
  ```

- 消除冗余 css

  ```javascript
  // 安装
  cnpm i purifycss-webpack purify-css glod -D
  // webpack.prod.js 引入
  const PurifyCssWebpack = require('purifycss-webpack')
  const glod = require('glob')
  
  plugins: [
      new PurifyCssWebpack({
          paths: glob.sync(path.join(__dirname, 'src/*.html')) // 同步扫描所有 html 文件所引用的 css
      })
  ]
  ```

- 处理图片

  ```javascript
  // 安装
  cnpm i url-loader file-loader -D
  // webpack.common.js // 图片 url 为 ../images/coffee.png
  module: {
      rule: [
          {
              test: /\.css$/,
              use: ExtractTextPlugin.extract({
                  fallback: 'style-loader',
                  use: ['css-loader', 'postcss-loader'],
                  publicPath: '../' // 给图片设置公共路径
              })
          },
          {
              test: /\.(png|jpg|svg|gif)$/,
              use: [
                  {
                      loader: 'url-loader',
                      option: {
                          limit: 1000, // 限制只有小于 1kb 的图片才转为 base64
                          outputPath: 'images' // 打包后图片存放的文件夹名称
                      }
                  }
              ]
          }
      ]
  }
  ```

- 压缩代码

  ```javascript
  // 打包时自动压缩 js，而且运行服务器时，热更新很慢是因为修改后 webpack 自动打包，所以需要把开发环境和生产环境进行区分
  "scripts": {
      "build": "webpack --config webpack.prod.js --mode production",
      "dev": "webpack-dev-server --open --config webpack.dev.js --mode development"
  }
  ```

- Code Spliting

  ```javascript
  // dependOn + optimization 生成 runtime.js 文件
  entry: {
      index: {
          import: './index.js',
          dependOn: ['axios', 'a']
      },
      main: {
          import: './main.js',
  		dependOn: ['axios', 'a']
      },
      axios: 'axios',
  	a: './a.js'
  }
  
  optimization: {
      runtimeChunk: "single"
  }
  ```

  ```javascript
  // SplitChunkPlugin
  optimization: {
      splitChunks: {
          // async 只从异步加载的模块（动态加载import()）里面拆分
          // initial 只从入口文件进行拆分
          chunks: 'all' // 两者皆有
      }
  }
  
  // 默认配置
  optimization: {
    splitChunks: {
      chunks: 'async',
      minSize: 20000,
      minRemainingSize: 0,
      minChunks: 1,
      maxAsyncRequests: 30,
      maxInitialRequests: 30,
      enforceSizeThreshold: 50000,
      cacheGroups: {
        defaultVendors: {
          test: /[\\/]node_modules[\\/]/,
          priority: -10,
          reuseExistingChunk: true,
        },
        default: {
          minChunks: 2,
          priority: -20,
          reuseExistingChunk: true,
        },
      },
    },
  }
  ```

  ```javascript
  import(/* webpackChunkName: 'data', webpackPreload: true, 
  		webpackPrefetch: true */ './data.js').then(data => {
      console.log(data)
  })
  ```

  > 与 prefetch 指令相比，preload 指令有许多不同之处：
  >
  > - preload chunk 会在父 chunk 加载时，以并行方式开始加载。prefetch chunk 会在父 chunk 加载结束后开始加载。
  > - preload chunk 具有中等优先级，并立即下载。prefetch chunk 在浏览器闲置时下载。
  > - preload chunk 会在父 chunk 中立即请求，用于当下时刻。prefetch chunk 会用于未来的某个时刻。
  > - 浏览器支持程度不同。

- 外部扩展

  ```javascript
  externals: {
      lodash: '_'
  }
  ```

- tree shaking

  ```javascript
  optimization: {
      usedExports: true
  }