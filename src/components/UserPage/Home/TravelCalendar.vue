<template>
  <v-col>
    <v-sheet height="64">
      <v-toolbar
          flat
      >
        <v-btn
            outlined
            class="mr-4"
            color="grey darken-2"
            @click="setToday"
        >
          Today
        </v-btn>
        <v-btn
            fab
            text
            small
            color="grey darken-2"
            @click="prev"
        >
          <v-icon small>
            mdi-chevron-left
          </v-icon>
        </v-btn>
        <v-btn
            fab
            text
            small
            color="grey darken-2"
            @click="next"
        >
          <v-icon small>
            mdi-chevron-right
          </v-icon>
        </v-btn>
        <v-toolbar-title v-if="$refs.calendar">
          {{ $refs.calendar.title }}
        </v-toolbar-title>
      </v-toolbar>
    </v-sheet>
    <v-calendar
        v-model="focus"
        ref="calendar"
        color="primary"
        :events="trips"
    ></v-calendar>
  </v-col>
</template>

<script>
import moment from 'moment';

export default {
  name: "TravelCalendar",
  props: ["personalData"],
  data () {
    return {
      focus: '',
      trips: [],
      date: moment('2020-01-01')
    }
  },
  methods: {
    setToday(){
      this.focus = ''
    },
    prev(){
      this.$refs.calendar.prev()
    },
    next(){
      this.$refs.calendar.next()
    }
  },
  created () {
    this.trips = this.personalData["calendar"];
  }
}
</script>

<style scoped>

</style>