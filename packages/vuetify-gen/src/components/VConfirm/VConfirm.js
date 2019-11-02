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
    activatorText: String,
    disabled: Boolean,
    persistent: Boolean,
    ok: Function,
    cancel: Function
  },
  methods: {
    onOk () {
      if (this.ok) {
        this.ok()
      } else {
        this.$emit('ok')
      }
      this.isActive = false
    },
    onCancel () {
      if (this.cancel) {
        this.cancel()
      } else {
        this.$emit('cancel')
      }
      this.isActive = false
    }
  },
  render () {
    return this.$createElement(VDialog, {
      props: {
        maxWidth: 400,
        value: this.isActive,
        disabled: this.disabled,
        persistent: this.persistent
      },
      on: {
        input (val) {
          this.isActive = val
        }
      },
      scopedSlots: this.$scopedSlots
    }, [
      this.$createElement(VCard, [
        this.$createElement(VCardTitle, {
          class: 'body-2'
        }, [
          this.$createElement('div', [
            this.$createElement(VIcon, {
              props: {
                size: 22,
                color: 'tertiary'
              },
              class: 'mr-2'
            }, ['info']),
            this.title
          ]),
        ]),
        this.$createElement(VDivider, {
          class: 'mx-3'
        }),
        this.$createElement(VCardActions, {
          class: 'justify-end'
        }, [
          this.$createElement(VBtn, {
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
          this.$createElement(VBtn, {
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