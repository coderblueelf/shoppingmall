<template>
  <div class="goods_detail">
    <detail-nav class="detail_nav" @titleClick="titleClick" ref="nav"></detail-nav>
    <scroll 
    class="content" 
    ref="scroll"
    @scroll="contentScroll"
    :probe-type="3">
    <ul>
      <li v-for="item in $store.state.cartList">
        {{item}}
      </li>
    </ul>
      <detail-swiper :top-images="topImages"></detail-swiper>
      <detail-base-info :goods="goods"></detail-base-info>
      <detail-shop-info :shop="shop"></detail-shop-info>
      <detail-goods-info :detail-info="detailInfo" @detailImageLoad="detailImageLoad"></detail-goods-info>
      <detail-param-info :param-info="paramInfo" ref="params"></detail-param-info>
      <detail-comment-info :comment-info="commentInfo" ref="comment"></detail-comment-info>
      <goods-list :goods="recommend" ref="recommend"></goods-list>
    </scroll>
    <detail-bottom-bar @addToCart="addToShoppingCart"></detail-bottom-bar>
    <back-top @click="backTopClick" v-show="isShowBackTop"></back-top>
  </div>
</template>

<script>
  import DetailNav from './childDetail/DetailNav'
  import DetailSwiper from './childDetail/DetailSwiper'
  import DetailBaseInfo from './childDetail/DetailBaseInfo'
  import DetailShopInfo from './childDetail/DetailShopInfo'
  import DetailGoodsInfo from './childDetail/DetailGoodsInfo'
  import DetailParamInfo from './childDetail/DetailParamInfo'
  import DetailCommentInfo from './childDetail/DetailCommentInfo'
  import DetailBottomBar from './childDetail/DetailBottomBar'

  import Scroll from 'components/common/scroll/Scroll'
  import GoodsList from 'components/content/goods/GoodsList'
  import BackTop from 'components/content/backtop/BackTop'

  import { getDetail, Goods, Shop, GoodsParam, getRecommend} from 'network/detail'
  import { debounce } from '@/common/utils'


  export default {
  name: 'Detail',
  components: {
    DetailNav,
    DetailSwiper,
    DetailBaseInfo,
    DetailShopInfo,
    DetailGoodsInfo,
    Scroll,
    DetailParamInfo,
    DetailCommentInfo,
    GoodsList,
    DetailBottomBar,
    BackTop
  },
  data () {
    return {
      iid: null,
      topImages: [],
      goods: {},
      shop: {},
      detailInfo: {},
      paramInfo: {},
      commentInfo: {},
      recommend: [],
      themeTopY: [],
      getThemeTopY: null,
      currentIndex: 0,
      isShowBackTop: false,
    }
  },
  created() {

    this.iid = this.$route.params.iid
    //详情数据
    getDetail(this.iid).then(res => {
      //console.log(res);

      const data = res.result

      //1.商品轮播图
      this.topImages = data.itemInfo.topImages
      //2.商品基本信息
      this.goods = new Goods(data.itemInfo, data.columns, data.shopInfo)
      //console.log(this.goods)
      //3.商家信息
      this.shop = new Shop(data.shopInfo)
      //console.log(this.shop)
      //4.商品详情数据
      this.detailInfo = data.detailInfo
      //console.log(this.shop)

      //5.商品参数
      this.paramInfo = new GoodsParam(data.itemParams.info, data.itemParams.rule)
      //console.log(this.paramInfo)

      //6.评论数据
      if(data.rate.cRate !== 0){
        this.commentInfo = data.rate.list[0]
      }

      this.getThemeTopY = debounce(() => {
        if(this.$refs.params && this.$refs.comment && this.$refs.recommend) {
        this.$nextTick(() => {
        this.themeTopY = []
        this.themeTopY.push(0)
        this.themeTopY.push(this.$refs.params.$el.offsetTop - 44)
        this.themeTopY.push(this.$refs.comment.$el.offsetTop - 44)
        this.themeTopY.push(this.$refs.recommend.$el.offsetTop - 44)
        this.themeTopY.push(Number.MAX_VALUE)
        console.log(this.themeTopY)
      })
      }

      }, 100)

    
    })

    //推荐数据
    getRecommend().then(res => {
      this.recommend = res.data.list
      //console.log(this.recommend)
    })
  },
  mounted() {
    
  },
  updated() {
  },
  methods: {
    detailImageLoad() {
      this.$refs.scroll.scroll.refresh()

      this.getThemeTopY()
    //点击标题滚动到对应内容
    },
    titleClick(index) {
      this.$refs.scroll.scroll.scrollTo(0, -this.themeTopY[index], 500)
    },
    //滚动内容对应标题
    contentScroll(position) {
      const positionY = -position.y

      let length = this.themeTopY.length
      for (let i = 0; i < length-1; i++) {
        if(this.currentIndex !== i && (positionY >= this.themeTopY[i] && positionY < this.themeTopY[i+1])){
          this.currentIndex = i;
          this.$refs.nav.currentIndex = this.currentIndex
        }
      }
      this.isShowBackTop = -position.y > 1000

    },
    //回到顶部
    backTopClick() {
      this.$refs.scroll.scroll.scrollTo(0,0,500)
    },
    //添加商品到购物车
    addToShoppingCart() {
      const product = {}
      product.image = this.topImages[0];
      product.title = this.goods.title;
      product.desc = this.goods.desc;
      product.price = this.goods.realPrice;
      product.iid = this.iid

      this.$store.dispatch('addToShoppingCart', product)
    }
  }
}
</script>

<style  scoped>
  .goods_detail {
    position: relative;
    z-index: 9999;
    background-color: #fff;
    height: 100vh;
  }
  .detail_nav {
    position: relative;
    z-index: 9999;
    background-color: #fff;
  }

  .content {
    height: calc(100% - 93px);
    overflow: hidden;
  }
</style>
