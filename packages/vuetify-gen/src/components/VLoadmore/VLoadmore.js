import {
  VProgressCircular,
  VIcon,
  VRow,
  VCol
} from 'vuetify/lib'

import { Intersect } from 'vuetify/lib/directives'

export default {
  name: 'v-loadmore',
  directives: {
    VIntersect: Intersect
  },
  props: {
    tag: {
      type: [String, Object],
      default: 'div'
    },
    value: Boolean,
    loadingText: String,
    finished: Boolean,
    finishedText: String
  },
  methods: {
    genNoMore () {
      const gen = this.$createElement
      return gen(VRow, {
        props: {
          nogutters: true,
          align: 'center',
          justify: 'center'
        },
        class: 'grey--text'
      }, [
        gen('span', { class: 'caption' }, this.finishedText || '没有更多了')
      ])
    },
    genDefaultLoadingSlot () {
      const gen = this.$createElement
      return [
        gen(VProgressCircular, {
          props: {
            size: 12,
            width: 1,
            indeterminate: true
          },
          class: 'mr-3'
        }),
        gen('span', { class: 'caption' }, this.loadingText || '加载中...')
      ]
    },
    genLoading () {
      const gen = this.$createElement
      return gen(VRow, {
        props: {
          nogutters: true,
          align: 'center',
          justify: 'center'
        },
        class: 'grey--text',
        directives: [
          {
            name: 'v-intersect',
            value: entries => {
              if (entries[0].isIntersecting && !this.value) {
                if (!this.finished) {
                  this.$emit('load')
                }
              }
            }
          }
        ]
      }, [
        this.$slots.loading || this.genDefaultLoadingSlot()
      ])
    }
  },
  render (gen) {
    return gen(this.tag, { class: ['v-loadmore'] },  [
      this.$slots.default,
      this.finished ? this.genNoMore() : this.genLoading()
    ])
  }
}