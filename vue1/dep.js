/*
 * @Author: Lqf
 * @Date: 2021-09-06 16:27:59
 * @LastEditors: Lqf
 * @LastEditTime: 2021-09-06 16:27:59
 * @Description: 我添加了修改
 */

class Dep {
  constructor() {
    this.deps = []
  }
  addDep (dep) {
    this.deps.push(dep)
  }
  notify () {
    this.deps.forEach(dep => dep.update())
  }
}
export default Dep