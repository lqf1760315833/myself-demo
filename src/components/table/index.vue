<!--
 * @Author: Lqf
 * @Date: 2021-10-21 10:20:23
 * @LastEditors: Lqf
 * @LastEditTime: 2021-12-16 18:27:13
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
      orderBy: 'desc'
    }
  },
  computed: {
    columns() {
      // 可以从内部TableColumn定义之中获取prop和label
      return this.$slots.default
        .filter(vnode => vnode.tag) // 去除空格的影响
        .map(({ data: { attrs, scopedSlots } }) => {
          const column = { ...attrs }
          if (scopedSlots) {
            column.renderCell = (row, index) => (
              <div>{scopedSlots.default({ row, $index: index })}</div>
            )
          } else {
            column.renderCell = row => <div>{row[column.prop]}</div>
          }
          return column
        })
    }
  },
  created() {
    this.columns.forEach(column => {
      // 如果存在sortable，第一个作为排序列
      if (Object.prototype.hasOwnProperty.call(column, 'sortable')) {
        if (column.prop && !this.orderField) {
          this.sort(column.prop, this.orderBy)
        }
      }
    })
  },
  methods: {
    sort(field, by) {
      this.orderField = field
      this.orderBy = by

      this.data.sort((a, b) => {
        const v1 = a[this.orderField]
        const v2 = b[this.orderField]
        if (typeof v1 === 'number') {
          return this.orderBy === 'desc' ? v2 - v1 : v1 - v2
        } else {
          return this.orderBy === 'desc'
            ? v2.localeCompare(v1)
            : v1.localeCompare(v2)
        }
      })
    },
    toggleSort(field) {
      const by = this.orderBy === 'desc' ? 'asc' : 'desc'
      this.sort(field, by)
    }
  },
  render() {
    return (
      <table>
        <thead>
          <tr>
            {this.columns.map(column => {
              if (Object.prototype.hasOwnProperty.call(column, 'sortable')) {
                let orderArrow = '⬆⬇'
                if (this.orderField === column.prop) {
                  orderArrow = this.orderBy === 'desc' ? '⬇' : '⬆'
                }
                return (
                  <th
                    key={column.label}
                    onClick={() => this.toggleSort(column.prop)}
                  >
                    {column.label} <span>{orderArrow}</span>
                  </th>
                )
              } else {
                return <th key={column.label}>{column.label}</th>
              }
            })}
          </tr>
        </thead>
        <tbody>
          {this.data.map((row, rowIndex) => (
            <tr key={rowIndex}>
              {this.columns.map((column, columnIndex) => (
                <td td key={columnIndex}>
                  {' '}
                  {column.renderCell(row, rowIndex)}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    )
  }
}
</script>