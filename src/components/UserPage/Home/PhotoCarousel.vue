<template>
  <v-card
      light
      width="100%"
  >
    <v-card-title>
      <v-list-item class="grow">
        <span>Your Travel Insights</span>
      </v-list-item>
    </v-card-title>
    <graph-insight></graph-insight>
  </v-card>
</template>

<script>
import GraphInsight from "@/components/UserPage/Home/GraphInsight";
import 'echarts/lib/chart/line';
import 'echarts/lib/chart/pie';
import 'echarts/lib/component/polar';


export default {
  name: "PhotoCarousel",
  components: {
    GraphInsight,
  },
  data() {
    return {
    }
  },
}
</script>

<style scoped>

</style>