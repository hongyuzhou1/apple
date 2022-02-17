<template>
  <div class="nav-menu">
    <el-menu
      default-active="2"
      class="el-menu-vertical-demo"
      @open="handleOpen"
      @close="handleClose"
      background-color="#545c64"
      text-color="#fff"
      active-text-color="#ffd04b"
      :router="true"
    >
      <nav-item v-for="item in routeList" :key="item.path" :item="item"></nav-item>
    </el-menu>
  </div>
</template>

<script>
import asyncRoutes from '@/router/asyncRoutes'
import navItem from './navItem.vue'
export default {
    components:{
        navItem
    },
    data(){
        return{
            routeList:asyncRoutes
        }
    },
    created(){
        // console.log(this.routeList)
    },
     methods: {
      handleOpen(key, keyPath) {
        // console.log(key, keyPath);
      },
      handleClose(key, keyPath) {
        // console.log(key, keyPath);
      }
    }
};
</script>

<style lang="scss" scoped>
.nav-menu{
    height:100%;
    border:0;
}
::v-deep .el-menu{
    height:100%!important;
}
</style>
