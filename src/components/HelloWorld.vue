<!--
 * @Author: Lqf
 * @Date: 2021-09-16 20:16:10
 * @LastEditors: Lqf
 * @LastEditTime: 2021-10-13 10:56:29
 * @Description: 我添加了修改
-->
<template>
  <div class="hello">
    <!-- communication -->
    <communication-example />
    <!-- form -->
    <form-example />
    <!-- tree -->
    <tree-example />
    <!-- store -->
    <div class="store">
      <h2>这里是 vuex</h2>
      <p @click="$store.commit('add')">{{ $store.state.counter }}</p>
      <p @click="$store.commit('add')">{{ $store.state.counter }}</p>
      <p @click="$store.dispatch('add')">async:{{ $store.state.counter }}</p>
      <p>doubleCounter: {{ $store.getters.doubleCounter }}</p>
    </div>
    <!-- scrollToTop -->
    <div id="cla">
      <div v-for="index of 1000" :key="index">这是第{{ index }}个div</div>
      <scroll-to-top
        :altitude="200"
        :easing="true"
        className="add"
        iconClassName="add-top"
        @scrollTop="hello"
      />
    </div>
  </div>
</template>

<script>
import FormExample from './form'
import CommunicationExample from './communication'
import TreeExample from './tree'
import ScrollToTop from './scrollToTop'
export default {
  name: 'HelloWorld',
  props: {
    msg: String
  },
  components: {
    CommunicationExample,
    FormExample,
    TreeExample,
    ScrollToTop
  },
  methods: {
    anasiyo () {
      console.log(123213213213)
    },
    hello () {
      this.anasiyo()
    }
  },
}
</script>

<style lang="less" scoped>
#cla {
  width: 50%;
  height: 400px;
  overflow: auto;
}
.add {
  right: 50px;
  bottom: 50px;
}

/deep/.add-top {
  position: absolute;
  left: 5px;
  top: 8px;
  width: 0;
  height: 0;
  border-left: 10px solid transparent;
  border-right: 10px solid transparent;
  border-bottom: 10px solid #eee;
}
</style>
