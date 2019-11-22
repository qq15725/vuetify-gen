import { mask } from 'vue-the-mask'

import { createVNodeConstruct } from './create-vnode-construct'

export default {
  inheritAttrs: false,
  name: 'v-gen',
  directives: {
    mask
  },
  render (gen) {
    const vvnode = {
      on: this.$listeners,
      children: this.$slots.default,
      ...this.$attrs
    }

    let [tag, data, children] = createVNodeConstruct(vvnode)

    // children
    if (Array.isArray(children)) {
      children = children.map(vvnode => {
        if (typeof vvnode === 'object') {
          return gen('v-gen', {
            attrs: vvnode
          })
        }
        return vvnode
      })
    }

    return gen(tag, data, children)
  }
}