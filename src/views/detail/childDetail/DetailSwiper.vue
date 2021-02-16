<template>
  <div class="detail-swiper">
    <swiper class="swiper-img">
      <swiper-item v-for="(item,index) in topImages" :key="index" class="item">
        <img :src="item" alt="">
      </swiper-item>
    </swiper>
  </div>
</template>

<script>
  import { Swiper,SwiperItem } from "components/common/swiper";

  export default {
  name: 'DetailSwiper',
  props: {
    topImages: {
      type: Array,
      default() {
        }
    }
  },
  components: {
    Swiper,
    SwiperItem
  },
  data () {
    return {
    }
  }
}
</script>

<style  scoped>
  .swiper-img {
    height: 300px;
  }
  .swiper-img img {
    height: auto;
    width: 100%;
  }
</style>
