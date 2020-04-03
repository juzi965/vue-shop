<template>
  <div>
    <el-card v-if="shoppingCart">
      <div slot="header"
        class="clearfix">
        <span>购物车</span>
      </div>
      <el-table :data="shoppingCart"
        max-height="400">
        <el-table-column label="图片"
          align="center">
          <template slot-scope="scope">
            <img :src="scope.row.img"
              height="50" />
          </template>
        </el-table-column>
        <el-table-column prop="name"
          label="商品名"
          align="center">
        </el-table-column>
        <el-table-column prop="size"
          label="大小"
          align="center">
        </el-table-column>
        <el-table-column label="数量"
          align="center">
          <template slot-scope="scope">
            <el-input-number v-model="scope.row.num"
              :min="1"
              :max="scope.row.stock"
              size="mini"
              label="商品购买数量"
              @change="changeClothingNum"
              style="width:100%"></el-input-number>
          </template>
        </el-table-column>
        <el-table-column prop="stock"
          label="库存量"
          align="center">
        </el-table-column>
        <el-table-column prop="price"
          label="单价"
          align="center">
        </el-table-column>
        <el-table-column label="小计"
          align="center">
          <template slot-scope="scope">
            <span>{{ (scope.row.num * scope.row.price).toFixed(2) }}</span>
          </template>
        </el-table-column>
        <el-table-column label="操作"
          align="center">
          <template slot-scope="scope">
            <el-button size="mini"
              type="danger"
              @click="deleteItem(scope.$index, scope.row)">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
      <el-row type="flex"
        justify="end"
        style="padding-top:20px"
        :gutter="20">
        <el-col>
          <h3>收件人：{{ currentAddressInfo.recipient }}</h3>
          <h4>手机号：{{ currentAddressInfo.phoneNum }}</h4>
          <p>收货地址：{{ currentAddressInfo.address }}</p>
        </el-col>
        <el-col :span="4">
          <el-tag type="success"
            effect="dark"
            style="height:36px;line-height:36px;font-size:15px;">总价：{{ totalPrice }} ￥</el-tag>
        </el-col>
        <el-col :span="3">
          <el-button type="warning"
            size="medium "
            @click="drawer = true"
            style="">更改地址</el-button>
        </el-col>
        <el-col :span="3">
          <el-button type="primary"
            size="medium "
            @click="createOrder"
            :disabled="shoppingCart.length == 0">提交订单</el-button>
        </el-col>
      </el-row>
    </el-card>
    <el-drawer size="50%"
      title="请选择地址"
      :visible.sync="drawer"
      direction="ttb">
      <el-row :gutter="20"
        style="padding:50px">
        <el-radio-group v-model="currentAddressInfoIndex"
          @change="changeAddress">
          <el-radio v-for="(addressInfo, index) in addressInfos"
            :key="addressInfo.id"
            :label="index">
            <el-col>
              <h4>
                收件人：<span>{{ addressInfo.recipient }}</span>
              </h4>
              <p>
                手机号：<span>{{ addressInfo.phoneNum }}</span>
              </p>
              <span>收货地址：<span>{{ addressInfo.address }}</span></span>
              <el-divider></el-divider>
            </el-col>
          </el-radio>
        </el-radio-group>
      </el-row>
    </el-drawer>

    <el-drawer size="70%"
      :visible.sync="drawerQrCode"
      direction="ttb"
      @open="showQrCode"
      @close="closeQrCode">
      <el-row type="flex"
        justify="center">
        <el-col :span="4"
          style="text-align:center">
          <img src="https://gw.alipayobjects.com/zos/basement_prod/dd285986-f1d3-40a2-a92c-b252f2c31de0.svg"
            alt="alipayLogo"
            style="margin-bottom:10px" />
          <h4 style="margin-bottom:20px">推荐支付宝付款</h4>
          <div ref="qrCodeDiv"
            style="margin-bottom:20px"
            id="qrcode">
            正在加载二维码...
          </div>
          <el-button @click="showQrCode"
            type="primary"
            icon="el-icon-refresh"
            circle></el-button>
        </el-col>
      </el-row>
    </el-drawer>
  </div>
</template>

<script>
import QRCode from 'qrcodejs2'
const qs = require('qs')
export default {
  data() {
    return {
      shoppingCart:
        JSON.parse(window.sessionStorage.getItem('shoppingCart')) || [],
      addressInfos: [],
      currentAddressInfo: {},
      currentAddressInfoIndex: 0,
      drawer: false,
      drawerQrCode: false,
      orderId: '',
      timer: null
    }
  },
  created() {
    this.getAddressInfo()
  },
  methods: {
    changeAddress(index) {
      this.currentAddressInfoIndex = index
      this.currentAddressInfo = this.addressInfos[this.currentAddressInfoIndex]
    },
    changeClothingNum() {
      this.$store.commit('setShoppingCart', this.shoppingCart)
    },
    getAddressInfo() {
      this.$http.get('/address').then(res => {
        if (res.data.code == 10000) {
          this.addressInfos = res.data.data
          this.currentAddressInfo = this.addressInfos[
            this.currentAddressInfoIndex
          ]
        }
      })
    },
    deleteItem(index, row) {
      this.shoppingCart.splice(index, 1)
      this.$store.commit('setShoppingCart', this.shoppingCart)
    },
    createOrder() {
      if (this.addressInfos.length === 0) {
        this.$message.warning('请先创建收货地址')
        this.$router.push('/address-info')
      }

      this.$http
        .post('/order/create/' + this.currentAddressInfo.id, this.shoppingCart)
        .then(res => {
          if (res.data.code == 10000) {
            this.$message.success('订单创建成功')
            this.shoppingCart = []
            this.$store.commit('setShoppingCart', this.shoppingCart)
            this.orderId = res.data.data
            this.drawerQrCode = true
          }
        })
    },
    showQrCode() {
      this.$http
        .post('/order/qrcode', qs.stringify({ orderId: this.orderId }))
        .then(res => {
          if (res.data.code == 10000) {
            document.getElementById('qrcode').innerHTML = ''
            new QRCode(this.$refs.qrCodeDiv, {
              text: res.data.data,
              width: 200,
              height: 200,
              colorDark: '#333333', //二维码颜色
              colorLight: '#ffffff', //二维码背景色
              correctLevel: QRCode.CorrectLevel.L //容错率，L/M/H
            })
            clearTimeout(this.timer)
            this.timer = null
            this.timer = setInterval(() => {
              this.getPayState()
            }, 3000)
          } else {
            document.getElementById('qrcode').innerHTML = ''
          }
        })
    },
    getPayState() {
      this.$http
        .post('/order/pay-state', qs.stringify({ orderId: this.orderId }))
        .then(res => {
          if (res.data.code == 10000) {
            this.drawerQrCode = false
            this.$message.success('支付成功')
            clearInterval(this.timer)
            this.timer = null
          }
        })
    },
    closeQrCode() {
      clearTimeout(this.timer)
      this.timer = null
    }
  },
  destroyed() {
    clearTimeout(this.timer)
    this.timer = null
  },
  computed: {
    totalPrice() {
      let sum = 0
      for (let i = 0; i < this.shoppingCart.length; i++) {
        sum += this.shoppingCart[i].price * this.shoppingCart[i].num
      }
      return Number(sum.toFixed(2))
    }
  },
  components: {}
}
</script>

<style lang="less" scoped></style>
