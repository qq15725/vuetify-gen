import 'material-design-icons-iconfont/dist/material-design-icons.css'
import Vuetify from 'vuetify/lib'
import * as VuetifyComponents from 'vuetify/lib/components'
import vuetifyGen from 'vuetify-gen/src/vuetify-gen'
import * as VuetifyGenComponents from 'vuetify-gen/src/components'
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
      iconfont: 'mdi'
    }
  })

  options.vuetify = vuetify

  Vue.use(vuetifyGen, {
    vuetify,
    components: VuetifyGenComponents
  })
}