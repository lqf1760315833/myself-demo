/*
 * @Author: Lqf
 * @Date: 2021-09-18 14:57:07
 * @LastEditors: Lqf
 * @LastEditTime: 2021-09-22 15:30:57
 * @Description: 我添加了修改
 */
import { asyncRoutes, constRoutes } from "../router"

const state = {
  routes: [], // 完整路由
  addRoutes: [] // 需要添加的路由
}

const mutations = {
  setRoutes (state, routes) {
    state.addRoutes = routes
    state.routes = constRoutes.concat(routes)
  }
}

const actions = {
  // 生成权限路由，在得到用户角色后会第一时间调用
  generateRoutes ({ commit }, roles) {
    return new Promise(res => {
      // 过滤处理
      const accessedRoutes = filterAsyncRoutes(asyncRoutes, roles)
      commit('setRoutes', accessedRoutes)
      res(accessedRoutes)
    })
  }
}

/**
 * 
 * @param { 传入的路由，第一次为 asyncRoutes } routes 
 * @param { 角色 } roles 
 * @returns 
 */
export function filterAsyncRoutes (routes, roles) {
  const res = []
  routes.forEach(route => {
    const tmp = { ...route }
    if (hasPermission(tmp, roles)) {
      if (tmp.children) {
        tmp.children = filterAsyncRoutes(tmp.children, roles)
      }
      res.push(tmp)
    }
  })
  return res
}

/**
 * 根据路由meta.role确定是否当前用户拥有访问权限
 * @param {待判断路由} route 
 * @param {用户拥有角色} roles 
 * @returns 
 */
function hasPermission (route, roles) {
  if (route.meta && route.meta.roles) {
    return roles.some(role => route.meta.roles.includes(role))
  } else {
    return true
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}