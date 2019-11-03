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
    message: String,
    duration: {
      type: Number,
      default: 3000
    },
    overlay: Boolean
  },
  mounted () {
    this.isActive = true
    this.duration > 0 && setTimeout(() => this.isActive = false, this.duration)
  },
  render (gen) {
    return gen(VDialog, {
      props: {
        width: 'fit-content',
        maxWidth: '70%',
        value: this.isActive,
        hideOverlay: !this.overlay,
        persistent: true
      },
      on: {
        input: val => this.isActive = val
      },
      scopedSlots: this.$scopedSlots
    }, [
      gen(VCard, {
        props: {
          minWidth: 96,
          color: 'rgba(0, 0, 0, .6)'
        }
      }, [
        gen(VCardText, {
          class: 'py-2 px-3 white--text font-weight-bold text-center'
        }, this.message)
      ])
    ])
  }
})