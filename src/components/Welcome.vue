<template>
  <div class="main_carousel">
    <el-carousel indicator-position="none"
                 height="700px"
                 :interval="5000"
                 arrow="never">
      <el-carousel-item v-for="(carousel,index) in carouselsSend"
                        :key="index">

        <img class="image_size"
             fit="contain"
             :src="carousel" />
        <img class="image_size"
             fit="contain"
             :src="carousel" />
      </el-carousel-item>
    </el-carousel>
    <el-carousel type="card"
                 height="500px"
                 :interval="5000"
                 arrow="always">
      <el-carousel-item v-for="(carousel,index) in carouselsFirst"
                        :key="index">

        <img class="image_size"
             fit="contain"
             :src="carousel" />
      </el-carousel-item>
    </el-carousel>
  </div>
</template>

<script>
export default {
  data () {
    return {
      carouselsFirst: [require('../assets/images/carousel/carousel_01.jpg'), require('../assets/images/carousel/carousel_02.jpg'), require('../assets/images/carousel/carousel_03.jpg')],
      carouselsSend: [require('../assets/images/carousel/zara/zara_2_1.jpg'), require('../assets/images/carousel/zara/zara_2_2.jpg')]
    }
  },
  methods: {

  },
  components: {

  }
}
</script>

<style>
.image_size {
  width: 50%;
  height: 97%;
}
</style>
