<template>
  <div>
    <el-row :gutter="20">
      <el-col :span="4"
        class="hidden-sm-and-down">
        <el-menu :default-active="$route.path"
          router
          :collapse="false"
          background-color="#FFFFFF"
          text-color="#000000"
          active-text-color="#FF1232"
          style="height:480px">
          <el-menu-item index="/user-info">个人信息</el-menu-item>
          <el-menu-item index="/order-info">订单信息</el-menu-item>
          <el-menu-item index="/address-info">收货地址</el-menu-item>
          <el-menu-item index="/change-password">修改密码</el-menu-item>
          <!-- <el-menu-item index="1-3">退换货</el-menu-item> -->
        </el-menu>
      </el-col>
      <el-col :span="24"
        class="hidden-md-and-up">
        <el-menu :default-active="$route.path"
          router
          mode="horizontal"
          :collapse="false"
          background-color="#FFFFFF"
          text-color="#000000"
          active-text-color="#FF1232">

          <el-menu-item index="/user-info">个人信息</el-menu-item>
          <el-menu-item index="/order-info">订单信息</el-menu-item>
          <el-menu-item index="/address-info">收货地址</el-menu-item>
          <el-menu-item index="/change-password">修改密码</el-menu-item>
          <!-- <el-menu-item index="1-3">退换货</el-menu-item> -->
        </el-menu>
      </el-col>
      <el-col :span="contentSapn">
        <router-view />
      </el-col>
    </el-row>

  </div>
</template>

<script>
export default {
  data() {
    return {
      contentSapn: 20
    }
  },
  methods: {},
  components: {},
  mounted() {
    this.screenWidth =
      window.innerWidth ||
      document.documentElement.clientWidth ||
      document.body.clientWidth
    if (this.screenWidth < 991) {
      this.contentSapn = 24
    }
    window.onresize = () => {
      return (() => {
        this.screenWidth =
          window.innerWidth ||
          document.documentElement.clientWidth ||
          document.body.clientWidth
        if (this.screenWidth < 991) {
          this.contentSapn = 24
        } else {
          this.contentSapn = 20
        }
      })()
    }
  }
}
</script>

<style lang="less" scoped>
</style>

