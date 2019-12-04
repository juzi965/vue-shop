<template>
  <div class="main_carousel">
    <el-carousel height="600px"
                 :interval="5000"
                 arrow="always">
      <el-carousel-item v-for="(carousel,index) in carousels"
                        :key="index">

        <el-image class="image_size"
                  fit=""
                  :src="carousel"></el-image>
      </el-carousel-item>
    </el-carousel>
  </div>
</template>

<script>
export default {
  data () {
    return {
      carousels: [require('../assets/images/carousel/carousel_01.jpg'), require('../assets/images/carousel/carousel_02.jpg'), require('../assets/images/carousel/carousel_03.jpg')],
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
}
</style>
