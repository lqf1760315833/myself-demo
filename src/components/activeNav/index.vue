<!--
 * @Author: Lqf
 * @Date: 2021-11-25 19:18:04
 * @LastEditors: Lqf
 * @LastEditTime: 2021-11-26 11:58:10
 * @Description: 我添加了修改
-->
<template>
  <div
    class="activeNav"
    ref="nav"
  >
    <div
      class="nav nav2"
      ref="nav2"
    >
      <slot name="paging" />
    </div>
    <div
      class="nav nav1"
      ref="nav1"
    >
      <slot name="index" />
    </div>
  </div>
</template>

<script>
export default {
  name: 'BizActiveNav',
  props: {
    navHeight: String,
    nav1: {
      type: [String, Object]
    },
    nav2: {
      type: [String, Object]
    }
  },
  mounted() {
    if (document.addEventListener) {
      document.addEventListener('DOMMouseScroll', this.scrollFunc, false)
    }
    window.onmousewheel = document.onmousewheel = this.scrollFunc
    if (/^\d{1,}%$/.test(this.navHeight)) {
      this.$refs.nav.style.height = this.navHeight
    } else if (/^\d{1,}$/.test(this.navHeight)) {
      this.$refs.nav.style.height = this.navHeight + 'px'
    }
    if (this.nav1) {
      this.analysisStyle(this.nav1, 'nav1')
    }
    if (this.nav2) {
      this.analysisStyle(this.nav2, 'nav2')
    }
  },
  methods: {
    scrollFunc(e) {
      e = e || window.event
      if (e.wheelDelta < 0) {
        this.$refs.nav1.style.top = "-100%"
        this.$refs.nav2.style.top = "0%"
      } else {
        this.$refs.nav1.style.top = "0"
        this.$refs.nav2.style.top = "100%"
      }
    },
    analysisStyle(style, target) {
      if (typeof style === 'string') {
        let arr = style.split(';')
        arr.forEach(item => {
          if (item) {
            let tmp = item.split(':')
            tmp[0] && (this.$refs[target].style[tmp[0].trim()] = tmp[1].trim())
          }
        })
      } else {
        Object.keys(style).forEach(item => {
          this.$refs[target].style[item] = style[item]
        })
      }
    }
  },
}
</script>

<style scoped>
.activeNav {
  position: fixed;
  left: 0;
  right: 0;
  top: 0;
  height: 8%;
  z-index: 2;
  overflow: hidden;
  -webkit-font-smoothing: subpixel-antialiased;
}
.nav {
  position: absolute;
  left: 0;
  right: 0;
  top: 0;
  width: 100%;
  height: 100%;
  transition: all 0.4s;
}
.nav2 {
  top: 100%;
}
</style>