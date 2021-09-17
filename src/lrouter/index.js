import Vue from 'vue'
import VueRouter from './lvue-router'
import Home from '../views/Home.vue'

// use方法内部会调用install(Vue)
Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/about',
    name: 'About',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/About.vue'),
    children: [
      { path: 'a', name: 'AboutA', component: { name: 'AboutA', render: (h) => h('div', 'This is about/a') } },
      { path: 'b', name: 'AboutB', component: { name: 'AboutB', render: (h) => h('div', 'This is about/b') } }
    ]
  },
  {
    path: '/info',
    name: 'About',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/About.vue'),
    children: [
      { path: 'a', name: 'InfoA', component: { name: 'InfoA', render: (h) => h('div', 'This is info/a') } },
    ]
  }
]

const router = new VueRouter({
  routes
})

export default router
