<!--
 * @Author: Lqf
 * @Date: 2021-09-29 10:35:47
 * @LastEditors: Lqf
 * @LastEditTime: 2022-01-21 15:44:02
 * @Description: 我添加了修改
-->
<template>
  <div>
    <l-treeNode
      v-for="item in data"
      :key="item.title"
      :model="item"
    />
  </div>
</template>

<script>
import LTreeNode from './LTreeNode.vue'
export default {
  components: {
    LTreeNode
  },
  props: {
    data: {
      type: Array,
      required: true
    }
  }
}
</script>
