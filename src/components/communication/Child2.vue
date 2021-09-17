<!--
 * @Author: Lqf
 * @Date: 2021-09-17 13:29:38
 * @LastEditors: Lqf
 * @LastEditTime: 2021-09-17 14:40:05
 * @Description: 我添加了修改
-->
<template>
  <div>
    <h3 @click="sendToChild1">Child2</h3>
    <grand-son v-bind="$attrs" v-on="$listeners"></grand-son>
  </div>
</template>

<script>
import GrandSon from './GrandSon.vue'
export default {
  components: { GrandSon },
  methods: {
    sendToChild1 () {
      this.$parent.$emit('event-from-child2', 'msg from child2')
    }
  }
}
</script>

<style lang="less" scoped>
</style>
