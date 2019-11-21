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
import promiseable from '../../mixins/promiseable'
import mixins from '../../util/mixins'

const baseMixins = mixins(
  toggleable,
  promiseable
)

export default baseMixins.extend({
  inheritAttrs: false,
  name: 'v-form-gen-dialog',
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
    persistent: Boolean,
    loading: Boolean,

    submitText: String,
    cancelText: String,

    submit: Function,
    cancel: Function
  },
  data () {
    return {
      tempForm: {}
    }
  },
  computed: {
    attrs () {
      return {
        ...this.$attrs,
        ...this.$options.propsData
      }
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
    },
    isActive (val) {
      !!val !== this.value && this.$emit('input', val)

      if (!val) {
        this.resolve(false)
      }
    }
  },
  methods: {
    onSubmit () {
      this.submit && this.submit(this.tempForm)
      this.$emit('submit', this.tempForm)
      this.resolve(this.tempForm)
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
        gen(VDivider),
        gen(VCardText, {
          class: ['pa-3']
        }, [
          gen(VFormGen, {
            attrs: {
              value: this.tempForm,
              items: this.items,
              errors: this.errors,
              ...this.attrs
            },
            on: {
              input: val => this.tempForm = val,
              submit: this.onSubmit
            }
          }, [
            this.$slots ? this.$slots.default : ''
          ])
        ]),
        gen(VDivider),
        gen(VCardActions, {
          class: [
            'justify-end'
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
          }, this.submitText || '确定'),
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