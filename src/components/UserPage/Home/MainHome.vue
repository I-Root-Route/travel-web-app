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
              @click="test"
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
      <v-col>
        <v-row>
          <v-lazy v-model="isActive">
            <photo-carousel></photo-carousel>
          </v-lazy>
        </v-row>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import {RadioSvgMap} from 'vue-svg-map'
import World from '@svg-maps/world'

import PhotoCarousel from "@/components/UserPage/Home/PhotoCarousel";

export default {
  components: {
    RadioSvgMap,
    PhotoCarousel,
  },
  data() {
    return {
      isActive: false,
      World,
      pointedLocation: null,
      selected: null,
      tooltipStyle: null,
      hover: false,
      tipStyle: {
        position: 'fixed',
      }
    };
  },
  methods: {
    getLocationName(node) {
      return node && node.attributes.name.value;
    },
    pointLocation(event) {
      this.pointedLocation = this.getLocationName(event.target)
      console.log(this.pointedLocation);
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
    getLocationClass(location, index) {
      // Generate heat map
      return `svg-map__location svg-map__location--heat${index % 4}`
    },
    test() {
      console.log(this.selected);
    }
  }
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
        width: 1800px; // USA needs more space	for tooltip
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