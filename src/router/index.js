/*
 * @Author: Lqf
 * @Date: 2021-09-18 11:08:10
 * @LastEditors: Lqf
 * @LastEditTime: 2021-09-22 15:24:38
 * @Description: 我添加了修改
 */
import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

// 通用页面
export const constRoutes = [
  {
    path: '/login',
    name: 'Login',
    component: () => import('@/views/Login.vue'),
    hidden: true
  },
  {
    path: '/',
    name: 'Home',
    component: () => import('@/views/Home.vue'),
    meta: {
      title: 'Home',
      icon: 'zz'
    }
  }
]

export const asyncRoutes = [
  {
    path: '/about',
    name: 'About',
    component: () => import(/* webpackChunkName: "about" */ '../views/About.vue'),
    meta: {
      title: 'About',
      icon: 'denglong',
      roles: ['admin', 'editor']
    },
    children: [
      {
        path: 'a', name: 'AboutA', meta: {
          title: 'AboutA',
          icon: 'zz',
          roles: ['admin', 'editor']
        }, component: { name: 'AboutA', render: (h) => h('div', 'This is about/a') }
      },
      {
        path: 'b', name: 'AboutB', meta: {
          title: 'AboutB',
          icon: 'zz2',
          roles: ['admin', 'editor']
        }, component: { name: 'AboutB', render: (h) => h('div', 'This is about/b') }
      }
    ]
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: constRoutes
})

export default router
