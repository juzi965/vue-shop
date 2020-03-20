<template>
  <div>
    <div class="shop-content">
      <el-row :gutter="30">
        <template v-for="clothing in clothingInfos">
          <el-col :xs="24"
            :sm="12"
            :md="6"
            :lg="4"
            :xl="4"
            :key="clothing.id"
            v-if="clothing.pictureInfoList.length>0">
            <el-card :body-style="{ padding: '0px' }"
              class="shop-card">
              <img @click="getClothingInfo(clothing.id)"
                class="image"
                :src="
                clothing.pictureInfoList[0].fileDomain +
                  clothing.pictureInfoList[0].path
              " />
              <div class="clothing-price ">
                <span>￥ {{ clothing.clothingAttrList[0].price }}</span>
              </div>
              <div class="shop-card-options">
                <span>{{ clothing.clothingName }}</span>
              </div>
            </el-card>
          </el-col>
        </template>

      </el-row>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      clothingInfos: ''
    }
  },
  created() {
    this.initData()
  },
  watch: {
    //监听相同路由下参数变化的时候，从而实现异步刷新
    $route(to, from) {
      this.initData()
    }
  },
  methods: {
    initData() {
      this.$http
        .get('/clothing/category/' + this.$route.params.name + '/1/1000')
        .then(res => {
          if (res.data.code == 10000) {
            this.clothingInfos = res.data.data.list
          } else {
            this.$message.warning(res.data.message)
          }
        })
    },
    getClothingInfo(id) {
      this.$router.push({
        path: '/fitting-room',
        query: {
          id: id
        }
      })
    }
  },
  components: {}
}
</script>

<style lang="less" scoped>
.shop-content {
  .el-col {
    transform: translateY(5px);
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
.clothing-price {
  position: absolute;
  top: 10px;
  right: 10px;
  font-size: 14px;
}
.el-col:hover {
  transform: translateY(0px);
  transition: all 0.3s ease-in-out;
  .shop-card-options {
    transform: translateY(0px);
  }
}
.shop-card-options {
  font-size: 14px;
  text-align: center;
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
  display: block;
  min-height: 290px;
  object-fit: cover;
}
</style>
