<!--
 * @Author: Lqf
 * @Date: 2021-10-12 15:49:57
 * @LastEditors: Lqf
 * @LastEditTime: 2021-10-13 11:00:30
 * @Description: 暴露的API：scrollNode,altitude,easing,className,iconClassName,styles,scrollTop
-->
<template>
  <transition name="el-fade-in">
    <div
      ref="scrollTop"
      v-show="toTopShow"
      class="scroll-top"
      @click="scrollToTop"
    >
      <i ref="iconTop" class="icon-top"></i>
    </div>
  </transition>
</template>

<script>
export default {
  name: 'ScrollToTop',
  props: {
    // 具有滚动效果的父级，默认为documentElement
    scrollNode: String,
    // 距离顶部大于该值则显示交互按钮
    altitude: {
      type: Number,
      default: 300
    },
    // 是否采取缓动返回
    easing: {
      type: Boolean,
      default: true
    },
    // class样式
    className: String,
    // style样式
    styles: String,
    iconClassName: String
  },
  data () {
    return {
      // 挂载的父级节点
      node: document.documentElement,
      // 是否显示
      toTopShow: false
    }
  },
  mounted () {
    // 获取传入的父级元素，未传入则使用默认元素
    if (this.scrollNode) {
      // 先判断id再判断class
      const nodeById = document.querySelector('#' + this.scrollNode)
      const nodeByClass = document.querySelector('.' + this.scrollNode)
      if (nodeById) {
        this.node = nodeById
      } else if (nodeByClass) {
        this.node = nodeByClass
      }
    }
    this.resize()
    // 添加class样式
    this.$refs.scrollTop.classList.add(this.className)
    this.$refs.iconTop.classList.add(this.iconClassName)
    // 添加style样式
    if (this.styles) {
      const array = this.styles.split(';')
      array.forEach(style => {
        if (style) {
          const st = style.split(':')
          this.$refs.scrollTop.style[st[0].trim()] = st[1]
        }
      })
    }
    // 进行滚动监听
    this.$nextTick(() => {
      window.addEventListener('scroll', this.handleScroll, true)
      window.addEventListener('resize', this.resize)
    })
  },
  destroyed () {
    // 销毁滚动监听
    window.removeEventListener('scroll', this.handleScroll, true)
  },
  methods: {
    // 元素右侧距离父级默认为30px
    resize () {
      const offsetRight = window.innerWidth - this.node.offsetLeft - this.node.offsetWidth
      this.$refs.scrollTop.style.right = offsetRight + 30 + 'px'
    },
    // 滚动监听显示
    handleScroll () {
      this.scrollTop = this.node.scrollTop
      if (this.scrollTop >= this.altitude) {
        this.toTopShow = true
      } else {
        this.toTopShow = false
      }
    },
    // 点击返回父级最顶层
    scrollToTop () {
      // 不设置缓动形式则直接跳转
      if (!this.easing) {
        this.node.scrollTop = 0
        return
      }
      // 设置缓动则以动画帧方式返回顶层
      let timer = null
      cancelAnimationFrame(timer)
      const _this = this
      timer = requestAnimationFrame(function fn () {
        if (_this.node.scrollTop > 5000) {
          _this.node.scrollTop -= 1000
          timer = requestAnimationFrame(fn)
        } else if (_this.node.scrollTop > 1000) {
          _this.node.scrollTop -= 500
          timer = requestAnimationFrame(fn)
        } else if (_this.node.scrollTop > 200) {
          _this.node.scrollTop -= 100
          timer = requestAnimationFrame(fn)
        } else if (_this.node.scrollTop > 50) {
          _this.node.scrollTop -= 10
          timer = requestAnimationFrame(fn)
        } else if (_this.node.scrollTop > 0) {
          _this.node.scrollTop -= 5
          timer = requestAnimationFrame(fn)
        } else {
          cancelAnimationFrame(timer)
        }
      })
      this.$emit('scrollTop')
    }
  },
}
</script>

<style lang="less" scoped>
.scroll-top {
  background: #888;
  position: fixed;
  right: 30px;
  bottom: 30px;
  width: 30px;
  height: 30px;
  border-radius: 20px;
  cursor: pointer;
  transition: 0.5s opacity;
  box-shadow: 0 3px 6px rgba(0, 0, 0, 0.5);
  opacity: 0.2;
  z-index: 100;
}

.scroll-top:hover {
  opacity: 0.5;
}

.icon-top {
  position: absolute;
  left: 5px;
  top: 8px;
  width: 0;
  height: 0;
  border-left: 10px solid transparent;
  border-right: 10px solid transparent;
  border-bottom: 10px solid #fff;
}
</style>