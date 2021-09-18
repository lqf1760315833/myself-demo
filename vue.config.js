/*
 * @Author: Lqf
 * @Date: 2021-09-18 09:04:53
 * @LastEditors: Lqf
 * @LastEditTime: 2021-09-18 10:18:23
 * @Description: 我添加了修改
 */

const path = require('path')

const port = 8888
const resolve = (dir) => path.join(__dirname, dir)
console.log(process.env.foo)
console.log(process.env.VUE_APP_DONG)
module.exports = {
  publicPath: '/best-practice',
  devServer: {
    port
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