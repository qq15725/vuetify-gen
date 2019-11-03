import mixins from '../../util/mixins'
import toggleable from '../../mixins/toggleable'

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
  toggleable
)

export default baseMixins.extend({
  props: {
    title: String,
    okText: String,
    cancelText: String,
    disabled: Boolean,
    persistent: {
      type: Boolean,
      default: true
    },
    ok: Function,
    cancel: Function
  },
  data () {
    return {
      resolve: null,
      reject: null
    }
  },
  methods: {
    onOk () {
      if (this.ok) {
        this.ok()
      } else {
        this.resolve && this.resolve(this)
        this.$emit('ok')
      }
      this.isActive = false
    },
    onCancel () {
      if (this.cancel) {
        this.cancel()
      } else {
        this.reject && this.reject(new Error('cancel'))
        this.$emit('cancel')
      }
      this.isActive = false
    },
    promise (resolve, reject) {
      this.resolve = resolve
      this.reject = reject
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
        gen(VDivider, {
          class: 'mx-3'
        }),
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
          }, [this.cancelText || '取消']),
        ]),
      ])
    ])
  }
})