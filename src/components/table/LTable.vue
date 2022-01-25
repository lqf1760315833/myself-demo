<!--
 * @Author: Lqf
 * @Date: 2022-01-24 14:47:24
 * @LastEditors: Lqf
 * @LastEditTime: 2022-01-25 15:57:36
 * @Description: 我添加了修改
-->

<script>
export default {
  props: {
    data: {
      type: Array,
      required: true
    }
  },
  data() {
    return {
      orderField: '',
      orderBy: -1 // -1 递减，1 递增
    }
  },
  computed: {
    columns() {
      return (
        this.$slots.default
          .filter(vNode => vNode.tag)
          // 如果内部出现了默认作用域插槽，执行
          .map(({ data: { attrs, scopedSlots } }) => {
            const column = { ...attrs }
            if (scopedSlots) {
              // 自定义列表模板
              column.renderCell = (row, i) => {
                // scopedSlots.default是一个函数，返回的是它的虚拟DOM
                return <div>{scopedSlots.default({ row, $index: i })}</div>
              }
            } else {
              // 设置了prop的情况
              column.renderCell = row => <div>{row[column.prop]}</div>
            }
            return column
          })
      )
    }
    // rows() {
    //   return this.data.map(item => {
    //     const ret = {}
    //     this.columns.forEach(({ prop }) => {
    //       ret[prop] = item[prop]
    //     })
    //     return ret
    //   })
    // }
  },
  created() {
    this.columns.forEach(column => {
      if (Object.prototype.hasOwnProperty.call(column, 'sortable')) {
        if (column.prop && !this.orderField) {
          this.sortTable(column.prop, this.orderBy)
        }
      }
    })
  },
  methods: {
    sortTable(field, by) {
      this.orderField = field
      this.data.sort((a, b) => {
        return a[field] > b[field] ? by : -by
      })
    },
    changeSort(column) {
      if (Object.prototype.hasOwnProperty.call(column, 'sortable')) {
        if (column.prop === this.orderField) {
          this.orderBy *= -1
        } else {
          this.orderBy = -1
        }
        this.sortTable(column.prop, this.orderBy)
      }
    },
    deleteColumn() {}
  },
  render() {
    return (
      <table>
        <thead>
          <tr>
            {this.columns.map(column => {
              let flag = ''
              if (Object.prototype.hasOwnProperty.call(column, 'sortable')) {
                flag = '↑ ↓'
                if (this.orderField === column.prop) {
                  flag = this.orderBy > 0 ? '↑' : '↓'
                }
              }
              return (
                <th key={column.label} onClick={this.changeSort.bind(this, column)}>
                  {column.label} {flag}
                </th>
              )
            })}
          </tr>
        </thead>
        <tbody>
          {
            this.data.map((row, rowIndex) => {
              return (
                <tr key={rowIndex}>
                  {this.columns.map((column, columnIndex) => (
                    <td key={columnIndex}>{column.renderCell(row, rowIndex)}</td>
                  ))}
                </tr>
              )
            })

            // this.data.map((row, index) => {
            //   const tds = Object.keys(row).map(key => {
            //     return <td key={key}>{row[key]}</td>
            //   })
            //   return <tr key={index}>{tds}</tr>
            // })
          }
        </tbody>
      </table>
    )
  }
}
</script>
