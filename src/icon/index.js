/*
 * @Author: Lqf
 * @Date: 2021-09-18 10:26:23
 * @LastEditors: Lqf
 * @LastEditTime: 2021-09-18 10:40:37
 * @Description: 我添加了修改
 */
import Vue from 'vue'
import SvgIcon from '@/components/SvgIcon.vue'

Vue.component('svg-icon', SvgIcon)

// 自动加载svg目录下所有图标
const req = require.context('./svg', false/* 是否遍历子目录 */, /\.svg$/)

// 返回数组的名称就是图标文件的名称
req.keys().map(req)