<!--
 * @Author: Lqf
 * @Date: 2021-09-16 20:16:10
 * @LastEditors: Please set LastEditors
 * @LastEditTime: 2022-05-05 11:21:53
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
    <!-- scroll-wrapper -->
    <scroll-wrapper-example />
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
import ScrollWrapperExample from './scrollWrapper'

export default {
  name: 'HelloWorld',
  components: {
    CommunicationExample,
    FormExample,
    TreeExample,
    TableExample,
    ScrollToTopExample,
    ActiveNavExample,
    VueXExample,
    ScrollWrapperExample
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
