<template>
  <el-menu :default-active="$route.path"
           :router="isRouter"
           class="navigation"
           mode="horizontal">
    <el-menu-item index="/home"
                  route="/home">首页</el-menu-item>
    <el-menu-item index="/about"
                  route="/about">商城</el-menu-item>
    <el-submenu index="/">
      <template slot="title">个人中心</template>
      <el-menu-item index="2-1">账号设置</el-menu-item>
    </el-submenu>
    <el-menu-item index="/logout">
      <el-button type="text"
                 @click="logout">退出</el-button>
    </el-menu-item>

  </el-menu>
</template>

<script>
export default {
  name: 'Navigation',
  data () {
    return {
      isRouter: true
    }
  },
  methods: {
    logout () {
      this.$confirm('确定要退出吗？', '提示', {
        confirmButtonText: '残忍离开',
        cancelButtonText: '我不是，我没有',
        type: 'warning'
      }).then(() => {
        window.sessionStorage.removeItem('token')
        this.$message.success('退出成功')
        this.$router.push('/login')
      }).catch(() => {
        this.$message.success('不退出啦，手滑点错了喽')
      })

    }
  }
}
</script>
<style lang="less" scoped>
.navigation {
  display: flex;
  justify-content: flex-end;
  padding-right: 30px;
}
</style>