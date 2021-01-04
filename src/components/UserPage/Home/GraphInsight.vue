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
  props: ["personalData", "dataKey"],
  components: {
    'v-chart': ECharts,
  },
  data() {
    let displayData = []
    let preData = this.personalData[this.dataKey]
    for (let i = 0; i < preData.length; i++) {
      displayData.push({value: preData[i][1], name: preData[i][0]})
    }

    let unit = ""
    if (this.dataKey === "length") {
      unit = "Days"
    } else if (this.dataKey === "spendings") {
      unit = "USD"
    }

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
          formatter: '{b}: {c} {a} ({d}%)'
        },
        series: [
          {
            name: unit,
            type: 'pie',
            data: displayData,
            itemStyle: {
              emphasis: {
                shadowBlur: 10,
                shadowOffsetX: 0,
                shadowColor: 'rgba(0, 0, 0, 0.5)'
              }
            }
          }
        ],
        animationDuration: 10000
      }
    }
  },
}
</script>