/*
 * @Author: Lqf
 * @Date: 2022-02-11 09:07:38
 * @LastEditors: Please set LastEditors
 * @LastEditTime: 2022-05-05 15:40:45
 * @Description: 我添加了修改
 */
const path = require('path')

const port = 8888
const resolve = (dir) => path.join(__dirname, dir)


console.log(process.env.foo)
console.log(process.env.VUE_APP_DONG)

// const bodyParser = require("body-parser")

module.exports = {
  publicPath: '/vancats',
  devServer: {
    port,
    proxy: {
      [process.env.VUE_APP_BASE_API]: {
        target: `http://127.0.0.1:3000`,
        changeOrigin: true,
        pathRewrite: {
          ['^' + process.env.VUE_APP_BASE_API]: ''
        }
      }
    },
    // 本地mock
    // before: app => {
    //   app.use(bodyParser.json())
    //   console.log(111)
    //   app.post('/dev-api/user/login', (req, res) => {
    //     const { username } = req.body

    //     if (username === "admin" || username === "Lqf") {
    //       res.json({
    //         code: 1,
    //         data: username
    //       })
    //     } else {
    //       res.json({
    //         code: 10204,
    //         message: "用户名或密码错误"
    //       })
    //     }
    //   })

    //   app.get("/dev-api/user/info", (req, res) => {
    //     const auth = req.headers["authorization"]
    //     const roles = auth.split(' ')[1] === "admin" ? ["admin"] : ["editor"]
    //     res.json({
    //       code: 1,
    //       data: roles
    //     })
    //   })

    // }
  },
  // configureWebpack: {
  //   name: 'vue杂项',
  //   resolve: {
  //     alias: {
  //       comps: path.join(__dirname, 'src/components')
  //     }
  //   }
  // }
  configureWebpack(config) {
    config.resolve.alias.comps = resolve('src/components')
    if (process.env.NODE_ENV === 'development') {
      config.name = 'vue-sundry'
    } else {
      config.name = 'vue杂项'
    }
  },
  // 链式webpack
  chainWebpack(config) {
    // 当前项目有一个加载svg的loader
    config.module.rule('svg')
      // svg规则排除icon目录
      .exclude.add(resolve('src/icon'))
      .end()

    config.module.rule('icon')
      // 新添加的loader处理icon文件夹，include选项后当前上下文变成一个存放文件的Set，需要end回去
      .include.add(resolve('src/icon')).end()
      .test(/\.svg$/)
      .use('svg-sprite-loader')
      .loader('svg-sprite-loader')
      // 选项命名
      .options({ symbolId: 'icon-[name]' })
      .end()
  }
}
