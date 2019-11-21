import { mask } from 'vue-the-mask'

import { mergeObject } from '../../util'

export default {
  inheritAttrs: false,
  name: 'v-gen',
  directives: {
    mask
  },
  props: {
    tag: [String, Object, Function],
    props: Object,
    data: Object,
    children: {
      type: Array,
      default: () => ([])
    },
    value: [String, Number, Object, Function],
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
      return this.children.map(attrs => gen('v-gen', { attrs }))
    }
  },

  render (gen) {
    return gen(this.computedTag, this.computedData, this.computedChildren)
  }
}