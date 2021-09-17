<!--
 * @Author: Lqf
 * @Date: 2021-09-17 11:04:22
 * @LastEditors: Lqf
 * @LastEditTime: 2021-09-17 14:56:05
 * @Description: 我添加了修改
-->
<template>
  <div>
    <h2>组件通信</h2>
    <child-1 :title="title" @some-event="someEvent" />
    <child-2 msg1="hello" msg2="world" @listen="listen" />
  </div>
</template>

<script>
import Child1 from './Child1'
import Child2 from './Child2'

export default {
  // 对象和函数
  // provide: {
  //   ancestor: '数据来自爷爷'
  // },
  provide () {
    return {
      ancestor: '数据来自爷爷'
    }
  },
  components: {
    Child1,
    Child2
  },
  data () {
    return {
      title: 'hello child1'
    }
  },
  methods: {
    someEvent () {
      console.log('event-from-child1')
      this.$children[0].count++
    },
    listen (msg) {
      console.log(msg)
    }
  },
  mounted () {
    // 事件总线 bus
    this.$bus.$on('foo', (value) => {
      console.log(value)
    })
  },
}
</script>

<style lang="less" scoped>
</style>
