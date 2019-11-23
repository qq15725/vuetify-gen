import { isDef } from '../../util'

import { mask } from 'vue-the-mask'

export default {
  inheritAttrs: false,
  name: 'v-gen',
  props: {
    tag: null,
    children: null,
    staticClass: null,
    // 'class': null,
    // style: null,
    attrs: null,
    props: null,
    domProps: null,
    on: null,
    nativeOn: null,
    directives: null,
    scopedSlots: null,
    // slot: null,
    // key: null,
    // ref: null,
    refInFor: null
  },
  directives: {
    mask
  },
  render (createElement) {
    let tag = this.tag
    let data = {
      staticClass: this.staticClass,
      attrs: this.attrs,
      props: this.props,
      domProps: this.domProps,
      on: this.on,
      nativeOn: this.nativeOn,
      directives: this.directives,
      scopedSlots: this.scopedSlots,
      refInFor: this.refInFor
    }
    this._b(data, '', this.$attrs, false)
    this._g(data, this.$listeners)
    let children = this.$slots.default

    if (isDef(this.children)) {
      if (Array.isArray(this.children)) {
        children = this.children.map(attrs => typeof attrs === 'object' ? createElement('v-gen', { attrs }) : attrs)
      } else {
        children = this.children
      }
    }

    // alias mapping && extend data
    if (this.$vuetifyGenMapping) {
      let extend = this.$vuetifyGenMapping[(data.attrs || {}).is || tag]
      if (extend) {
        extend = typeof extend === 'function' ? extend(data) : extend
        const { tag: extendTag, model: extendModel, children: extendChildren, ...extendData } = extend
        if (extendModel) {
          const { prop, event } = extendModel
          this._b(data, '', { [prop]: (data.attrs || {}).value }, false)
          this._g(data, { [event]: (data.on || {}).input })
        }
        tag = extendTag
        this._b(data, '', extendData, false)
        if (isDef(extendChildren)) {
          if (Array.isArray(extendChildren)) {
            children = extendChildren.map(attrs => typeof attrs === 'object' ? createElement('v-gen', { attrs }) : attrs)
          } else {
            children = extendChildren
          }
        }
      }
    }

    return createElement(tag, data, children)
  }
}