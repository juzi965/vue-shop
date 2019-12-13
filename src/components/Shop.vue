<template>
  <div>
    <div class="shop-content">
      <el-row :gutter="30">
        <el-col :xs="24"
                :sm="12"
                :md="8"
                :lg="6"
                :xl="4"
                v-for="(o, index) in 10"
                :key="index">
          <el-card :body-style="{ padding: '0px' }"
                   class="shop-card">
            <img class="image"
                 src="https://static.zara.cn/photos///2019/I/0/3/p/6545/287/704/4/cb-0-0-4095-2740-Center/w/1920/6545287704_2_10_1.jpg?ts=1573666821573" />
            <div class="shop-card-options">
              <span>冬季上新款，折上折</span>
              <el-button-group>
                <el-button icon="el-icon-star-off"
                           size="small"
                           circle></el-button>
                <el-button icon="el-icon-shopping-cart-2"
                           size="small"
                           @click="cardNum++"
                           circle></el-button>
              </el-button-group>
            </div>
          </el-card>
        </el-col>
      </el-row>
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      cardNum: this.$store.state.cardNum
    }
  },
  watch: {
    'cardNum': function (newVal, oldVal) {
      // 用vuex管理购物车商品数量
      this.$store.commit('addCardNum', newVal)
    }
  },
  methods: {

  },
  components: {}
}
</script>

<style lang="less" scoped>
.shop-content {
  .el-col {
    transform: translateY(10px);
    margin-bottom: 30px;
    .shop-card {
      position: relative;
      margin: 0 auto;
      display: flex;
      justify-content: center;
      max-width: 400px;
    }
  }
}
.el-col:hover {
  transform: translateY(0px);
  transition: all 0.3s ease-in-out;
  .shop-card-options {
    transform: translateY(0px);
  }
}
.shop-card-options {
  font-size: 13px;
  text-align: right;
  line-height: 50px;
  padding-right: 10px;
  position: absolute;
  width: 100%;
  height: 50px;
  left: 0px;
  bottom: 0px;
  background-color: #fff;
  transform: translateY(50px);
  transition: all 0.3s ease-in-out;
}
.image {
  width: 100%;
  height: auto;
}
</style>
