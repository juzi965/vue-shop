<template>
  <!-- 导航菜单栏 -->
  <el-container>
    <el-header class="header">
      <Navigation></Navigation>
    </el-header>
    <el-main class="main">
      <router-view />
    </el-main>
    <el-footer class="footer">Footer</el-footer>

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
  margin: 0;
  padding: 0;
}
</style>