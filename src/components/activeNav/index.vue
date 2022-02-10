<!--
 * @Author: Lqf
 * @Date: 2021-11-25 19:18:04
 * @LastEditors: Lqf
 * @LastEditTime: 2022-01-21 15:08:30
 * @Description: 我添加了修改
-->
<template>
  <active-nav
    nav-height="50"
    :nav1="nav1"
    :nav2="nav2"
  >
    <div
      slot="index"
      class="index"
      style="display: flex; justify-content: center"
    >
      <div
        v-for="item in title1"
        :key="item.id"
        style="margin: 0 20px; font: 20px/50px '宋体'"
      >{{ item.content }}</div>
    </div>
    <div
      slot="paging"
      class="paging"
      style="display: flex; justify-content: center"
    >
      <div
        v-for="item in title2"
        :key="item.id"
        style="margin: 0 20px; font: 20px/50px '宋体'"
      >{{ item.content }}</div>
    </div>
  </active-nav>
</template>

<script>
import ActiveNav from './activeNav'
export default {
  components: {
    ActiveNav
  },
  data() {
    return {
      title1: [
        {
          id: 1,
          content: '首页 '
        },
        {
          id: 2,
          content: '发现 '
        },
        {
          id: 3,
          content: '会员 '
        }
      ],
      title2: [
        {
          id: 1,
          content: '首页2 '
        },
        {
          id: 2,
          content: '发现2 '
        },
        {
          id: 3,
          content: '会员2 '
        }
      ],
      nav1: 'color: #323232; background: rgba(123, 23, 213, 0.1)',
      nav2: {
        color: 'grey',
        background: 'rgba(123, 23, 213, 0.2)'
      }
    }
  }
}
</script>

<style lang="less" scoped>
#cla {
  width: 50%;
  height: 400px;
  overflow: auto;
}

.index {
  display: flex;
}
.paging {
  display: flex;
}
</style>