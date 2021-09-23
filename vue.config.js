/*
 * @Author: Lqf
 * @Date: 2021-09-18 09:04:53
 * @LastEditors: Lqf
 * @LastEditTime: 2021-09-23 15:16:18
 * @Description: 我添加了修改
 */

const path = require('path')

const port = 8888
const resolve = (dir) => path.join(__dirname, dir)


console.log(process.env.foo)
console.log(process.env.VUE_APP_DONG)

// const bodyParser = require("body-parser")

module.exports = {
  publicPath: '/best-practice',
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
    //   before: app => {
    //     app.use(bodyParser.json())
    //     console.log(111)
    //     app.post('/dev-api/user/login', (req, res) => {
    //       const { username } = req.body

    //       if (username === "admin" || username === "Lqf") {
    //         res.json({
    //           code: 1,
    //           data: username
    //         })
    //       } else {
    //         res.json({
    //           code: 10204,
    //           message: "用户名或密码错误"
    //         })
    //       }
    //     })

    //     app.get("/dev-api/user/info", (req, res) => {
    //       const auth = req.headers["authorization"]
    //       const roles = auth.split(' ')[1] === "admin" ? ["admin"] : ["editor"]
    //       res.json({
    //         code: 1,
    //         data: roles
    //       })
    //     })

    //   }
  },
  // configureWebpack: {
  //   name: 'vue杂项',
  //   resolve: {
  //     alias: {
  //       comps: path.join(__dirname, 'src/components')
  //     }
  //   }
  // }
  configureWebpack (config) {
    config.resolve.alias.comps = resolve('src/components')
    if (process.env.NODE_ENV === 'development') {
      config.name = 'vue-sundry'
    } else {
      config.name = 'vue杂项'
    }
  },
  chainWebpack (config) {
    config.module.rule('svg')
      .exclude.add(resolve('src/icon'))
      .end()

    config.module.rule('icon')
      .include.add(resolve('src/icon')).end()
      .test(/\.svg$/)
      .use('svg-sprite-loader')
      .loader('svg-sprite-loader')
      .options({ symbolId: 'icon-[name]' })
      .end()
  }
}