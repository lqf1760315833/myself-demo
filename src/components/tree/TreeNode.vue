<!--
 * @Author: Lqf
 * @Date: 2021-09-29 09:51:26
 * @LastEditors: Lqf
 * @LastEditTime: 2021-09-29 10:26:29
 * @Description: 我添加了修改
-->
<template>
  <div>
    <div @click="toggle" :style="{ paddingLeft: level - 1 + 'em' }">
      <label>{{ model.title }}</label>
      <span v-if="isFolder">{{ open ? '-' : '+' }}</span>
    </div>
    <div v-show="open" v-if="isFolder">
      <node-tree
        v-for="item in model.children"
        :key="item.title"
        :model="item"
        :level="level + 1"
      />
    </div>
  </div>
</template>

<script>
export default {
  name: 'node-tree',
  props: {
    model: Object,
    level: {
      type: Number,
      default: 1
    }
  },
  data () {
    return {
      open: false
    }
  },
  computed: {
    isFolder () {
      return this.model.children && this.model.children.length > 0
    }
  },
  methods: {
    toggle () {
      this.open = !this.open
    }
  },
}
</script>

<style lang="less" scoped>
</style>