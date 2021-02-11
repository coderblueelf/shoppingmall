<template>
  <div class="goods">
      <goods-list-item v-for="(item,index) in goods" :key="index" :goods-item="item"></goods-list-item>
      {{goods}}
  </div>
</template>

<script>
  import GoodsListItem from './GoodsListItem'
  export default {
  name: "GoodsList",
  components: {
      GoodsListItem
  },
  props: {
      goods: {
          type: Array,
          default() {
              return []
          }
      }
  },
  data () {
    return {
    }
  }
}
</script>

<style  scoped>

</style>