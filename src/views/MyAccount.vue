<template>
  <div>
    <el-row :gutter="20">
      <el-col :span="3">
        <el-menu :default-active="$route.path"
                 router
                 :collapse="false"
                 background-color="#FFFFFF"
                 text-color="#000000"
                 active-text-color="#FF1232">

          <el-menu-item index="/user-info">个人信息</el-menu-item>
          <el-menu-item index="/order-info">订单信息</el-menu-item>
          <el-menu-item index="/address-info">收货地址</el-menu-item>
          <el-menu-item index="/change-password">修改密码</el-menu-item>
          <el-menu-item index="1-3">退换货</el-menu-item>
        </el-menu>
      </el-col>
      <el-col :span="20">
        <router-view />
      </el-col>
    </el-row>

  </div>
</template>

<script>
export default {
  data () {
    return {

    }
  },
  methods: {

  },
  components: {

  }
}
</script>

<style lang="less" scoped>
</style>

