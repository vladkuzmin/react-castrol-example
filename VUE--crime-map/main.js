import Vue from 'vue'
import App from './App.vue'
import Vuex from 'vuex'
import { store } from './store'
import * as VueGoogleMaps from 'vue2-google-maps'
import GmapCluster from 'vue2-google-maps/dist/components/cluster'

Vue.config.productionTip = false
Vue.use(Vuex)
Vue.use(VueGoogleMaps, {
  load: {
    key: process.env.VUE_APP_GOOGLEMAP_API_KEY,
    libraries: 'geocoder'
  }
})

Vue.component("GmapCluster", GmapCluster);

new Vue({
  render: h => h(App),
  store
}).$mount('#app')
