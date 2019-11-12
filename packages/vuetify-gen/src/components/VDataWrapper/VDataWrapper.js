import {
  VDataTable,
  VDataIterator,
  VPagination
} from 'vuetify/lib'

import VLoadmore from '../VLoadmore'

export default {
  name: 'v-data-wrapper',
  inheritAttrs: false,
  props: {
    value: Array,
    page: {
      type: Number,
      default: 1
    },
    itemsPerPage: {
      type: Number,
      default: 10
    },
    headers: Array,
    loading: Boolean,

    iterator: Boolean,
    loadmore: Boolean,
    finished: Boolean
  },
  data () {
    return {
      dataPage: this.page,
      pageCount: 0
    }
  },
  watch: {
    page (val) {
      this.dataPage = val
    },
    dataPage (val) {
      val !== this.page && this.$emit('update:page', val)
    }
  },
  computed: {
    dataItemsPerPage () {
      return this.loadmore ? -1 : this.itemsPerPage
    },
    commonProps () {
      return {
        page: this.dataPage,
        itemsPerPage: this.dataItemsPerPage,
        loading: this.loading,
        hideDefaultFooter: true,
        ...this.$attrs
      }
    },
    commonListeners () {
      return this.$listeners
    }
  },
  methods: {
    genDataIterator () {
      const gen = this.$createElement
      return gen(VDataIterator, {
        class: [
          'v-data-wrapper--iterator'
        ],
        props: this.commonProps,
        on: {
          'update:page': val => this.dataPage = val,
          // lost page-count event
          pagination: (pagination) => {
            this.pageCount = pagination.pageCount
            this.$emit('pagination', pagination)
          },
          ...this.commonListeners
        },
        slots: this.$slots,
        scopedSlots: this.$scopedSlots
      })
    },
    genDataTable () {
      const gen = this.$createElement
      return gen(VDataTable, {
        class: [
          'v-data-wrapper--table',
          'transparent'
        ],
        props: {
          ...this.commonProps,
          headers: this.headers,
          dense: this.dense
        },
        on: {
          'update:page': val => this.dataPage = val,
          'page-count': val => this.pageCount = val,
          ...this.commonListeners
        },
        slots: this.$slots,
        scopedSlots: this.$scopedSlots
      })
    },
    genPagination () {
      const gen = this.$createElement
      return gen(VPagination, {
        props: {
          value: this.dataPage,
          length: this.pageCount
        },
        on: {
          input: val => this.dataPage = val
        }
      })
    },
    genLoadmore (children) {
      const gen = this.$createElement
      return gen(VLoadmore, {
        props: {
          value: this.loading,
          finished: this.finished
        },
        on: {
          load: () => this.$emit('load')
        },
        slots: {
          loading: this.$slots.loadmore
        }
      }, children)
    }
  },
  render (gen) {
    let children = [
      this.iterator ? this.genDataIterator() : this.genDataTable()
    ]
    if (this.loadmore) {
      children = [
        this.genLoadmore(children)
      ]
    } else {
      children.push(
        this.genPagination()
      )
    }
    return gen('div', { class: 'v-data-wrapper' }, children)
  }
}