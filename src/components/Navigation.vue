<template>
  <div class="nav">
    <el-row>
      <el-col :span="4"
        style="float:left;line-height: 80px;">
        <img src="https://file.hooya.top:8080/logo/logo.png"
          width="80%">
      </el-col>
      <el-col :span="2"
        class="hidden-sm-and-up"
        style="width:100px">
        <span class="el-icon-s-unfold menuD"
          @click="changeMenuDrawer()">

        </span>
      </el-col>
      <el-col :span="6"
        class="hidden-xs-only">
        <el-menu :default-active="this.$route.path"
          router
          :collapse="isCollapse"
          :mode="whatMode"
          background-color="#FFFFFF"
          text-color="#000000"
          active-text-color="#FF1232">
          <el-menu-item index="/welcome">首页</el-menu-item>
          <el-submenu index="/shop/全部">
            <template slot="title">商城</template>
            <el-menu-item index="/shop/全部">全部</el-menu-item>
            <el-menu-item index="/shop/男士">男士</el-menu-item>
            <el-menu-item index="/shop/女士">女士</el-menu-item>
            <el-menu-item index="/shop/儿童">儿童</el-menu-item>
            <el-menu-item index="/shop/上衣">上衣</el-menu-item>
            <el-menu-item index="/shop/裤子">裤子</el-menu-item>
            <el-menu-item index="/shop/内衣">内衣</el-menu-item>
            <el-menu-item index="/shop/帽子">帽子</el-menu-item>
          </el-submenu>
          <!-- <el-menu-item index="/fitting-room">试衣间</el-menu-item> -->
        </el-menu>
      </el-col>
      <el-col :span="12"
        style="float:right">
        <el-row type="flex"
          justify="end"
          class="head_right"
          :gutter="20">
          <el-col :span="16"
            :offset="-3">
            <el-input v-model="keyWord"
              suffix-icon="el-icon-search"
              placeholder="搜索商品"
              size="small"
              @keyup.enter.native="onEnterSearch" />
          </el-col>
          <el-col :span="3"><i class="el-icon-user"
              @click="myAccount"></i></el-col>
          <el-col :span="3">
            <el-badge :value="this.shoppingCart.length">
              <i class="el-icon-shopping-bag-1"
                @click="pushShoppingCart"></i>
            </el-badge>
          </el-col>
          <el-col :span="3"><i @click="logout"
              class="el-icon-close"></i></el-col>
        </el-row>
      </el-col>
    </el-row>
  </div>
</template>

<script>
export default {
  name: 'Navigation',
  data() {
    return {
      menuDrawer: false,
      isCollapse: false,
      whatMode: 'horizontal',
      seachRules: {
        seach: [{ message: '请输入活动名称' }]
      },
      keyWord: ''
    }
  },
  computed: {
    shoppingCart() {
      return this.$store.state.shoppingCart
    }
  },
  methods: {
    changeMenuDrawer() {
      this.$store.commit('setMenuDrawer', !this.$store.state.menuDrawer)
    },
    onEnterSearch() {
      this.$router.push({
        path: '/shop/' + this.keyWord
      })
    },
    myAccount() {
      this.$router.push('/my-account').catch(error => {
        console.log(error)
      })
    },
    pushShoppingCart() {
      this.$router.push('/shopping-cart').catch(error => {
        console.log(error)
      })
    },
    logout() {
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
          this.$message.success('手滑点错了')
        })
    }
  }
}
</script>
<style lang="less" scoped>
.title {
  z-index: 2000;
  color: #000;
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
    line-height: 40px;
    font-size: 20px;
    font-weight: 800;
    i {
      cursor: pointer;
    }
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

.el-submenu .el-menu-item {
  min-width: 100px;
}
.menuD {
  line-height: 80px;
  font-size: 25px;
}
.menuD:hover {
  color: #ff1232;
}
</style>
