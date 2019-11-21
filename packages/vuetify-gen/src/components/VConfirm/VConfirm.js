import mixins from '../../util/mixins'
import toggleable from '../../mixins/toggleable'
import promiseable from '../../mixins/promiseable'

import {
  VDialog,
  VBtn,
  VCard,
  VCardTitle,
  VCardActions,
  VIcon,
  VDivider
} from 'vuetify/lib'

const baseMixins = mixins(
  toggleable,
  promiseable
)

export default baseMixins.extend({
  name: 'v-confirm',
  props: {
    title: String,
    okText: String,
    cancelText: String,
    disabled: Boolean,
    persistent: Boolean,
    ok: Function,
    cancel: Function
  },
  watch: {
    isActive (val) {
      !!val !== this.value && this.$emit('input', val)

      if (!val) {
        this.resolve(false)
      }
    }
  },
  methods: {
    onOk () {
      this.ok && this.ok()
      this.$emit('ok')
      this.resolve(this)
      this.isActive = false
    },
    onCancel () {
      this.cancel && this.cancel()
      this.$emit('cancel')
      this.isActive = false
    }
  },
  render (gen) {
    return gen(VDialog, {
      props: {
        maxWidth: 400,
        value: this.isActive,
        disabled: this.disabled,
        persistent: this.persistent
      },
      on: {
        input: val => this.isActive = val
      },
      scopedSlots: this.$scopedSlots
    }, [
      gen(VCard, [
        gen(VCardTitle, {
          class: 'body-2'
        }, [
          gen(VIcon, {
            props: {
              size: 22,
              color: 'tertiary'
            },
            class: 'mr-2'
          }, ['info']),
          gen('span', this.title)
        ]),
        gen(VDivider),
        gen(VCardActions, {
          class: 'justify-end'
        }, [
          gen(VBtn, {
            props: {
              color: 'primary',
              small: true,
              dark: true,
              depressed: true
            },
            on: {
              click: this.onOk
            }
          }, [this.okText || '确定']),
          gen(VBtn, {
            props: {
              color: 'primary',
              small: true,
              dark: true,
              depressed: true,
              outlined: true
            },
            on: {
              click: this.onCancel
            }
          }, [this.cancelText || '取消'])
        ]),
      ])
    ])
  }
})