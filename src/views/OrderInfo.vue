<template>
  <div>
    <el-card>
      <div slot="header"
           class="clearfix">
        <span>订单信息</span>
      </div>
      <div v-for="(orderInfo, index) in pageInfo.list"
           :key="index">
        <el-row :gutter="20">
          <el-col :span="3">
            <img :src="orderInfo.orderItem[0].imgUrl"
                 class="image" />
          </el-col>
          <el-col :span="18">
            <el-row>
              <el-col :span="11">
                <span style="font-size:14px;display:block;margin-bottom:10px">订单号：{{ orderInfo.orderId }}</span>
              </el-col>
              <el-col :span="8"> <span style="font-size:14px;display:block;margin-bottom:10px">下单时间：{{orderInfo.createTime}}</span></el-col>
              <el-col :span="5">
                <span style="font-size: 18px;">金额：￥{{ orderInfo.totalPrice }}</span>
              </el-col>

              <el-col :span="11">
                <h4 style="margin-top: 10px;">收件人：{{ orderInfo.addressInfo.recipient }}</h4>
                <p style="margin-top: 5px;margin-bottom: 5px;">手机号：{{ orderInfo.addressInfo.phoneNum }}</p>
                <span style="font-size: 15px;">收货地址：{{ orderInfo.addressInfo.address }}</span>
              </el-col>
              <el-col :span="13"
                      style="height:100px; margin-top: 10px;">
                <el-scrollbar style="height:100%;">
                  <el-tooltip placement="bottom"
                              v-for="(item, index) in orderInfo.orderItem"
                              :key="index">
                    <div slot="content">
                      尺寸：{{ item.size }} <br />数量：{{
                      item.num
                    }}
                      件<br />单价：{{ item.price }} 元<br />介绍：{{
                      item.clothingContent
                    }}
                    </div>
                    <el-button type="primary"
                               size="small"
                               style="margin-top:10px;margin-left:10px"
                               @click="getClothingInfo(item.clothingId)"
                               plain>{{ item.clothingName }}</el-button>
                  </el-tooltip>
                </el-scrollbar>

              </el-col>
            </el-row>
          </el-col>

          <el-col :span="3">
            <el-row style="text-align: center;">
              <el-col style="margin-bottom:5px;">
                <el-button type="warning"
                           size="small"
                           @click="pay(orderInfo.orderId)"
                           v-if="orderInfo.payFlag === 0">去支付</el-button>
                <el-button type="warning"
                           size="small"
                           v-if="orderInfo.payFlag === 1">已支付</el-button>
              </el-col>
              <el-col style="margin-bottom:5px;">
                <el-button type="primary"
                           size="small"
                           v-if="orderInfo.expressNum === ''">等待发货</el-button>
                <el-button type="primary"
                           size="small"
                           v-if="orderInfo.expressNum !== ''">查询物流</el-button>
              </el-col>
              <el-col style="margin-bottom:5px;">
                <el-button type="success"
                           size="small"
                           @click="confirmReceipt(orderInfo.orderId)"
                           v-if="orderInfo.orderFlag === 0">确认收货</el-button>
                <el-button type="success"
                           size="small"
                           v-if="orderInfo.orderFlag === 1">收货成功</el-button>
              </el-col>
              <el-col>
                <el-button type="danger"
                           size="small"
                           @click="deleteOrder(orderInfo.orderId)">删除订单</el-button>
              </el-col>
            </el-row>
          </el-col>
        </el-row>
        <el-divider></el-divider>
      </div>
      <div style="text-align: center;">
        <el-pagination :page-size="5"
                       :page-sizes="[2, 5, 10, 50]"
                       layout="total,sizes,prev, pager, next"
                       @current-change="changeCurrentPage"
                       @size-change="changeSizePage"
                       :total="pageInfo.total">
        </el-pagination>
      </div>
    </el-card>
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
  data () {
    return {
      currentPage: 1,
      pageSize: 5,
      pageInfo: {},
      drawerQrCode: false,
      timer: null,
      orderId: ''
    }
  },
  created () {
    this.getData()
  },
  methods: {
    changeCurrentPage (pageNum) {
      this.currentPage = pageNum
      this.getData()
    },
    changeSizePage (pageSize) {
      this.pageSize = pageSize
      this.getData()
    },
    getData () {
      this.$http
        .get(
          '/order/' +
          this.currentPage +
          '/' +
          this.pageSize
        )
        .then(res => {
          if (res.data.code == 10000) {
            this.pageInfo = res.data.data
          } else {
            this.$message.warning(res.data.message)
          }
        })
    },
    getClothingInfo (id) {
      this.$router.push({
        path: '/fitting-room',
        query: {
          id: id
        }
      })
    },
    confirmReceipt (orderId) {
      this.$confirm('确定收货？', '提示', {
        confirmButtonText: '确认',
        cancelButtonText: '取消',
        type: 'warning'
      })
        .then(() => {
          const qs = require('qs')
          this.$http
            .post('/order/confirm-receipt', qs.stringify({ orderId: orderId }))
            .then(res => {
              if (res.data.code == 10000) {
                this.getData()
                this.$message.success('确认收货成功')
              } else {
                this.$message.warning(res.data.message)
              }
            })
        })
        .catch(() => {
          this.$message.warning('取消')
        })
    },
    deleteOrder (orderId) {
      this.$confirm('确定删除订单？', '提示', {
        confirmButtonText: '确认',
        cancelButtonText: '取消',
        type: 'warning'
      })
        .then(() => {
          const qs = require('qs')
          this.$http
            .post('/order/delete', qs.stringify({ orderId: orderId }))
            .then(res => {
              if (res.data.code == 10000) {
                this.getData()
                this.$message.success('订单删除成功')
              } else {
                this.$message.warning(res.data.message)
              }
            })
        })
        .catch(() => {
          this.$message.warning('取消删除')
        })
    },
    pay (orderId) {
      this.orderId = orderId
      this.drawerQrCode = true
    },
    showQrCode () {
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
            this.$message.warning(res.data.message)
          }
        })
    },
    getPayState () {
      this.$http
        .post('/order/pay-state', qs.stringify({ orderId: this.orderId }))
        .then(res => {
          if (res.data.code == 10000) {
            this.drawerQrCode = false
            this.$message.success('支付成功')
            clearInterval(this.timer)
            this.timer = null
            this.getData()
          }
        })
    },
    closeQrCode () {
      clearTimeout(this.timer)
      this.timer = null
    }
  },
  components: {}
}
</script>

<style lang="less">
.el-scrollbar__wrap {
  overflow-x: hidden;
}
.image {
  width: 100%;
  display: block;
  object-fit: cover;
}
</style>
