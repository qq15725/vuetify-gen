import Vue from 'vue'
import vuetify from './vuetify'
import * as components from 'vuetify-gen/src/components'
import vuetifyGen from 'vuetify-gen'

Vue.use(vuetifyGen, {
  vuetify,
  components
})
