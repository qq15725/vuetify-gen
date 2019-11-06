import {
  VProgressCircular,
  VIcon,
  VRow,
  VCol
} from 'vuetify/lib'

import { Intersect } from 'vuetify/lib/directives'

export default {
  directives: {
    VIntersect: Intersect
  },
  props: {
    value: Boolean,
    finished: Boolean
  },
  render (gen) {
    return gen('div', [
      this.$slots.default,
      gen(VRow, {
        props: { nogutters: true, align: 'center', justify: 'center' },
        class: 'grey--text',
        directives: [
          {
            name: 'v-intersect',
            value: (entries, observer, isIntersecting) => {
              console.log(entries[0].isIntersecting)
            }
          }
        ]
      }, [
        gen(VProgressCircular, { props: { size: 12, width: 1, indeterminate: true }, class: 'mr-3' }),
        gen('span', { class: 'caption' }, '加载中...')
      ])
    ])
  }
}