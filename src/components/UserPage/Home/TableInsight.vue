<template>
  <v-chart :options="bar" theme="ovilia-green" ref="bar" autoresize></v-chart>
</template>

<script>
import ECharts from 'vue-echarts';
import 'echarts/lib/chart/bar';
import theme from './theme.json'

ECharts.registerTheme('ovilia-green', theme)

export default {
  name: "TableInsight",
  props: ["personalData"],
  components: {
    'v-chart': ECharts,
  },
  data() {
    let preData = this.personalData["average"]

    return {
      bar: {
        legend: {},
        tooltip: {},
        dataset: {
          source: preData,
        },
        xAxis: {type: 'category'},
        yAxis: {},
        series: [{type: 'bar'}],
        animationDuration: 10000
      }
    }
  },
}
</script>

<style scoped>

</style>