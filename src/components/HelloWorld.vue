<!--
 * @Author: Lqf
 * @Date: 2021-09-16 20:16:10
 * @LastEditors: Lqf
 * @LastEditTime: 2021-09-17 13:03:04
 * @Description: 我添加了修改
-->
<template>
  <div class="hello">
    <communication-example />
    <form-example />
    <p @click="$store.commit('add')">{{ $store.state.counter }}</p>
    <p @click="$store.commit('add')">{{ $store.state.counter }}</p>
    <p @click="$store.dispatch('add')">async:{{ $store.state.counter }}</p>
    <p>doubleCounter: {{ $store.getters.doubleCounter }}</p>
  </div>
</template>

<script>
import FormExample from './form'
import CommunicationExample from './communication'
export default {
  name: 'HelloWorld',
  props: {
    msg: String
  },
  components: {
    CommunicationExample,
    FormExample
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h3 {
  margin: 40px 0 0;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
</style>
