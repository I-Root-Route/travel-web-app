import Vue from 'vue'
import App from './App.vue'
import vuetify from './plugins/vuetify';
import router from "./router";
import store from "./store/store.js"

import VueParticles from 'vue-particles';
import ECharts from 'vue-echarts'

import 'echarts/lib/chart/bar'
import 'echarts/lib/component/tooltip'

Vue.config.productionTip = false

Vue.use(VueParticles);
Vue.component('v-chart', ECharts)

new Vue({
  vuetify,
  render: h => h(App),
  router: router,
  store,
}).$mount('#app')
