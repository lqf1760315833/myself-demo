<!--
 * @Author: Lqf
 * @Date: 2021-09-17 12:53:31
 * @LastEditors: Lqf
 * @LastEditTime: 2021-09-17 13:06:15
 * @Description: 我添加了修改
-->
<template>
  <div id="app">
    <div id="nav">
      <router-link to="/">Home</router-link> |
      <router-link to="/about/a">AboutA</router-link> |
      <router-link to="/about/b">AboutB</router-link> |
      <router-link to="/info/a">InfoA</router-link>
    </div>
    <router-view />
  </div>
</template>

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
