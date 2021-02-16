<template>
  <div id="app">
    <router-view v-slot="{ Component }">
      <keep-alive exclude="Detail">
        <component :is="Component" />
      </keep-alive>
    </router-view>
    <main-tab-bar class="main-tabbar"></main-tab-bar>
  </div>
</template>

<script>
  import MainTabBar from 'components/content/maintabbar/MainTabBar'
  export default {
    name: 'App',
    components:{
      MainTabBar
  }
}
</script>

<style>
  @import "./assets/css/base.css";
  .main-tabbar {
    position: absolute;
    z-index: 9;
  }
</style>
