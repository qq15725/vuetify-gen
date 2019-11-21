import { mask } from 'vue-the-mask'

import { mergeObject } from '../../util'

export default {
  inheritAttrs: false,
  name: 'v-gen',
  directives: {
    mask
  },
  props: {
    tag: null,
    props: Object,
    data: Object,
    children: {
      type: null,
      default: () => ([])
    },
    value: null,
    model: Object
  },
  computed: {
    is () {
      return this.tag || this.$attrs.is || 'div'
    },
    realData () {
      return (this.props ? { props: this.props } : this.data) || {}
    },
    mapping () {
      let mapping = this.$vuetifyGenMapping[this.is] || {}
      mapping = typeof mapping === 'function' ? mapping(this.realData) : mapping
      return mapping
    },
    realMappingData () {
      return (this.mapping.props ? { props: this.mapping.props } : this.mapping.data) || {}
    },
    computedTag () {
      return this.mapping.tag || this.is
    },
    computedData () {
      let data = this.realData

      data = mergeObject(data, this.realMappingData)

      const model = this.mapping.model || this.model

      if (model) {
        if (model.prop) {
          data = mergeObject(data, {
            props: {
              [model.prop]: this.value
            },
            attrs: {
              [model.prop]: this.value
            }
          })
        }

        if (model.event) {
          data = mergeObject(data, {
            on: {
              [model.event]: val => {
                this.$emit('input', val)
              }
            }
          })
        }
      }

      return data
    },
    computedChildren () {
      const children = this.mapping.children || this.children
      if (Array.isArray(children)) {
        return children.map(attrs => {
          if (typeof attrs === 'object') {
            return this.$createElement('v-gen', { attrs })
          }
          return attrs
        })
      }
      return children
    }
  },

  render (gen) {
    return gen(this.computedTag, { ...this.computedData }, [...this.computedChildren])
  }
}