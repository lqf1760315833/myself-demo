<!--
 * @Author: Lqf
 * @Date: 2021-09-17 11:25:08
 * @LastEditors: Lqf
 * @LastEditTime: 2021-12-16 18:34:12
 * @Description: 我添加了修改
-->
<template>
  <div>
    <input
      :type="type"
      :value="value"
      v:bind="$attrs"
      @change="onInput"
    />
  </div>
</template>

<script>
export default {
  inheritAttrs: false,
  props: {
    value: {
      type: String,
      default: ''
    },
    type: {
      type: String,
      default: 'text'
    }
  },
  methods: {
    onInput(e) {
      this.$emit('input', e.target.value)
      this.$parent.$emit('validate')
    }
  }
}
</script>

<style lang="less" scoped>
</style>
