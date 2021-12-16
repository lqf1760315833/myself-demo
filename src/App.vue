<!--
 * @Author: Lqf
 * @Date: 2021-09-17 12:53:31
 * @LastEditors: Lqf
 * @LastEditTime: 2021-12-16 18:29:44
 * @Description: 我添加了修改
-->
<template>
  <div id="app">
    <div id="nav">
      <!-- <svg>
        <use xlink:href="#icon-zz" />
      </svg>-->
      <Sidebar />
      <router-link to="/">
        <svg-icon icon-class="zz" />Home
      </router-link>|
      <router-link to="/about">
        <svg-icon icon-class="denglong" />About
      </router-link>|
      <router-link to="/about/a">
        <svg-icon icon-class="zz2" />AboutA
      </router-link>|
      <router-link to="/about/b">AboutB</router-link>|
      <router-link to="/info/a">InfoA</router-link>
    </div>
    <router-view />
  </div>
</template>

<script>
// import '@/icon/svg/zz.svg'
console.log(process.env.foo)
console.log(process.env.VUE_APP_DONG)

import Sidebar from './components/sidebar'
export default {
  components: {
    Sidebar
  }
}
</script>

<style lang="less">
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

#nav {
  padding: 30px;

  a {
    font-weight: bold;
    color: #2c3e50;

    &.router-link-exact-active {
      color: #42b983;
    }
  }
}
</style>
