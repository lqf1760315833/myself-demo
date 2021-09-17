<!--
 * @Author: Lqf
 * @Date: 2021-09-17 11:04:29
 * @LastEditors: Lqf
 * @LastEditTime: 2021-09-17 14:35:03
 * @Description: 我添加了修改
-->
<template>
  <div>
    <h3 @click="onClick">
      {{ title }}
      <span>{{ count }}</span>
    </h3>
  </div>
</template>

<script>
export default {
  props: {
    title: String
  },
  data () {
    return {
      count: 1
    }
  },
  methods: {
    onClick () {
      // 自定义事件
      this.$emit('some-event')
      // 事件总线 bus
      this.$bus.$emit('foo', this.count++)
    }
  },
  mounted () {
    this.$parent.$on('event-from-child2', msg => console.log(msg))
  }
}
</script>

<style lang="less" scoped>
</style>
