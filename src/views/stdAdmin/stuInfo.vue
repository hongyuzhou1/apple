<template>
  <div class="std-info">
    <select-stu-info @send="getData"></select-stu-info>
    <show-stu-info :parent-table-data="parentTableData"></show-stu-info>
  </div>
</template>

<script>
import showStuInfo from './stuInfoCom/showStuInfo.vue'
import selectStuInfo from './stuInfoCom/selectStuInfo.vue'
export default {
  components:{
    showStuInfo,
    selectStuInfo
  },
  data(){
    return{
      parentTableData:[]
    }
  },
  methods:{
    getData(data){
      this.parentTableData = data;
      // console.log(this.parentTableData)
    }
  }
}
</script>

<style>

</style>