<!--
 * @Author: Lqf
 * @Date: 2021-09-22 13:35:40
 * @LastEditors: Lqf
 * @LastEditTime: 2021-12-16 18:27:02
 * @Description: 我添加了修改
-->
<template>
  <div v-if="!item.hidden">
    <!-- 唯一显示子元素的情况显示为链接 -->
    <template
      v-if="
        hasOneShowingChild(item.children, item) &&
          (!onlyOneChild.children || onlyOneChild.noShowingChildren) &&
          !item.alwaysShow
      "
    >
      <router-link
        v-if="onlyOneChild.meta"
        :to="resolvePath(onlyOneChild.path)"
      >
        <el-menu-item
          :index="resolvePath(onlyOneChild.path)"
          :class="{ 'submenu-title-noDropdown': !isNest }"
        >
          <item
            :icon="onlyOneChild.meta.icon || (item.meta && item.meta.icon)"
            :title="onlyOneChild.meta.title"
          />
        </el-menu-item>
      </router-link>
    </template>

    <!-- 有子元素显示为菜单 -->
    <el-submenu
      v-else
      ref="submenu"
      :index="resolvePath(item.path)"
      popper-append-to-body
    >
      <!-- 标题 -->
      <template>
        <item
          v-if="item.meta"
          :icon="item.meta.icon"
          :title="item.meta.title"
        />
      </template>
      <!-- 子菜单 -->
      <sidebar-item
        v-for="child in item.children"
        :key="child.path"
        :is-nest="true"
        :item="child"
        :base-path="resolvePath(child.path)"
        class="nest-menu"
      />
    </el-submenu>
  </div>
</template>

<script>
import Item from './Item'
import path from 'path'

export default {
  name: 'SidebarItem',
  components: {
    Item
  },
  props: {
    item: {
      type: Object,
      required: true
    },
    basePath: {
      type: String,
      default: ''
    },
    isNest: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      onlyOneChild: null
    }
  },
  methods: {
    hasOneShowingChild(children = [], parent) {
      const showingChildren = children.filter(item => {
        if (item.hidden) {
          return false
        }
        // 如果只有一个子菜单时设置
        this.onlyOneChild = item
        return true
      })
      // 当只有一个子路由，该子路由默认显示
      if (showingChildren.length === 1) {
        return true
      }
      // 没有子路由则显示父路由
      if (showingChildren.length === 0) {
        this.onlyOneChild = { ...parent, path: '', noShowingChildren: true }
        return true
      }
      return false
    },
    resolvePath(routePath) {
      return path.resolve(this.basePath + '/' + routePath)
    }
  }
}
</script>

<style lang="less" scoped>
</style>