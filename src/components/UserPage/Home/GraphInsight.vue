<template>
  <v-chart :options="pie"></v-chart>
</template>


<script>
import ECharts from 'vue-echarts';
import 'echarts/lib/chart/line';
import 'echarts/lib/chart/pie';
import 'echarts/lib/component/polar';


export default {
  name: "PhotoCarousel",
  components: {
    'v-chart': ECharts,
  },
  data() {
    return {
      pie: {
        title: {
          text: '内訳'
        },
        legend: {
          orient: 'vertical',
          left: 'left',
        },
        tooltip: {
          trigger: 'item',
          formatter: '{a} <br/>{b} : {c} ({d}%)'
        },
        series: [
          {
            name: 'DATA',
            type: 'pie',
            data: [
              { value: 4, name: 'ASIA' },
              { value: 0, name: 'EUROPE' },
              { value: 2, name: 'AFRICA' },
              { value: 1, name: 'SOUTH AMERICA' },
              { value: 0, name: 'NORTH AMERICA' }
            ],
            itemStyle: {
              emphasis: {
                shadowBlur: 10,
                shadowOffsetX: 0,
                shadowColor: 'rgba(0, 0, 0, 0.5)'
              }
            }
          }
        ],
        animationDuration: 4000
      }
    }
  },
}
</script>