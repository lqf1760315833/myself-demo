<!--
 * @Author: Lqf
 * @Date: 2021-09-17 11:25:08
 * @LastEditors: Lqf
 * @LastEditTime: 2021-09-17 11:31:49
 * @Description: 我添加了修改
-->
<template>
  <div>
    <label v-if="label">{{ label }}</label>
    <slot></slot>
    <p v-if="error">{{ error }}</p>
  </div>
</template>

<script>
import Validator from 'async-validator'
export default {
  inject: ['form'],
  props: {
    label: {
      type: String,
      default: ''
    },
    prop: String
  },
  data () {
    return {
      error: ''
    }
  },
  methods: {
    validate () {
      const value = this.form.model[this.prop]
      const rules = this.form.rules[this.prop]
      const validator = new Validator({ [this.prop]: rules })
      return validator.validate({ [this.prop]: value }, errors => {
        if (errors) {
          this.error = errors[0].message
        } else {
          this.error = ''
        }
      })
    }
  }
}
</script>

<style lang="less" scoped>
</style>
