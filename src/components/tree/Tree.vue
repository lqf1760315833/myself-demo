<template>
  <div class="lqf">
    <TreeNode v-for="item in data" :key="item.title" :model="item" />
  </div>
</template>

<script>
import TreeNode from './TreeNode.vue'
export default {
  props: {
    data: {
      type: Array,
      required: true
    },
  },
  components: {
    TreeNode,
  },
}
</script>

<style lang="less" scoped>
.lqf {
  text-align: left;
  margin-left: 680px;
}
</style>