<template>
  <div>
    <el-row>
      <el-col :span="12">
        <img class="image"
             src="https://static.zara.cn/photos///2019/I/0/3/p/6545/287/704/4/cb-0-0-4095-2740-Center/w/1920/6545287704_2_10_1.jpg?ts=1573666821573" />
      </el-col>
      <el-col :span="12"
              class="goods-info">
        <el-row>
          <el-col :span="6">
            <h1>{{goodsInfo.goodsName}}</h1>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="6">
            <h2>￥&nbsp;{{goodsInfo.goodsPrice}}</h2>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="12">
            <el-radio-group v-model="selectColor"
                            size="small">
              <el-radio-button v-for="(color,index) in goodsInfo.goodsColors"
                               :key="index"
                               :label="color">{{color}}</el-radio-button>
            </el-radio-group>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="12">
            <el-radio-group v-model="selectSize"
                            size="small">
              <el-radio-button v-for="(size,index) in goodsInfo.goodsSizes"
                               :key="index"
                               :label="size">{{size}}</el-radio-button>
            </el-radio-group>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="12">
            <el-input-number v-model="goodsInfo.goodsNum"
                             :min="1"
                             :max="999"
                             size="mini"
                             label="商品购买数量"></el-input-number>
          </el-col>
        </el-row>
      </el-col>
    </el-row>
  </div>
</template>

<script>
export default {
  data () {
    return {
      goodsInfo: {
        goodsName: "儿童套装",
        goodsPrice: "200",
        goodsColors: ['red', 'green', 'blue'],
        goodsSizes: ['S', 'M', 'L', 'XL'],
        goodsNum: 1
      },
      selectSize: "",
      selectColor: ""
    }
  },
  methods: {
  },
  components: {

  },
  computed: {
    getGoodsDefaultInfo () {
      return {
        percentage: 100 / this.goodsInfo.goodsSizes.length,
        goodsSize: this.goodsInfo.goodsSizes[0],
        goodsColor: this.goodsInfo.goodsColors[0]
      }
    }
  }
}
</script>

<style lang="less" scoped>
.image {
  width: 100%;
  height: auto;
}
.goods-info {
  padding: 20px;
  .el-row {
    padding-bottom: 30px;
  }
  h2 {
    color: #ff1232;
  }
}
.el-rate {
  .el-icon-sunrise {
    font-size: 30px;
  }
}
</style>
