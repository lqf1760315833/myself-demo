<template>
  <div class="wrapper">
    <h2>滚动监听显示</h2>
    <scroll-wrapper wrapper-name="reference" :dis-from-bottom="100" :interval="500" style="height: 400px"
                    @on-bottom="trigger"
    >
      <ul>
        <li v-for="(item) in 100" :key="item">{{ item }}</li>
      </ul>
    </scroll-wrapper>
  </div>
</template>

<script>
import ScrollWrapper from './scrollWrapper'
export default {
  components: {
    ScrollWrapper
  },
  methods: {
    trigger(refs) {
      console.log(refs)
    }
  },
}
</script>
