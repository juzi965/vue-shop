<template>
  <div>
    <el-row v-if="clothingInfo">
      <el-col :span="imgSpan">
        <el-carousel :height="imgHeight"
          indicator-position="none">
          <el-carousel-item v-for="pictureInfo in clothingInfo.pictureInfoList"
            :key="pictureInfo.id">
            <img class="image"
              :src="pictureInfo.fileDomain+pictureInfo.path" />
          </el-carousel-item>
        </el-carousel>
      </el-col>
      <el-col :span="8"
        :class="{'goods-info':true,'isFixed':isFixed,'hidden-xs-only':true}">
        <el-row>
          <el-col>
            <h1>{{clothingInfoForm.name}}</h1>
          </el-col>
          <el-col>
            <span style="font-size:20px">价格：￥&nbsp;{{clothingInfoForm.price}}</span>
          </el-col>
          <el-col>
            <span style="font-size:18px">{{clothingInfoForm.content}}</span>
          </el-col>
          <el-col>
            <el-radio-group v-model="clothingInfoForm.size"
              @change="changeSize"
              size="small">
              <el-radio-button v-for="(attr,index) in clothingInfo.clothingAttrList"
                :key="index"
                :label="attr.size"></el-radio-button>
            </el-radio-group>
          </el-col>

          <el-col>
            <el-input-number v-model="clothingInfoForm.num"
              :min="1"
              :max="clothingInfoForm.stock"
              controls-position="right"
              style="width:100%"
              label="商品购买数量"></el-input-number>
          </el-col>
          <el-col>
            <el-button v-if="clothingInfoForm.stock>0"
              type="primary"
              style="width:100%"
              @click="addShoppingCart">添加购物车</el-button>
            <el-button v-else
              type="primary"
              style="width:100%"
              disabled>暂时无货</el-button>
          </el-col>
        </el-row>
      </el-col>
      <el-col :span="24"
        class="hidden-sm-and-up goods-info2">
        <el-row>
          <el-col>
            <h1>{{clothingInfoForm.name}}</h1>
          </el-col>
          <el-col>
            <span style="font-size:20px">价格：￥&nbsp;{{clothingInfoForm.price}}</span>
          </el-col>
          <el-col>
            <span style="font-size:18px">{{clothingInfoForm.content}}</span>
          </el-col>
          <el-col>
            <el-radio-group v-model="clothingInfoForm.size"
              @change="changeSize"
              size="small">
              <el-radio-button v-for="(attr,index) in clothingInfo.clothingAttrList"
                :key="index"
                :label="attr.size"></el-radio-button>
            </el-radio-group>
          </el-col>

          <el-col>
            <el-input-number v-model="clothingInfoForm.num"
              :min="1"
              :max="clothingInfoForm.stock"
              controls-position="right"
              style="width:100%"
              label="商品购买数量"></el-input-number>
          </el-col>
          <el-col>
            <el-button v-if="clothingInfoForm.stock>0"
              type="primary"
              style="width:100%"
              @click="addShoppingCart">添加购物车</el-button>
            <el-button v-else
              type="primary"
              style="width:100%"
              disabled>暂时无货</el-button>
          </el-col>
        </el-row>
      </el-col>
    </el-row>
  </div>
</template>

