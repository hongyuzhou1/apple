<template>
  <div class="header">
      <div class="header-top">
            <span @click="toggle">
                <i class="el-icon-s-fold" v-if="collapse"></i>
                <i class="el-icon-s-unfold" v-else></i>
            </span>
            <el-breadcrumb separator-class="el-icon-arrow-right">
                <el-breadcrumb-item :to="{path:'/home'}">首页</el-breadcrumb-item>
                <el-breadcrumb-item v-for="(item,index) in breadcrumbList" :key="index">{{item}}</el-breadcrumb-item>
            </el-breadcrumb>
      </div>
    <v-tabs></v-tabs>
  </div>
</template>

<script>
import vTabs from "@/views/layout/vTabs";
export default {
    components:{
        vTabs
    },
    data(){
        return{
            collapse:true,
            breadcrumbList:[]
        }
    },
    methods:{
        toggle(){
            this.collapse = !this.collapse
            this.$emit("toggle")
        }
    },
    watch:{
        $route:{
            handler(to,from){
                if(to.fullPath == "/home/dashboard"){
                    this.breadcrumbList = []
                    return
                }
                if(to.matched[0].meta.title){
                    this.breadcrumbList = this.$route.matched.map(
                        (record) => record.meta.title
                    )
                }else{
                    this.breadcrumbList = this.$route.matched.slice(1).map((record) => {
                        return record.meta.title
                    })
                }
            },
            immediate: true,
        }
    }
}
</script>

<style lang="scss" scoped>
.header-top{
    display:flex;
}
.el-breadcrumb{
    display:flex;
    align-items: center;
}
i{
    font-size:24px;
}
::v-deep .el-breadcrumb__separator{
    color:#000;
}
::v-deep .el-button a{
    color:#000;
}
</style>