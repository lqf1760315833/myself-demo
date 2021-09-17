<!--
 * @Author: Lqf
 * @Date: 2021-09-17 12:53:31
 * @LastEditors: Lqf
 * @LastEditTime: 2021-09-17 13:03:49
 * @Description: 我添加了修改
-->
<template>
  <div class="home">
    <HelloWorld msg="Welcome to Your Vue.js App" />
    <router-view></router-view>
  </div>
</template>

<script>
// @ is an alias to /src
import HelloWorld from '@/components/HelloWorld.vue'

export default {
  name: 'Home',
  components: {
    HelloWorld
  }
}
</script>
