<template>
  <div id="cart">
    <nav-bar class="nav-cart">
      <template v-slot:center>
        <div>购物车({{cartCount}})</div>
      </template>
    </nav-bar>
    <cart-list class="cart-list" :cart-list="cartList"></cart-list>

    <cart-bottom-bar></cart-bottom-bar>
  </div>
</template>

<script>
  import NavBar from 'components/common/navbar/NavBar'

  import CartList from './childCart/CartList'
  import CartBottomBar from './childCart/CartBottomBar'

  import {mapGetters} from 'vuex'

  export default {
  name: 'Cart',
  computed: {
		...mapGetters([
      'cartList',
      'cartCount'
    ])
  },
  components: {
    NavBar,
    CartList,
    CartBottomBar
  },
}
</script>

<style  scoped>
  #cart {
    height: 100vh;
  }
  .nav-cart {
    position: relative;
    background-color: var(--color-tint);
    color: white;
    z-index: 9999;
  }
  .cart-list {
    position: absolute;
    top: 44px;
    bottom: 49px;
    width: 100%;
  }
</style>
