<!--
 * @Author: Lqf
 * @Date: 2021-09-29 09:51:26
 * @LastEditors: Lqf
 * @LastEditTime: 2022-01-21 15:27:21
 * @Description: 我添加了修改
-->
<template>
  <div>
    <h2>自定义树</h2>
    <l-tree :data="treeData" />
  </div>
</template>

<script>
import LTree from './LTree.vue'
export default {
  components: {
    LTree
  },
  data() {
    return {
      treeData: [
        {
          title: 'Web全栈架构师',
          children: [
            {
              title: 'Java架构师'
            },
            {
              title: 'JS高级',
              children: [
                {
                  title: 'ES6'
                },
                {
                  title: '动效'
                }
              ]
            },
            {
              title: 'Web全栈',
              children: [
                {
                  title: 'Vue训练营',
                  expand: true,
                  children: [
                    {
                      title: '组件化'
                    },
                    {
                      title: '源码'
                    },
                    {
                      title: 'docker部署'
                    }
                  ]
                },
                {
                  title: 'React',
                  children: [
                    {
                      title: 'JSX'
                    },
                    {
                      title: '虚拟DOM'
                    }
                  ]
                },
                {
                  title: 'Node'
                }
              ]
            }
          ]
        }
      ]
    }
  }
}
</script>