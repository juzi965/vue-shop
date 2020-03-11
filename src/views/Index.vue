<template>
  <!-- 导航菜单栏 -->
  <el-container>
    <el-header :class="{'header':true,'isFixed':isFixed}"
               height="80px">
      <Navigation></Navigation>
    </el-header>
    <el-main class="main">
      <router-view />
    </el-main>
    <el-footer class="footer">
      <Footer></Footer>
    </el-footer>

  </el-container>

</template>

<script>
export default {
  data () {
    return {
      scroll: 0,
      isFixed: true
    }
  },
  mounted () {
    window.addEventListener('scroll', this.Scroll) // 监听滚动事件，然后用handleScroll这个方法进行相应的处理
  },
  destroyed () {
    document.removeEventListener('scroll', this.Scroll)
  },
  methods: {
    Scroll () {
      let scrollTop = window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop;
      if (scrollTop > this.scroll) {
        this.isFixed = false
      } else {
        this.isFixed = true
      }
      this.scroll = scrollTop;
    }
  }
}
</script>

<style lang="less" scoped>
.header {
  width: 100%;
  background: #ffffff;
  border-bottom: #eee solid 1px;
}
.isFixed {
  position: fixed;
  top: 0;
  z-index: 999;
}
.main {
  padding-top: 100px;
}
</style>