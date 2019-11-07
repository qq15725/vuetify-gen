import {
  VDialog,
  VCard
} from 'vuetify/lib'
import VQrcode from './VQrcode'
import pluginFactory from '../../util/pluginFactory'
import toggleable from '../../mixins/toggleable'
import mixins from '../../util/mixins'

const baseMixins = mixins(
  toggleable
)

export const VQrcodeDialog = baseMixins.extend({
  name: 'v-qrcode-dialog',
  props: {
    value: Boolean,
    persistent: Boolean,
    text: String,
    size: {
      type: Number,
      default: 300
    }
  },
  methods: {
    genDialog (children) {
      const gen = this.$createElement
      return gen(VDialog, {
        props: {
          value: this.isActive,
          maxWidth: this.size + 24,
          persistent: this.persistent
        },
        on: {
          input: val => this.isActive = val
        },
        scopedSlots: {
          activator: this.$scopedSlots.activator
        }
      }, children)
    },
  },
  render (gen) {
    return this.genDialog([
      gen(VCard, { class: 'pa-3' }, [
        gen(VQrcode, {
          props: {
            text: this.text,
            size: this.size
          }
        })
      ])
    ])
  }
})

export default pluginFactory('qrcode', VQrcodeDialog, ['text', 'size'])