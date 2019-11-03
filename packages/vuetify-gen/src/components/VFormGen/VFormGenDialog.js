import {
  VDialog,
  VCard,
  VCardTitle,
  VCardText,
  VSpacer,
  VBtn,
  VIcon,
  VDivider,
  VCardActions,
} from 'vuetify/lib'
import VFormGen from './VFormGen'

import toggleable from '../../mixins/toggleable'
import mixins from '../../util/mixins'

const baseMixins = mixins(toggleable)

export default baseMixins.extend({
  inheritAttrs: false,
  props: {
    value: Boolean,
    maxWidth: [String, Number],
    title: String,
    form: {
      type: Object,
      default: () => ({})
    },
    items: Array,
    errors: Object,
    persistent: {
      type: Boolean,
      default: true
    },
    loading: Boolean,
    okText: String,
    cancelText: String,
    cancel: Function
  },
  data () {
    return {
      tempForm: {},
      resolve: null,
      reject: null
    }
  },
  watch: {
    form: {
      handler (form) {
        this.tempForm = form
      },
      immediate: true,
      deep: true
    },
    tempForm: {
      handler (form) {
        form !== this.form && this.$emit('update:form', form)
      },
      immediate: true,
      deep: true
    }
  },
  methods: {
    onSubmit () {
      if (this.submit) {
        this.submit(this.tempForm)
      } else {
        this.resolve && this.resolve(this.tempForm)
        this.$emit('submit', this.tempForm)
      }
      if (this.value !== this.isActive) {
        this.isActive = false
      }
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
        maxWidth: this.maxWidth || 500,
        scrollable: true,
        value: this.isActive,
        persistent: this.persistent
      },
      on: {
        input: val => this.isActive = val
      },
      scopedSlots: this.$scopedSlots
    }, [
      gen(VCard, [
        gen(VCardTitle, [
          gen('div', this.title),
          gen(VSpacer),
          gen(VBtn, {
            props: {
              icon: true
            },
            on: {
              click: this.onCancel
            }
          }, gen(VIcon, 'close'))
        ]),
        gen(VDivider, { class: 'mx-3' }),
        gen(VCardText, {
          class: ['pa-3']
        }, [
          gen(VFormGen, {
            props: {
              value: this.tempForm,
              items: this.items,
              errors: this.errors,
              outlined: true
            },
            on: {
              input: val => this.tempForm = val,
              submit: this.onSubmit
            }
          }, [
            this.$slots ? this.$slots.default : ''
          ])
        ]),
        gen(VDivider, { class: 'mx-3' }),
        gen(VCardActions, {
          class: [
            'justify-end', 'py-4'
          ]
        }, [
          gen(VBtn, {
            props: {
              color: 'blue',
              small: true,
              dark: true,
              depressed: true,
              loading: this.loading
            },
            on: {
              click: this.onSubmit
            }
          }, this.okText || '确定'),
          gen(VBtn, {
            props: {
              color: 'blue',
              small: true,
              dark: true,
              depressed: true,
              outlined: true
            },
            on: {
              click: this.onCancel
            }
          }, this.cancelText || '取消')
        ])
      ])
    ])
  }
})