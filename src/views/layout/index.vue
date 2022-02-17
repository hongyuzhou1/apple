<template>
  <div class="index">
    <el-container>
      <el-aside :class="collapse? '' : 'active'">
        <nav-menu :collapse="collapse"></nav-menu>
      </el-aside>
      <el-container>
        <el-header>
          <v-header @toggle="toggle"></v-header>
        </el-header>
        <el-main>
          <!-- <dashboard/> -->
          <router-view></router-view>
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>

<script>
import dashboard from '@/views/dashboard'
import vHeader from './vHeader.vue'
import navMenu from './navMenu.vue'
export default {
  components: {
    dashboard,
    navMenu,
    vHeader
  },
  data() {
    return {
        collapse:false
    }
  },
  methods: {
    onSubmit() {
      console.log(this.form);
    },
    toggle(){
      this.collapse = !this.collapse
    }
  },
};
</script>
<style lang="scss" scoped>
.index{
  height:100%;
}
.el-container{
  height:100%;
}
.el-header{
    background-color: #B3C0D1;
    color: #333;
}
  
  .el-aside {
    background-color: #D3DCE6;
    color: #333;
    width:auto !important;
    &.active{
      width:200px!important;
    }
  }
  
  .el-main {
    background-color: #E9EEF3;
    color: #333;
    position:relative;
  }
</style>
