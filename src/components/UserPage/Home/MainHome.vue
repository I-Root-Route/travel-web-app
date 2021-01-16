<template>
  <v-container class="sea">
    <v-row>
      <v-col>
        <v-img
            src="https://pictkan.com/uploads/converted/15/07/16/3770905882-texture-409645_1920-lOE5-1920x1280-MM-100.jpg"
        >
        </v-img>
        <v-container class="examples__block__map--usa">
          <radio-svg-map
              :map="World"
              :location-class="getLocationClass"
              v-model="selected"
              @mouseover="pointLocation"
              @mouseout="unpointLocation"
              @mousemove="moveOnLocation"
          />
          <div
              v-if="hover"
              :style="tooltipStyle"
              class="examples__block__map__tooltip"
          >
            {{ pointedLocation }}
          </div>

        </v-container>
      </v-col>
      <component :is="component" :personalData="personalData"></component>
    </v-row>
  </v-container>
</template>

<script>
import {RadioSvgMap} from 'vue-svg-map'
import World from '@svg-maps/world'
import axios from 'axios'

import PhotoCarousel from "@/components/UserPage/Home/PhotoCarousel";

export default {
  components: {
    RadioSvgMap,
    PhotoCarousel,
  },
  data() {
    return {
      component: null,
      personalData: {"average": [], "calendar": [], "countries": [], "length": [], "spendings": []},
      isActive: false,
      World,
      pointedLocation: null,
      selected: null,
      tooltipStyle: null,
      hover: false,
      tipStyle: {
        position: 'fixed',
      },
      searchDataUrl: "https://journey-list.azurewebsites.net/api/search_personal_data",
    };
  },
  methods: {
    getLocationName(node) {
      return node && node.attributes.name.value;
    },
    pointLocation(event) {
      this.pointedLocation = this.getLocationName(event.target)
      this.hover = true;
    },
    unpointLocation() {
      this.pointedLocation = null
      this.tooltipStyle = {display: 'none'}
    },
    moveOnLocation(event) {
      this.tooltipStyle = {
        display: 'block',
        top: `${event.clientY + 10}px`,
        left: `${event.clientX - 100}px`,
      }
    },
    getLocationClass(location) {
      if (location["name"] === "South Korea"){
        location["name"] = "Korea South"
      }else if(location["name"] === "North Korea"){
        location["name"] = "North Korea"
      }

      if (this.personalData["countries"].indexOf(location["name"]) === -1){
        return `svg-map__location svg-map__location--heat1`
      }else{
        return `svg-map__location svg-map__location--heat2`
      }
    },
  },
  async created() {
    await axios.post(
        this.searchDataUrl,
        {
          username: this.$store.state.userName
        }
    ).then(res => {
      this.personalData = res["data"]
      this.component = PhotoCarousel
    })
  },
}
</script>

<style lang="scss">
.examples {
  width: 1000px;
  margin: 0 auto;
  font-family: Arial, sans-serif;
  text-align: center;

  &__title {
    margin-bottom: 80px;
    padding-bottom: 40px;
    border-bottom: 1px dotted black;
    font-size: 24px;
  }

  &__block {
    margin-bottom: 80px;
    padding-bottom: 80px;
    border-bottom: 1px dotted black;


    &__title {
      margin-bottom: 40px;
      font-size: 20px;
    }

    &__info {
      display: inline-block;
      vertical-align: top;
      width: 450px;
      text-align: left;

      &__item {
        margin-bottom: 20px;
      }
    }

    &__map {
      display: inline-block;
      width: 500px;

      &--australia {
        .svg-map {
          stroke-width: 0.5; // Australia stroke is larger than other maps
        }
      }

      &--usa {
        position: absolute;
        top: 10px;
        left: 0;
        right: 0;

        .svg-map__location {
          &--heat0 {
            fill: black;
          }

          &--heat1 {
            fill: lightblue;
          }

          &--heat2 {
            fill: orange;
          }

          &--heat3 {
            fill: red;
          }

          &:focus,
          &:hover {
            opacity: 0.75;
          }
        }
      }

      &__tooltip {
        position: fixed;
        width: 30%;
        padding: 10px;
        border: 1px solid darkgray;
        background-color: white;
      }
    }
  }
}
</style>

<style scoped>
.sea {
  /*position: relative;*/
  background-color: aliceblue;
  /*width: 100%;*/
  /*height: 100%;*/
  /*margin-top: 70px;*/
}
</style>