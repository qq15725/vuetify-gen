import VGen from '../VGen'

import { VCol, VForm, VRow } from 'vuetify/lib'

import { getObjectValueByPath, setObjectValueByPath } from '../../util'

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
        let { name, tag, model, ...attrs } = params

        let data = {}

        if (name) {
          const { prop, event } = model || {
            prop: 'value',
            event: 'input'
          }

          this._b(data, '', this.$attrs, false)

          this._b(data, '', {
            name,
            errorMessages: this.getErrorMessages(name),
            [prop]: this.getObjectValueByPath(this.value, name)
          }, false)

          this._g(data, {
            [event]: val => this.setObjectValueByPath(this.value, name, val)
          })
        }

        attrs.tag = tag

        this._b(data, '', attrs, false)

        return this.$createElement(VCol, {
          props: {
            cols,
            sm,
            md,
            lg
          }
        }, [
          this.$createElement(VGen, data)
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