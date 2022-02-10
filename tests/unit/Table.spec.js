/*
 * @Author: Lqf
 * @Date: 2021-10-21 14:56:15
 * @LastEditors: Lqf
 * @LastEditTime: 2021-10-21 16:06:20
 * @Description: 我添加了修改
 */
import { mount } from '@vue/test-utils'
import TableExample from '@/components/table/index.vue'
import TableColumn from '@/components/table/TableColumn.vue'

describe('Table.vue', () => {
  test('基本表格', () => {
    const template = `
      <table-example :data="tableData">
        <table-column sortable prop="data" label="日期" />
        <table-column sortable prop="name" label="姓名" />
        <table-column prop="address" label="地址" />
      </table-example>
    `
    const comp = {
      template,
      components: {
        TableExample, TableColumn
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
    }

    const wrapper = mount(comp)
    expect(wrapper.find('table').exists()).toBe(true)
    expect(wrapper.findAll('th').length).toBe(3)
    expect(wrapper.findAll('tbody>tr').length).toBe(4)
    expect(wrapper.find('tbody>tr').text()).toMatch("上海市普陀区金沙江路 1517 弄")
  })
})