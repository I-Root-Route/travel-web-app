<template>
  <v-col cols="6" class="mx-auto">
    <v-form ref="form" v-model="valid" lazy-validation>
      <v-date-picker required range v-model="dates" @change="storeDates">
      </v-date-picker>
      <v-row>
        <v-col cols="6" class="mt-4">
          <v-text-field :rules="rules" label="Total spending" v-model="totalCost" @change="storeCost"></v-text-field>
        </v-col>
        <v-col cols="6" class="mt-4">
          <v-autocomplete auto-select-first :items="this.$store.state.countryCurrencies" label="Currency"
                          v-model="selectedCurrency" @change="getCurrency"></v-autocomplete>
        </v-col>
      </v-row>
    </v-form>
  </v-col>
</template>

<script>
export default {
  name: "StayData",
  data() {
    return {
      dates: [],
      selectedCurrency: this.$store.state.selectedCurrency,
      totalCost: 0,
      valid: true,
      rules: [
        v => !!v || "Required",
        v => /[0-9]{1,4}/.test(v) || "Only numbers are accepted"
      ]
    }
  },
  methods: {
    storeCost() {
      this.$store.state.totalCost = this.totalCost
    },
    getCurrency() {
      this.$store.state.selectedCurrency = this.selectedCurrency
    },
    storeDates(){
      this.$store.state.dates = this.dates
    }
  },
}
</script>

<style scoped>

</style>