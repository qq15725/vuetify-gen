import {
  VSnackbar,
  VIcon
} from 'vuetify/lib'
import toggleable from '../../mixins/toggleable'
import mixins from '../../util/mixins'

const baseMixins = mixins(
  toggleable
)

const defaultProps = {
  timeout: 3000,
  right: true,
  top: true,
  color: 'success'
}

export default baseMixins.extend({
  inheritAttrs: false,
  props: {
    message: String
  },
  computed: {
    attrs () {
      return {
        ...defaultProps,
        ...this.$attrs,
        ...this.$options.propsData
      }
    }
  },
  render (gen) {
    return gen(VSnackbar, {
      props: {
        value: this.isActive,
        ...this.attrs
      },
      on: {
        input: val => this.isActive = val
      }
    }, [
      this.message,
      gen(VIcon, {
        props: { dark: true },
        on: {
          click: () => this.isActive = false
        }
      }, ['close'])
    ])
  }
})