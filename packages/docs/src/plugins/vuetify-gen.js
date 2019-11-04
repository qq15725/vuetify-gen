import Vue from 'vue'
import vuetify from './vuetify'
import { VConfirm, VToast, VFormGen } from 'vuetify-gen'

Vue.use(VConfirm, {
  vuetify
})

Vue.use(VToast, {
  vuetify
})

Vue.use(VFormGen, {
  vuetify
})
