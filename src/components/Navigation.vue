<template>
  <el-menu :default-active="$route.path"
           router
           unique-opened
           class="navigation"
           mode="horizontal"
           text-color="#000"
           active-text-color="FFF">
    <el-menu-item index="/welcome">欢迎</el-menu-item>
    <el-menu-item index="/about">商城</el-menu-item>
    <el-submenu index="/">
      <template slot="title">个人中心</template>
      <el-menu-item>账号设置</el-menu-item>
    </el-submenu>
    <el-menu-item>
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
  background-color: rgba(0, 0, 0, 0);
  display: flex;
  justify-content: flex-end;
  padding-right: 30px;
  border: none;
}

.popper_class {
  background-color: #000;
}
</style>