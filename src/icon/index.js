/*
 * @Author: Lqf
 * @Date: 2022-02-11 09:07:37
 * @LastEditors: Lqf
 * @LastEditTime: 2022-02-11 09:11:24
 * @Description: 我添加了修改
 */

import Vue from 'vue'
// 注册SVG组件
import SvgIcon from '@/components/SvgIcon.vue'

Vue.component('svg-icon', SvgIcon)

/**
 * 自动加载svg目录下所有图标
 * @params 文件目录
 * @params 是否遍历子目录
 * @params 文件匹配规则
 * @returns function
 */
const req = require.context('./svg', false, /\.svg$/)

/**
 *
 * req.keys() 返回图标文件名称的数组
 * 遍历并且require进来
 */
req.keys().map(req)