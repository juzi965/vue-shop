<template>
  <!-- 导航菜单栏 -->
  <el-container>
    <el-header class="header"
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
    }
  },
  methods: {

  }
}
</script>

<style lang="less" scoped>
.header {
  width: 100%;
  position: fixed;
  top: 0;
  z-index: 999;
}
.main {
  padding-top: 100px;
}
</style>