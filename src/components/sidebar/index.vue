<!--
 * @Author: Lqf
 * @Date: 2021-09-22 10:36:30
 * @LastEditors: Lqf
 * @LastEditTime: 2021-10-27 20:09:24
 * @Description: 我添加了修改
-->
<template>
  <div>
    <el-scrollbar wrap-class="scrollbar-wrapper">
      <el-menu
        :default-active="activeMenu"
        :unique-opened="false"
        :collapse-transition="false"
        :background-color="variables.menuBg"
        :text-color="variables.menuText"
        :active-text-color="variables.menuActiveText"
        mode="vertical"
      >
        <SidebarItem
          v-for="route in permission_routes"
          :key="route.path"
          :item="route"
          :base-path="route.path"
        />
      </el-menu>
    </el-scrollbar>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import SidebarItem from './SidebarItem.vue'
export default {
  components: {
    SidebarItem
  },
  computed: {
    ...mapGetters(['permission_routes']),
    activeMenu () {
      const route = this.$route
      const { meta, path } = route
      if (meta.activeMenu) {
        return meta.activeMenu
      }
      return path
    },
    variables () {
      return {
        menuText: '#00acec',
        menuActiveText: '#409EFF',
        menuBg: '#304156'
      }
    }
  }
}
</script>

<style lang="less" scoped>
</style>