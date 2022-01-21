<!--
 * @Author: Lqf
 * @Date: 2022-01-21 15:24:01
 * @LastEditors: Lqf
 * @LastEditTime: 2022-01-21 15:29:02
 * @Description: 我添加了修改
-->

<template>
  <div>
    <h2>这里是 vuex</h2>
    <p @click="$store.commit('add')">counter:{{ $store.state.counter }}</p>
    <p @click="$store.dispatch('add')">async:{{ $store.state.counter }}</p>
    <p>doubleCounter: {{ $store.getters.doubleCounter }}</p>
  </div>
</template>

<script>
export default {}
</script>