<script>
export default {
  data() {
    return {
      screenWidth: '',
      screenHeight: '',
      imgHeight: '1200px',
      imgSpan: 16,
      isFixed: false,
      clothingInfo: {},
      clothingInfoForm: {
        clothingId: '',
        attrId: '',
        name: '',
        content: '',
        color: '',
        size: '',
        num: 1,
        stock: 0,
        price: 0,
        img: ''
      },
      currentIndex: 0,
      shoppingCart:
        JSON.parse(window.sessionStorage.getItem('shoppingCart')) || []
    }
  },
  created() {
    this.initData()
  },
  methods: {
    initData() {
      this.$http.get('/clothing/' + this.$route.query.id).then(res => {
        if (res.data.code == 10000) {
          this.clothingInfo = res.data.data
          this.clothingInfoForm.num = 1
          this.clothingInfoForm.clothingId = this.clothingInfo.id
          this.clothingInfoForm.name = this.clothingInfo.clothingName
          this.clothingInfoForm.content = this.clothingInfo.clothingContent
          this.clothingInfoForm.attrId = this.clothingInfo.clothingAttrList[
            this.currentIndex
          ].id
          this.clothingInfoForm.size = this.clothingInfo.clothingAttrList[
            this.currentIndex
          ].size
          this.clothingInfoForm.price = this.clothingInfo.clothingAttrList[
            this.currentIndex
          ].price
          this.clothingInfoForm.stock = this.clothingInfo.clothingAttrList[
            this.currentIndex
          ].stock
          this.clothingInfoForm.img =
            this.clothingInfo.pictureInfoList[0].fileDomain +
            this.clothingInfo.pictureInfoList[0].path
        }
      })
    },
    changeSize(size) {
      this.currentIndex = this.clothingInfo.clothingAttrList.findIndex(
        item => item.size === size
      )
      this.clothingInfoForm.num = 1
      this.clothingInfoForm.attrId = this.clothingInfo.clothingAttrList[
        this.currentIndex
      ].id
      this.clothingInfoForm.price = this.clothingInfo.clothingAttrList[
        this.currentIndex
      ].price
      this.clothingInfoForm.stock = this.clothingInfo.clothingAttrList[
        this.currentIndex
      ].stock
    },
    addShoppingCart() {
      let that = this
      if (
        this.shoppingCart.findIndex(
          item =>
            item.clothingId === that.clothingInfoForm.clothingId &&
            item.size === that.clothingInfoForm.size
        ) > -1
      ) {
        this.$message.warning('您已添加过该商品，请去购物车进行相关操作')
      } else {
        this.shoppingCart.push(this.clothingInfoForm)
        this.$store.commit('setShoppingCart', this.shoppingCart)
        this.shoppingCart = JSON.parse(
          window.sessionStorage.getItem('shoppingCart')
        )
        this.$message.success('添加成功')
      }
    },
    handleScroll() {
      let scrollTop =
        window.pageYOffset ||
        document.documentElement.scrollTop ||
        document.body.scrollTop
      if (scrollTop < 800) {
        this.isFixed = false
      } else {
        this.isFixed = true
      }
    }
  },
  mounted() {
    this.screenWidth =
      window.innerWidth ||
      document.documentElement.clientWidth ||
      document.body.clientWidth
    if (this.screenWidth < 768) {
      this.imgSpan = 24
      this.imgHeight = '550px'
    } else {
      this.imgSpan = 16
      this.imgHeight = '1200px'
    }
    this.screenHeight = document.body.clientHeight
    window.onresize = () => {
      return (() => {
        this.screenWidth =
          window.innerWidth ||
          document.documentElement.clientWidth ||
          document.body.clientWidth

        this.screenHeight = document.body.clientHeight
        if (this.screenWidth < 768) {
          this.imgSpan = 24
          this.imgHeight = '550px'
        } else {
          this.imgSpan = 16
          this.imgHeight = '1200px'
        }
      })()
    }
    window.addEventListener('scroll', this.handleScroll)
  },
  destroyed() {
    window.removeEventListener('scroll', this.handleScroll)
  },
  components: {}
}
</script>

<style lang="less" scoped>
.image {
  width: 100%;
  height: auto;
}

.isFixed {
  // position: fixed;
  // right: 0;
  // top: 80px;
  // z-index: 998;
  transition: all 0.3s ease-in-out;
  transform: translateX(500px) !important;
}
.el-carousel {
  height: 100%;
}
.goods-info {
  position: fixed;
  right: 0;
  top: 80px;
  z-index: 998;
  text-align: center;
  transition: all 0.3s ease-in-out;
  transform: translateX(0px);
  padding: 20px;
  .el-row {
    padding-bottom: 40px;
    .el-col {
      margin-bottom: 45px;
    }
  }
}
.goods-info2 {
  text-align: center;
  .el-row {
    padding-bottom: 20px;
    .el-col {
      margin-bottom: 20px;
    }
  }
}
.el-rate {
  .el-icon-sunrise {
    font-size: 30px;
  }
}
</style>
