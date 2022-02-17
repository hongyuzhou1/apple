<template>
  <div class="box" ref="box">饼图</div>
</template>

<script>
import * as echarts from "echarts";
export default {
  computed: {
    options() {
      return {
        legend: {
          top: "bottom",
        },
        toolbox: {
          show: true,
          feature: {
            mark: { show: true },
            dataView: { show: true, readOnly: false },
            restore: { show: true },
            saveAsImage: { show: true },
          },
        },
        series: [
          {
            name: "Nightingale Chart",
            type: "pie",
            radius: [50, 250],
            center: ["50%", "50%"],
            roseType: "area",
            itemStyle: {
              borderRadius: 8,
            },
            data: [
              { value: 40, name: "rose 1" },
              { value: 38, name: "rose 2" },
              { value: 32, name: "rose 3" },
              { value: 30, name: "rose 4" },
              { value: 28, name: "rose 5" },
              { value: 26, name: "rose 6" },
              { value: 22, name: "rose 7" },
              { value: 18, name: "rose 8" },
            ],
          },
        ],
      };
    },
  },
  mounted(){
      this.myChart = echarts.init(this.$refs.box);
      this.myChart.setOption(this.options);
  }
};
</script>

<style lang="scss" scoped>
.box {
  width: 600px;
  height: 500px;
  border: 1px solid #000;
}
</style>
