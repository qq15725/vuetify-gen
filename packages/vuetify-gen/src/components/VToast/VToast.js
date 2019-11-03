import mixins from '../../util/mixins'
import toggleable from '../../mixins/toggleable'

import {
  VDialog,
  VCard,
  VCardText
} from 'vuetify/lib'

const baseMixins = mixins(
  toggleable
)

export default baseMixins.extend({
  name: 'v-toast',
  props: {
    text: String,
    timeout: {
      type: Number,
      default: 2000
    }
  },
  mounted () {
    this.isActive = true
    setTimeout(() => this.isActive = false, this.timeout)
  },
  render (gen) {
    return gen(VDialog, {
      props: {
        maxWidth: 140,
        value: this.isActive,
        hideOverlay: true
      },
      on: {
        input: val => this.isActive = val
      },
      scopedSlots: this.$scopedSlots
    }, [
      gen(VCard, {
        props: {
          rounded: true,
          color: 'rgba(0, 0, 0, .6)'
        },
        style: 'letter-spacing: 2px;'
      }, [
        gen(VCardText, {
          class: 'pa-2 white--text font-weight-bold text-center'
        }, this.text)
      ])
    ])
  }
})