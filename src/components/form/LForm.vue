<!--
 * @Author: Lqf
 * @Date: 2021-09-17 11:25:08
 * @LastEditors: Lqf
 * @LastEditTime: 2021-12-16 19:48:01
 * @Description: 我添加了修改
-->
<template>
  <div>
    <slot />
  </div>
</template>

<script>
export default {
  props: {
    model: {
      type: Object,
      required: true
    },
    rules: {
      type: Object,
      default() {
        return {}
      }
    }
  },
  provide() {
    return {
      form: this
    }
  },
  methods: {
    validate(cb) {
      const promises = this.$children
        .filter(item => item.prop)
        .map(item => item.validate())
      Promise.all(promises)
        .then(() => cb(true))
        .catch(() => cb(false))
    }
  }
}
</script>

<style lang="less" scoped>
</style>
