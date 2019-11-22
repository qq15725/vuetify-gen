import VGen from '../VGen'

import { VCol, VForm, VRow } from 'vuetify/lib'

import { getObjectValueByPath, setObjectValueByPath, mergeObject } from '../../util'

export default {
  inheritAttrs: false,
  name: 'v-form-gen',
  props: {
    value: {
      type: Object,
      default: () => ({})
    },
    lazyValidation: Boolean,
    items: {
      type: Array,
      default: () => ([])
    },
    errors: {
      type: Object,
      default: () => ({})
    },
    noGutters: Boolean
  },
  methods: {
    submit (e) {
      if (this.$refs.form.validate()) {
        this.$emit('submit')
      }
      e.preventDefault()
    },
    getObjectValueByPath (value, name) {
      if (!name) {
        return ''
      }
      if (name && name.indexOf('|') > -1) {
        return name.split('|').map(_name => getObjectValueByPath(value, _name))
      }
      return getObjectValueByPath(value, name)
    },
    setObjectValueByPath (obj, name, value) {
      if (!name) {
        return
      }
      if (name && name.indexOf('|') > -1) {
        name.split('|').forEach((subname, index) => {
          setObjectValueByPath(obj, subname, value[index])
          this.resetErrorMessages(subname)
        })
      } else {
        setObjectValueByPath(obj, name, value)
        this.resetErrorMessages(name)
      }
      this.$emit('input', this.value)
    },
    getErrorMessages (name) {
      if (!name) {
        return ''
      }
      const message = getObjectValueByPath(this.errors, name)
      if (Array.isArray(message)) {
        return message.join(',')
      }
      return message
    },
    resetErrorMessages (name) {
      if (this.getErrorMessages(name)) {
        setObjectValueByPath(this.errors, name, '')
        this.$emit('update:errors', this.errors)
      }
    }
  },
  computed: {
    genItems () {
      return this.items.map(({ cols = '12', sm, md, lg, ...params }) => {
        const { prop, event } = params.model || {
          prop: 'value',
          event: 'input'
        }

        let { name, props, on, ...data } = params

        if (name) {
          props = { ...props }

          props = mergeObject(props || {}, this.$attrs)

          props = mergeObject(props, {
            name,
            errorMessages: this.getErrorMessages(name),
            [prop]: this.getObjectValueByPath(this.value, name)
          })

          on = mergeObject(on || {}, {
            [event]: val => this.setObjectValueByPath(this.value, name, val)
          })
        }

        return this.$createElement(VCol, {
          props: {
            cols,
            sm,
            md,
            lg
          }
        }, [
          this.$createElement(VGen, {
            attrs: {
              attrs: props,
              ...data
            },
            on
          })
        ])
      })
    }
  },
  render (gen) {
    return gen(VForm, {
      props: {
        lazyValidation: this.lazyValidation
      },
      on: {
        submit: this.submit
      },
      ref: 'form'
    }, [
      gen(VRow, {
        props: {
          align: 'center',
          noGutters: this.noGutters,
          dense: this.$attrs.dense === '' || this.$attrs.dense
        }
      }, [
        this.$slots.before,
        this.genItems,
        this.$slots.after,
        this.$slots.default
      ])
    ])
  }
}