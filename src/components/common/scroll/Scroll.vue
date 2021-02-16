<template>
  <div class="wrapper" ref="wrapper">
    <div class="content">
      <slot></slot>
    </div>
  </div>
</template>

<script>
  import BScroll from 'better-scroll'

  export default {
  name: 'Scroll',
  props: {
    probeType: {
      type: Number,
      default() {

      },
    },
    pullUpLoad: {
      type: Boolean,
      default: true
    }
  },
  data () {
    return {
      scroll: null
    }
  },
  mounted() {
    //创建BScroll对象
      this.scroll = new BScroll(this.$refs.wrapper, {
        probeType: this.probeType,
        pullUpLoad: this.pullUpLoad,
        click: true,
        mouseWheel: true,
        observeDOM: true,
        observeImage:true,
      })

    //监听滚动的位置
      this.scroll.on('scroll', (position) => {
        this.$emit('scroll',position)
      })

      this.scroll.on('pullingUp', () => {
        this.$emit('pullingUp')
      })
  },
  methods: {
    finishPullUp() {
      this.scroll.finishPullUp()
    },
    refresh() {
      console.log('-----')
      this.scroll && this.scroll.refresh && this.scroll.refresh()
    }
  }
}
</script>

<style  scoped>

</style>
