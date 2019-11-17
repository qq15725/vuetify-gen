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
    lazyValidation: {
      type: Boolean,
      default: true
    },
    items: {
      type: Array,
      default: () => ([])
    },
    errors: {
      type: Object,
      default: () => ({})
    },
    dense: Boolean
  },
  methods: {
    submit (e) {
      if (this.$refs.form.validate()) {
        this.$emit('submit')
      }
      e.preventDefault()
    },
    getObjectValueByPath (value, name) {
      if (name && name.indexOf('|') > -1) {
        return name.split('|').map(_name => getObjectValueByPath(value, _name))
      }
      return getObjectValueByPath(value, name)
    },
    setObjectValueByPath (obj, name, value) {
      if (name && name.indexOf('|') > -1) {
        name.split('|').forEach((item, index) => {
          setObjectValueByPath(obj, item, value[index])
        })
      } else {
        setObjectValueByPath(obj, name, value)
      }
      this.$emit('input', this.value)
    },
    getErrorMessages (name) {
      const message = getObjectValueByPath(this.errors, name)
      if (Array.isArray(message)) {
        return message.join(',')
      }
      return message
    },
    genItem (name, tag, data, children) {
      let mapping = {}
      if (typeof tag === 'string') {
        if (typeof this.$vuetifyGen.form[tag] === 'function') {
          mapping = this.$vuetifyGen.form[tag](data)
        } else {
          mapping = this.$vuetifyGen.form[tag]
        }
      }
      const model = data.model || mapping.model || {
        prop: 'value',
        event: 'input'
      }
      return this.$createElement(
        mapping.tag || tag,
        {
          ...data,
          staticClass: [
            data.staticClass || '',
            mapping.staticClass || '',
            this.dense ? 'caption' : ''
          ].filter(i => !!i).join(' '),
          props: {
            [model.prop]: this.getObjectValueByPath(this.value, name),
            errorMessages: this.getErrorMessages(name),
            dense: this.dense,
            ...this.$attrs,
            ...(mapping.props || (mapping.data || {}).props || {}),
            ...(data.props || {})
          },
          on: {
            [model.event]: val => this.setObjectValueByPath(this.value, name, val),
            ...(mapping.data || {}.on || {}),
            ...(data.on || {})
          }
        },
        (mapping.children || children).map(item => {
          const data = (item.props ? { props: item.props } : item.data) || {}
          return this.genItem(item.name, item.is || item.tag, data, item.children || [])
        })
      )
    },
    genItems () {
      return this.items.map(item => {
        const {
          cols = '12',
          sm,
          md,
          lg,
          name,
          is,
          tag = 'div',
          props,
          data,
          children
        } = item

        return this.$createElement(VCol, {
          props: {
            cols,
            sm,
            md,
            lg
          }
        }, [
          this.genItem(name, is || tag, (props ? { props } : data) || {}, children || [])
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
        align: 'center',
        dense: this.dense
      }, [
        this.$slots.before,
        this.genItems(),
        this.$slots.after,
        this.$slots.default
      ])
    ])
  }
}