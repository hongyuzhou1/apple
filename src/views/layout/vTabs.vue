<template>
  <div class="v-tabs">
    <el-button type="primary" v-for="(item,index) in tabList" :key="item.path">
        <span class="del" @click="del(index)">X</span>
        <router-link :to="item.path">{{item.title}}</router-link>
    </el-button>
  </div>
</template>

<script>
export default {
    computed:{
        tabList(){
            return this.$store.state.tabList
        }
    },
    methods:{
        del(index){
            this.$store.commit("delTabItem",index)
        }
    }
}
</script>

<style lang="scss" scoped>
.el-button{
    height:30px;
    padding:0 20px;
    position:relative;
    span{
        position:absolute;
        right:5px;
    }
}
</style>