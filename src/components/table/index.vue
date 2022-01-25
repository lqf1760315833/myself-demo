<!--
 * @Author: Lqf
 * @Date: 2022-01-24 14:45:40
 * @LastEditors: Lqf
 * @LastEditTime: 2022-01-25 14:58:59
 * @Description: 我添加了修改
-->

<template>
  <div>
    <h2>自定义表格</h2>
    <l-table :data="tableData">
      <l-table-column
        prop="date"
        label="日期"
        sortable
      />
      <l-table-column
        prop="name"
        label="姓名"
      />
      <l-table-column
        prop="address"
        label="地址"
        sortable
      />
      <l-table-column label="操作">
        <template v-slot:default="scope">
          <button @click="handleEdit(scope.row)">编辑</button>
          <button @click="handleDelete(scope.row)">删除</button>
        </template>
      </l-table-column>
    </l-table>
  </div>
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
          id: 1,
          date: '2016-05-02',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1518 弄',
          operation: '添加'
        },
        {
          id: 2,
          date: '2016-05-04',
          name: '王小二',
          address: '上海市普陀区金沙江路 1517 弄',
          operation: '删除'
        },
        {
          id: 3,
          date: '2016-05-01',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1519 弄',
          operation: '修改'
        },
        {
          id: 4,
          date: '2016-05-03',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1516 弄',
          operation: '查找'
        }
      ]
    }
  },
  methods: {
    handleEdit(row) {
      console.log(row)
    },
    handleDelete(row) {
      this.tableData = this.tableData.filter(item => item.id !== row.id)
    }
  }
}
</script>
