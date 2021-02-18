<template>
  <div class="toast" v-show="isShow">
    <div>{{message}}</div>
  </div>
</template>

<script>
  export default {
  name: 'Toast',
  props: {
    message: {
      type: String,
      default: ''
    },
    isShow: {
      type: Boolean,
      default: false
    }
  },
  data () {
    return {
    }
  },
}
</script>

<style  scoped>
  .toast {
    position: fixed;
    left: 50%;
    top: 50%;
    background-color: rgb(255, 192, 203);
    color: #fff;
    padding: 8px 10px;

    transform: translate(-50%, -50%);
    z-index: 9999;
    border-radius: 5px;
  }
</style>
