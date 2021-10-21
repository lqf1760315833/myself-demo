<!--
 * @Author: Lqf
 * @Date: 2021-09-16 20:16:10
 * @LastEditors: Lqf
 * @LastEditTime: 2021-10-21 16:21:04
 * @Description: 我添加了修改
-->
<template>
  <div class="hello">
    <!-- communication -->
    <communication-example />
    <!-- form -->
    <form-example />
    <!-- tree -->
    <tree-example />
    <!-- table -->
    <table-example :data="tableData">
      <table-column sortable prop="data" label="日期" />
      <table-column sortable prop="name" label="姓名" />
      <table-column prop="address" label="地址" />
      <table-column label="操作">
        <template v-slot:default="scope">
          <button @click="handleEdit(scope.$index, scope.row)">编辑</button>
          <button @click="handleDelete(scope.$index, scope.row)">删除</button>
        </template>
      </table-column>
    </table-example>
    <!-- store -->
    <div class="store">
      <h2>这里是 vuex</h2>
      <p @click="$store.commit('add')">{{ $store.state.counter }}</p>
      <p @click="$store.commit('add')">{{ $store.state.counter }}</p>
      <p @click="$store.dispatch('add')">async:{{ $store.state.counter }}</p>
      <p>doubleCounter: {{ $store.getters.doubleCounter }}</p>
    </div>
    <!-- scrollToTop -->
    <div id="cla">
      <div v-for="index of 1000" :key="index">这是第{{ index }}个div</div>
      <scroll-to-top
        :altitude="200"
        :easing="true"
        className="add"
        iconClassName="add-top"
        @scrollTop="hello"
      />
    </div>
  </div>
</template>

<script>
import FormExample from './form'
import CommunicationExample from './communication'
import TreeExample from './tree'
import TableExample from './table'
import TableColumn from './table/TableColumn.vue'
import ScrollToTop from './scrollToTop'

export default {
  name: 'HelloWorld',
  props: {
    msg: String
  },
  components: {
    CommunicationExample,
    FormExample,
    TreeExample,
    TableExample,
    TableColumn,
    ScrollToTop
  },
  data() {
    return {
      tableData: [
        {
          data: '2016-05-02',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1518 弄',
          operation: '添加'
        },
        {
          data: '2016-05-04',
          name: '王小二',
          address: '上海市普陀区金沙江路 1517 弄',
          operation: '删除'
        },
        {
          data: '2016-05-01',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1519 弄',
          operation: '修改'
        },
        {
          data: '2016-05-03',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1516 弄',
          operation: '查找'
        }
      ]
    }
  },
  methods: {
    anasiyo() {
      console.log(123213213213)
    },
    hello() {
      this.anasiyo()
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
