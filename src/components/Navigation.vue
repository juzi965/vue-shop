<template>
  <div class="nav">
    <el-row type="flex"
            justify="space-between">
      <el-col :span="4">
        <span class="title">Shop</span>
      </el-col>

      <el-col :span="8">
        <el-menu :default-active="$route.path"
                 router
                 :collapse="isCollapse"
                 :mode="whatMode"
                 background-color="#FFFFFF"
                 text-color="#000000"
                 active-text-color="#FF1232">
          <el-menu-item index="/welcome">首页</el-menu-item>
          <el-menu-item index="/shop">商城</el-menu-item>
          <el-menu-item index="/goodinfo">商品详情</el-menu-item>
        </el-menu>
      </el-col>
      <el-col :span="7">
        <el-row type="flex"
                justify="end"
                class="head_right">
          <el-col :span="4"><i class="el-icon-search"></i></el-col>
          <el-col :span="3"><i class="el-icon-user"></i></el-col>
          <el-col :span="3">
            <el-badge :value="cardNum">
              <i class="el-icon-shopping-bag-1"></i>
            </el-badge>
          </el-col>
          <el-col :span="7"><i @click="logout"
               class="el-icon-close"></i></el-col>
        </el-row>
      </el-col>
    </el-row>

  </div>
</template>

<script>
export default {
  name: 'Navigation',
  data () {
    return {
      isCollapse: false,
      whatMode: 'horizontal'
    }
  },
  computed: {
    cardNum () {
      return this.$store.state.cardNum
    }
  },
  methods: {
    logout () {
      this.$confirm('确定要退出吗？', '提示', {
        confirmButtonText: '残忍离开',
        cancelButtonText: '我不是，我没有',
        type: 'warning'
      })
        .then(() => {
          window.sessionStorage.clear()
          this.$message.success('退出成功')
          this.$router.push('/login')
        })
        .catch(() => {
          this.$message.success('不退出啦，手滑点错了喽')
        })
    }
  }
}
</script>
<style lang="less" scoped>
div {
  // width: 200px;
}
.title {
  font-family: "Courier New", Courier, monospace;
  z-index: 9999;
  font-size: 38px;
  line-height: 80px;
  color: #ff1232;
  font-weight: 600;
}
.el-menu {
  padding-top: 10px;
  border: none;
  .el-menu-item {
    font-size: 15px;
    font-weight: 500;
  }
}
.head_right {
  padding-top: 20px;
  height: 100%;
  .el-col {
    line-height:40px;
    font-size: 20px;
    font-weight: 800;
    .el-badge {
      font-size: 15px;
      font-weight: 400;

      i {
        font-size: 20px;
      }
    }
  }
  .el-col:hover {
    color: #ff1232;
  }
}
</style>
