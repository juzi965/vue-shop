<template>
  <div class="main_carousel">
    <el-carousel height="700px"
      :interval="5000"
      arrow="never">
      <el-carousel-item v-for="(clothingInfo,index) in clothingInfos"
        :key="index">

        <img class="image_size"
          fit="fill"
          @click="getClothingInfo(clothingInfo.id)"
          :src="clothingInfo.pictureInfoList[0].fileDomain+clothingInfo.pictureInfoList[0].path" />
        <img class="image_size"
          fit="fill"
          @click="getClothingInfo(clothingInfo.id)"
          :src="clothingInfo.pictureInfoList[1].fileDomain+clothingInfo.pictureInfoList[1].path" />
      </el-carousel-item>
    </el-carousel>

  </div>
</template>

<script>
export default {
  data() {
    return {
      clothingInfos: {}
    }
  },
  created() {
    this.initData()
  },
  methods: {
    initData() {
      this.$http.get('/clothing/category/男士/1/5').then(res => {
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

<style>
.image_size {
  width: 50%;
}
</style>
