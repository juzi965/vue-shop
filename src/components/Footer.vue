<template>
  <div>
    <el-divider></el-divider>
    <el-row :gutter="20" type="flex" justify="center">
      <el-col :span="6">
        <ul>
          <li class="title">帮助</li>
          <li>产品</li>
          <li>支付</li>
          <li>运送</li>
        </ul>
      </el-col>
      <el-col :span="6">
        <ul>
          <li class="title">关注我们</li>
          <li>产品</li>
          <li>支付</li>
          <li>运送</li>
        </ul>
      </el-col>
      <el-col :span="6">
        <ul>
          <li class="title">公司</li>
          <li>产品</li>
          <li>支付</li>
          <li>运送</li>
        </ul>
      </el-col>
    </el-row>
    <el-divider></el-divider>
    <el-row :gutter="20" type="flex" justify="space-around">
      <el-col :span="6" class="footer-left">
        <span>中国</span>
      </el-col>
      <el-col :span="12" class="footer-left" style="text-align: center;">
        <span style="font-size:14px;"
          >注 · 本网站仅为学习使用，所有图片资源均来自<a
            href="https://www.zara.cn/cn/"
            target="_blank"
            >ZARA中国官网</a
          >如有侵权，联系删除 Email·juzi965@outlook.com</span
        >
      </el-col>
      <el-col :span="6" class="footer-right">
        <span>简体中文</span>
      </el-col>
    </el-row>
  </div>
</template>

<script>
export default {
  name: 'Footer',
  data() {
    return {}
  },
  methods: {},
  components: {}
}
</script>

<style lang="less" scoped>
ul {
  text-align: center;
  > li {
    margin-bottom: 15px;
    list-style: none;
  }
  .title {
    font-weight: 600;
    margin-bottom: 25px;
  }
}
.footer-left {
  text-align: left;
  margin-bottom: 100px;
}
.footer-right {
  text-align: right;
  margin-bottom: 100px;
}
</style>
