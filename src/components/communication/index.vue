<!--
 * @Author: Lqf
 * @Date: 2021-09-17 11:04:22
 * @LastEditors: Lqf
 * @LastEditTime: 2021-09-17 11:29:25
 * @Description: 我添加了修改
-->
<template>
  <div>
    <h2>组件通信</h2>
    <child-1 />
    <child-2 />
  </div>
</template>

<script>
import Child1 from './Child1'
import Child2 from './Child2'
export default {
  components: {
    Child1,
    Child2
  },
  data () {
    return {
      title: 'hello child1'
    }
  }
}
</script>

<style lang="less" scoped>
</style>
