<template>
  <div id="home"> 
    <nav-bar class="home-nav"><template v-slot:center><div>购物街</div></template></nav-bar>
      <scroll class="content" 
      ref="scroll" 
      :probe-type="3" 
      @scroll="contentScroll"
      :pull-up-load="true"
      @pullingUp="loadMore"
      > 
        <home-swiper :banners="banners"></home-swiper>
        <recommend-view :recommends="recommends"></recommend-view>
        <feature-view></feature-view>
        <tab-control :titles="['流行', '新款', '精选']"
        @tabClick="tabClick"
        ref="tabControl"
        ></tab-control>
        <goods-list :goods="showGoods"></goods-list>
      </scroll>
      <back-top @click="backTopClick" v-show="isShowBackTop"></back-top>
  </div>
</template>

<script>
// @ is an alias to /src
  import HomeSwiper from './homechild/HomeSwiper'
  import RecommendView from './homechild/RecommendView'
  import FeatureView from './homechild/FeatureView'

  import NavBar from 'components/common/navbar/NavBar'
  import Scroll from 'components/common/scroll/Scroll'

  import TabControl from 'components/content/tabcontrol/TabControl'
  import GoodsList from 'components/content/goods/GoodsList'
  import BackTop from 'components/content/backtop/BackTop'

  import {getHomeMultidata, getHomeGoods} from 'network/home'
  export default {
  name: 'Home',
  components: {
    NavBar,
    HomeSwiper,
    RecommendView,
    FeatureView,
    TabControl,
    GoodsList,
    Scroll,
    BackTop
  },
  data() {
    return {
      banners: [],
      recommends: [],
      goods: {
        'pop': {page: 0, list: []},
        'new': {page: 0, list: []},
        'sell': {page: 0, list: []}
      },
      currentType: 'pop',
      isShowBackTop: false,
      tabOffsetTop: 0,
      isTabFixed: false,
      saveY: 0
    }
  },
  computed: {
    showGoods() {
      return this.goods[this.currentType].list
    }
  },
  created() {
    this.getHomeMultidata()

    this.getHomeGoods('pop')
    this.getHomeGoods('new')
    this.getHomeGoods('sell')
  },

  activated() {
    this.$refs.scroll.scroll.refresh()
    this.$refs.scroll.scroll.scrollTo(0, this.saveY)
  },

  deactivated() {
    this.saveY = this.$refs.scroll.scroll.y
  },
  methods: {
    //事件监听方法
    tabClick(index) {
      switch(index) {
        case 0:
          this.currentType = 'pop'
          break
        case 1:
          this.currentType = 'new'
          break
        case 2:
          this.currentType = 'sell'
          break
      }
    },

    //回到顶部
    backTopClick() {
      this.$refs.scroll.scroll.scrollTo(0,0,500)
    },

    contentScroll(position) {
      this.isShowBackTop = (-position.y) > 1000
    },

    loadMore() {
      this.getHomeGoods(this.currentType)
    },

    //首页多个数据
    getHomeMultidata() {
      getHomeMultidata().then(res => {
      this.banners = res.data.banner.list
      this.recommends = res.data.recommend.list
    })
    },
    //商品数据
    getHomeGoods(type) {
      const page = this.goods[type].page + 1
      getHomeGoods(type, page).then(res => {
        
        this.goods[type].list.push(...res.data.list)
        this.goods[type].page += 1

        this.$refs.scroll.finishPullUp()
    })
    }
  }
}
</script>

<style  scoped>
  #home {
    height: 100vh;
    position: relative;
  }
  .home-nav {
    background-color: var(--color-tint);
    color: white;
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    z-index: 99;
  }
  .content {
    overflow: hidden;

    position: absolute;
    top: 44px;
    bottom: 49px;
    left: 0;
    right: 0;
  }
</style>