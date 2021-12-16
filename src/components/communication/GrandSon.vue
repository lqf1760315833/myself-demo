<!--
 * @Author: Lqf
 * @Date: 2021-09-17 11:04:05
 * @LastEditors: Lqf
 * @LastEditTime: 2021-12-16 18:06:49
 * @Description: 我添加了修改
-->
<template>
  <div>
    <p>
      这里是 grandson：
      <span>{{ ancestor }}</span> |
      <span>{{ $attrs.msg1 }}</span> |
      <span>{{ $attrs.msg2 }}</span>
      <span>
        <button @click="$emit('listen', 'msg from grandson')">listeners</button>
      </span>
    </p>
  </div>
</template>

<script>
export default {
  inject: ['ancestor']
  // 加入默认值
  // inject: {
  //   'ancestor': { default: 'foo' }
  // }
  // 默认值加别名
  // inject: {
  //   'alias': {
  //     from: 'ancestor',
  //     default: 'foo'
  //   }
  // }
}
</script>

<style lang="less" scoped>
</style>
