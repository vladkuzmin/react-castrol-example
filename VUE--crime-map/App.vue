<template>
  <div id="app" ref="app">
    <Intro v-if="isIntro"/>
    <Map v-else/>
    <Loading/>
    <Social/>
  </div>
</template>

<script>

import Intro from './views/Intro.vue'
import Map from './views/Map.vue'
import Social from './components/Social.vue'
import Loading from './components/Loading.vue'
import { POLICE } from './helpers/http';

export default {
  name: 'app',
  components: {
    Intro,
    Map,
    Social,
    Loading
  },
  computed: {
    isIntro () {
      return this.$store.getters.isIntro
    }
  },
  created() {
    POLICE.get(`crime-categories`)
      .then(response => {
        let data = response.data.filter(x => x.url !== 'all-crime')

        data.forEach((x,i) => {
            x.active = i < 5 ? true : false
            x.loading = false
        })
        this.$store.dispatch('setCategories', data)

        // Active categories
        // ---------------------
        data.forEach((x, i) => {
            if(i < 5) {
              this.$store.dispatch('addActiveCategory', x.url)
            }
        })
        // ---------------------

      })
      .catch(() => {})

      if (navigator.clipboard && navigator.geolocation) {
        this.$store.dispatch('isGeolocation', true)
      }
      
  }
}
</script>

<style lang="scss">
  @import "assets/styles/styles.scss";
</style>