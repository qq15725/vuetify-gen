import 'material-design-icons-iconfont/dist/material-design-icons.css'
import Vuetify from 'vuetify/lib'
import zhHans from 'vuetify/es5/locale/zh-Hans'
import * as VuetifyComponents from 'vuetify/lib/components'
import vuetifyGen from 'vuetify-gen/src/vuetify-gen'
import {
  VToast,
  VToastInstall,
  VConfirm,
  VConfirmInstall,
  VFormGen,
  VFormGenInstall,
  VDateTimePicker,
  VDateTimePickerInstall,
  VNotify,
  VNotifyInstall,
  VLoadmore,
  VDataWrapper
} from 'vuetify-gen/src/components'
import VFormGenMap from 'vuetify-gen/src/components/VFormGen/VFormGenMap'
import highlight from 'highlight.js'
import 'highlight.js/styles/color-brewer.css'

export default ({ Vue, options, router, siteData }) => {
  Vue.directive('highlight', el => {
    let blocks = el.querySelectorAll('pre code')
    blocks.forEach((block) => {
      highlight.highlightBlock(block)
    })
  })

  Vue.use(Vuetify, {
    components: VuetifyComponents
  })

  const vuetify = new Vuetify({
    icons: {
      iconfont: 'md'
    },
    lang: {
      locales: { 'zh-Hans': zhHans },
      current: 'zh-Hans'
    }
  })

  options.vuetify = vuetify

  Vue.use(vuetifyGen, {
    form: VFormGenMap,
    vuetify,
    components: {
      VToast,
      VToastInstall,
      VConfirm,
      VConfirmInstall,
      VFormGen,
      VFormGenInstall,
      VDateTimePicker,
      VDateTimePickerInstall,
      VNotify,
      VNotifyInstall,
      VLoadmore,
      VDataWrapper
    }
  })
}