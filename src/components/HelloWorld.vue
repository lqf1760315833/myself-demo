<!--
 * @Author: Lqf
 * @Date: 2021-09-16 20:16:10
 * @LastEditors: Lqf
 * @LastEditTime: 2022-01-21 15:57:04
 * @Description: 我添加了修改
-->
<template>
  <div class="hello">
    {{ msg }}
    <!-- communication -->
    <communication-example />
    <!-- store -->
    <vue-x-example />
    <!-- form -->
    <form-example />
    <!-- tree -->
    <tree-example />
    <!-- table -->
    <table-example />
    <!-- scroll-to-top -->
    <scroll-to-top-example />
    <!-- active-nav -->
    <active-nav-example />
  </div>
</template>

<script>
import CommunicationExample from './communication'
import FormExample from './form'
import TreeExample from './tree'
import TableExample from './table'
import ScrollToTopExample from './scrollToTop'
import ActiveNavExample from './activeNav'
import VueXExample from './vuex'

export default {
  name: 'HelloWorld',
  components: {
    CommunicationExample,
    FormExample,
    TreeExample,
    TableExample,
    ScrollToTopExample,
    ActiveNavExample,
    VueXExample
  },
  props: {
    msg: {
      type: String,
      default: ''
    }
  }
}
</script>

<style lang="less" scoped>
.hello {
  padding: 0 300px;
  text-align: left;
}
</style>
