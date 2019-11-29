<template>
  <!-- 导航菜单栏 -->
  <el-container>
    <el-header>
      <Navigation :now-active="nowActive"></Navigation>
    </el-header>
    <el-main>Main</el-main>
    <el-footer>Footer</el-footer>

  </el-container>

</template>

<script>
export default {
  data () {
    return {
      nowActive: 1
    }
  },
  methods: {

  }
}
</script>

<style lang="less" scoped>
</style>