<!--
 * @Author: Lqf
 * @Date: 2021-09-18 10:21:57
 * @LastEditors: Lqf
 * @LastEditTime: 2021-09-18 10:34:06
 * @Description: 我添加了修改
-->
<template>
  <svg :class="svgClass" v-on="$listeners">
    <use :xlink:href="iconName" />
  </svg>
</template>

<script>
export default {
  name: 'SvgIcon',
  props: {
    iconClass: {
      type: String,
      required: true
    },
    className: {
      type: String,
      default: ''
    }
  },
  computed: {
    iconName () {
      return `#icon-${this.iconClass}`
    },
    svgClass () {
      if (this.className) {
        return 'svg-icon' + this.className
      } else {
        return 'svg-icon'
      }
    }
  },
}
</script>

<style lang="less" scoped>
.svg-icon {
  width: 1em;
  height: 1em;
  vertical-align: -0.15em;
  fill: currentColor;
  overflow: hidden;
}
</style>