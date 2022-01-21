<!--
 * @Author: Lqf
 * @Date: 2021-10-21 16:27:40
 * @LastEditors: Lqf
 * @LastEditTime: 2022-01-21 14:58:37
 * @Description: 我添加了修改
-->

<template>
  <l-table :data="tableData">
    <l-table-column
      sortable
      prop="data"
      label="日期"
    />
    <l-table-column
      sortable
      prop="name"
      label="姓名"
    />
    <l-table-column
      prop="address"
      label="地址"
    />
    <l-table-column label="操作">
      <template v-slot:default="scope">
        <button @click="handleEdit(scope.$index, scope.row)">编辑</button>
        <button @click="handleDelete(scope.$index, scope.row)">删除</button>
      </template>
    </l-table-column>
  </l-table>
</template>

<script>
import LTable from './LTable.vue'
import LTableColumn from './LTableColumn.vue'
export default {
  components: {
    LTable,
    LTableColumn
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
  }
}
</script>
