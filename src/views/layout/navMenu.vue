<template>
  <div class="nav-menu">
    <!-- <p><router-link to="/dashboard">首页</router-link></p>
    学生管理
    <p><router-link to="/stdadmin/addNewStu">添加学生</router-link></p>
    <p><router-link to="/stdadmin/stuInfo">学生信息</router-link></p>
    <p><router-link to="/stdadmin/adminClass">管理班级</router-link></p>
    教师管理
    <p><router-link to="/teacheradmin/teacherInfo">教师信息</router-link></p>
    <p><router-link to="/teacheradmin/teacherScore">教评分数</router-link></p>
    <p><router-link to="/teacheradmin/teacherHours">课时统计</router-link></p> -->
    <div class="logo" v-if="!collapse">云和教育</div>
    <el-menu
      :default-active="$route.fullPath"
      class="el-menu-vertical-demo"
      @open="handleOpen"
      @close="handleClose"
      background-color="#545c64"
      text-color="#fff"
      active-text-color="#ffd04b"
      :collapse = "collapse"
      :collapse-transition="false"
      :router="true"
    >
      <menu-item v-for="item in routesList" :key="item.path" :item="item"></menu-item>
      <!-- 首页 -->
      <!-- <el-menu-item index="/home/dashboard" class="home">
        <i class="el-icon-monitor"></i>
        <span>首页</span>
      </el-menu-item> -->
      <!-- 学生管理 -->
      <!-- <el-submenu index="2">
        <template slot="title">                              
          <i class="el-icon-location"></i>
          <span>学生管理</span>
        </template>
          <el-menu-item index="/stdadmin/addNewStu">
            <i class="el-icon-circle-plus-outline"></i>
            <span>添加学生</span>
          </el-menu-item>
          <el-menu-item index="/stdadmin/stuInfo">
            <i class="el-icon-bangzhu"></i>
           <span> 学生信息</span>
          </el-menu-item>
          <el-menu-item index="/stdadmin/adminClass"> 
            <i class="el-icon-user"></i>
            <span>班级管理</span>
          </el-menu-item>
      </el-submenu> -->
      <!-- 教师管理 -->
      <!-- <el-submenu index="3">
        <template slot="title">                              
          <i class="el-icon-location"></i>
          <span>教师管理</span>
        </template>
          <el-menu-item index="/teacheradmin/teacherInfo">
            <i class="el-icon-circle-plus-outline"></i>
            <span>教师信息</span>
          </el-menu-item>
          <el-menu-item index="/teacheradmin/teacherHours">
            <i class="el-icon-bangzhu"></i>
            <span>课时统计</span>
          </el-menu-item>
          <el-menu-item index="/teacheradmin/teacherScore">
            <i class="el-icon-user"></i>
            <span>教评分数</span>
          </el-menu-item>
      </el-submenu> -->
      <!-- 公告 -->
      <!-- <el-menu-item index="/notice/notice" class="home">
        <i class="el-icon-microphone"></i>
        <span>公告</span>
      </el-menu-item> -->
      
    </el-menu>
  </div>
</template>

<script>
import asyncRoutes from '@/router/asyncRoutes'
import menuItem from './menuItem.vue'
export default {
  components:{
    menuItem
  },
  props:{
    collapse:{
      type:Boolean
    }
  },
  data(){
    return{
      activeIndex:"/dashboard",
      routesList:asyncRoutes
    }
  },
  // created(){
  //   // console.log(this.$route.fullPath)
  //   this.activeIndex = this.$route.fullPath
  //   console.log(this.activeIndex);
  //   // console.log(this.routesList)
  //   // console.log(this.routesList[2].path)
  // },
  methods: {
    handleOpen(key, keyPath) {
      // console.log(key, keyPath);
    },
    handleClose(key, keyPath) {
      // console.log(key, keyPath);
    },
  },
  watch:{
    $route:{
      handler(to){
        this.$store.commit("setTabList",{
          title:to.meta.title,
          path:to.fullPath
        })
      },
      immediate:true
    }
  }
};
</script>

<style lang="scss" scoped>
.nav-menu{
  height:100%;
  display:flex;
  flex-direction:column;
  .logo{
    height:50px;
    font-size:24px;
    text-align: center;
    line-height:50px;
  }
  .el-menu{
    flex:1;
    border:0;
  }
}
.el-menu-item span{
  display: inline-block;
  height:100%;
}
</style>
<style>
.el-menu--collapse > div > .el-submenu > .el-submenu__title span {
  height: 0;
  width: 0;
  overflow: hidden;
  visibility: hidden;
  display: inline-block;
}
.el-menu--collapse > div > .el-menu-item > span {
  height: 0;
  width: 0;
  overflow: hidden;
  visibility: hidden;
  display: inline-block;
}
.el-menu--collapse > div > .el-submenu > .el-submenu__title .el-submenu__icon-arrow {
  display: none;
}
</style>
