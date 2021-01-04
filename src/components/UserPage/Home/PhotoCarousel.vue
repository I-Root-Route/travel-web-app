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
    <v-row>
      <span class="mx-auto">Average Expenses (USD/Day)</span>
      <span class="mx-auto">Travel Calendar</span>
    </v-row>
    <v-row class="mb-16">
      <table-insight class="mx-auto" :personalData="personalData"></table-insight>
      <v-col class="mx-auto" cols="6">
        <travel-calendar :personalData="personalData"></travel-calendar>
      </v-col>
    </v-row>
    <v-row>
      <span class="mx-auto">Length Of The Stay</span>
      <span class="mx-auto">Total Expenses</span>
    </v-row>
    <v-row>
      <graph-insight class="mx-auto" :personalData="personalData" dataKey="length"></graph-insight>
      <graph-insight class="mx-auto" :personalData="personalData" dataKey="spendings"></graph-insight>
    </v-row>
  </v-card>
</template>

<script>
import GraphInsight from "@/components/UserPage/Home/GraphInsight";
import TableInsight from "@/components/UserPage/Home/TableInsight";
import TravelCalendar from "@/components/UserPage/Home/TravelCalendar";
import 'echarts/lib/chart/line';
import 'echarts/lib/chart/pie';
import 'echarts/lib/component/polar';


export default {
  name: "PhotoCarousel",
  props: ["personalData"],
  components: {
    GraphInsight,
    TableInsight,
    TravelCalendar
  },
}
</script>

<style scoped>

</style>