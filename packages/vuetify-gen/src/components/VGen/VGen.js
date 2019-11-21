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
    input: [Function],
    model: Object
  },
  computed: {
    is () {
      return this.tag || this.$attrs.is || 'div'
    },
    mapping () {
      let mapping = this.$vuetifyGenMapping[this.is] || {}
      mapping = typeof mapping === 'function' ? mapping(this.data) : mapping
      return mapping
    },
    computedTag () {
      return this.mapping.tag || this.is
    },
    computedData () {
      let data = (this.props ? { props: this.props } : this.data) || {}

      if (this.mapping) {
        data = mergeObject(data, this.mapping)
      }

      if (this.model) {
        if (this.model.prop) {
          data = mergeObject(data, {
            attrs: {
              [this.model.prop]: this.value
            }
          })
        }
        if (this.model.event && this.input) {
          data = mergeObject(data, {
            on: {
              [this.model.event]: this.input
            }
          })
        }
      }

      return { ...data }
    },
    computedChildren () {
      if (Array.isArray(this.children)) {
        return this.children.map(attrs => {
          if (typeof attrs === 'object') {
            return this.$createElement('v-gen', { attrs })
          }
          return attrs
        })
      }
      return this.children
    }
  },

  render (gen) {
    return gen(this.computedTag, this.computedData, this.computedChildren)
  }
}