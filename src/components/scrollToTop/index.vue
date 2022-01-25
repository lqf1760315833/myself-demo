<!--
 * @Author: Lqf
 * @Date: 2021-10-13 11:03:08
 * @LastEditors: Lqf
 * @LastEditTime: 2022-01-24 15:35:34
 * @Description: 我添加了修改
-->

<template>
  <div>
    <h2>回到顶部</h2>
    <div id="scroll">
      <div
        v-for="index of 1000"
        :key="index"
      >这是第{{ index }}个div</div>
      <scroll-to-top
        :altitude="200"
        :easing="true"
        class="add"
        icon-class-name="add-top"
        @scrollTop="hello"
      />
    </div>
  </div>
</template>

<script>
import ScrollToTop from './ScrollToTop'
export default {
  components: {
    ScrollToTop
  },
  methods: {
    hello() {
      console.log(123213213213)
    }
  }
}
</script>

<style lang="less" scoped>
#scroll {
  width: 40%;
  height: 400px;
  overflow: auto;
}

.add {
  right: 50px;
  bottom: 50px;
}

/deep/.add-top {
  position: absolute;
  left: 5px;
  top: 8px;
  width: 0;
  height: 0;
  border-left: 10px solid transparent;
  border-right: 10px solid transparent;
  border-bottom: 10px solid #eee;
}
</style>