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
    },
    genItemData ({ name, tag, is, data, props, children }) {
      let componentData = (props ? { props } : data) || {}
      const componentChildren = (children || []).map(this.genItemData)
      componentData = mergeObject(componentData, {
        attrs: {
          errorMessages: this.getErrorMessages(name)
        }
      })
      componentData = mergeObject(componentData, { attrs: this.$attrs })
      componentData = mergeObject(componentData, { attrs: componentData.props || {} })
      return {
        tag,
        is,
        data: componentData,
        children: componentChildren
      }
    }
  },
  computed: {
    genItems () {
      return this.items.map(({ cols = '12', sm, md, lg, ...props }) => {
        const { tag, is, data, children } = this.genItemData(props)
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
              is
            },
            props: {
              tag,
              data,
              children,
              model: data.model || {
                prop: 'value',
                event: 'input'
              },
              value: this.getObjectValueByPath(this.value, props.name)
            },
            on: {
              input: val => this.setObjectValueByPath(this.value, props.name, val)
            }
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