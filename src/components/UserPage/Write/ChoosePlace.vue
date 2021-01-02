<template>
  <v-col cols="6" class="mx-auto">
    <v-autocomplete
        :items="country_names"
        color="blue"
        item-text="name"
        label="Country"
        @change="getCountryData"
        v-model="countryName"
    ></v-autocomplete>
    <v-autocomplete
        :items="cities"
        label="State"
        @change="storeState"
        v-model="stateName"
    >
    </v-autocomplete>
  </v-col>
</template>

<script>
import {countries} from "@/components/UserPage/Write/countries";
import {usableCurrencies} from "@/components/UserPage/Write/rates-in-exchangerate-api";
import axios from "axios";

export default {
  name: "ChoosePlace",
  data() {
    return {
      currencies: [],
      country_names: [],
      isEditing: null,
      countryName: "",
      stateName: "",
      cities: [],
      searchStatesUrl: "http://localhost:5000/api/country_states",
      searchCurrencyUrl: "http://localhost:5000/api/country_currency"
    }
  },
  created() {
    this.country_names = countries()
  },
  methods: {
    storeState() {
      this.$store.state.visitedState = this.stateName;
    },
    getCountryData() {
      this.$store.state.visitedCountry = this.countryName;
      let tempCountryName = this.countryName;
      axios.post(
          this.searchStatesUrl,
          {
            data: {
              "country": this.countryName,
            }
          }
      )
      .then(res => {
        this.cities = res.data
      })

      if (this.countryName === "Korea South"){
        tempCountryName = "South Korea"
      }else if(this.countryName === "Korea North"){
        tempCountryName = "North Korea"
      }
      axios.post(
          this.searchCurrencyUrl,
          {
            data: {
              "country": tempCountryName,
            }
          }
      )
          .then(res => {
            this.country_currencies = res.data
            if (usableCurrencies().indexOf(this.country_currencies) === -1){
              this.$store.state.countryCurrencies = ["USD"];
            }else{
              this.$store.state.countryCurrencies = [this.country_currencies, "USD"];
            }
          })
    },
  },
  mounted() {
    countries()
  }
}
</script>

<style scoped>

</style>