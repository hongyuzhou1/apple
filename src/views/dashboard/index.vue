<template>
  <div class="dashboard">
      <bar></bar>
      <rose></rose>
  </div>
</template>

<script>
import bar from '@/views/echarts/bar.vue';
import rose from '@/views/echarts/rose.vue';
export default {
  components:{
    bar,
    rose
  }
}
</script>

<style lang="scss" scoped>
.dashboard{
  display:flex;
}
</style>