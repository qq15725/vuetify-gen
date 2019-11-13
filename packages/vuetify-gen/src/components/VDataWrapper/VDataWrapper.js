import {
  VDataTable,
  VDataIterator,
  VPagination,
  VRow,
  VCol,
  VTextField,
  VSelect,
  VContainer
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
    rowsPerPageItems: {
      type: Array,
      default: () => [
        5, 10, 24
      ]
    },
    serverItemsLength: Number,
    hideDefaultFooter: Boolean,
    loading: Boolean,

    iterator: Boolean,
    loadmore: Boolean,
    finished: Boolean
  },
  data () {
    return {
      pagination: {
        itemsLength: 0,
        itemsPerPage: this.itemsPerPage,
        page: this.page,
        pageCount: 0,
        pageStart: 0,
        pageStop: 0
      },
      dataItemsPerPage: this.itemsPerPage
    }
  },
  watch: {
    page (val) {
      this.pagination.page = val
    }
  },
  computed: {
    itemsLength () {
      return this.serverItemsLength || this.pagination.itemsLength
    },
    commonProps () {
      return {
        ...this.$attrs,
        page: this.pagination.page,
        itemsPerPage: this.loadmore ? -1 : this.dataItemsPerPage,
        loading: this.loading,
        hideDefaultFooter: true,
        serverItemsLength: this.serverItemsLength
      }
    },
    commonListeners () {
      return {
        pagination: (pagination) => {
          this.pagination = {
            ...pagination
          }
          if (!this.loadmore) {
            this.dataItemsPerPage = pagination.itemsPerPage
          }
          this.$emit('pagination', {
            ...pagination,
            itemsPerPage: this.dataItemsPerPage
          })
        },
        'update:options': options => {
          this.$emit('update:options', {
            ...options,
            itemsPerPage: this.dataItemsPerPage
          })
        },
        ...this.$listeners
      }
    }
  },
  methods: {
    genSlots () {
      const gen = this.$createElement
      return Object.keys(this.$slots).map(key => gen('div', { slot: key }, this.$slots[key]))
    },
    genDataIterator () {
      const gen = this.$createElement
      return gen(VDataIterator, {
        class: [
          'v-data-wrapper--iterator'
        ],
        props: this.commonProps,
        on: this.commonListeners,
        scopedSlots: this.$scopedSlots
      }, this.genSlots())
    },
    genDataTable () {
      const gen = this.$createElement
      return gen(VDataTable, {
        class: [
          'v-data-wrapper--table',
          'transparent'
        ],
        props: this.commonProps,
        on: this.commonListeners,
        scopedSlots: this.$scopedSlots
      }, this.genSlots())
    },
    genPagination () {
      const gen = this.$createElement
      return gen(VContainer, { props: { fluid: true } }, [
        gen(VRow, {
          props: {
            align: 'center',
            justify: 'end'
          },
          class: ['caption']
        }, [
          gen(VCol, { props: { cols: 'auto' } }, [
            `共 ${this.itemsLength} 条`
          ]),
          gen(VCol, { props: { cols: 'auto' } }, [
            gen(VSelect, {
              props: {
                value: this.dataItemsPerPage,
                outlined: true,
                dense: true,
                hideDetails: true,
                items: this.rowsPerPageItems.map(item => ({
                  text: `${item}条/页`,
                  value: item
                }))
              },
              on: {
                input: val => this.dataItemsPerPage = val
              },
              class: ['caption'],
              style: {
                width: '120px',
              }
            })
          ]),
          gen(VCol, { props: { cols: 'auto' } }, [
            gen(VPagination, {
              props: {
                value: this.pagination.page,
                length: Math.ceil(this.itemsLength / this.dataItemsPerPage)
              },
              on: {
                input: val => this.pagination.page = val
              }
            })
          ]),
          gen(VCol, { props: { cols: 'auto' } }, [
            gen(VTextField, {
              props: {
                value: this.pagination.page,
                outlined: true,
                dense: true,
                hideDetails: true,
                prefix: '前往',
                suffix: '页'
              },
              on: {
                change: val => {
                  const endPage = Math.ceil(this.itemsLength / this.dataItemsPerPage)
                  if (val > endPage) {
                    this.pagination.page = endPage
                  } else if (val < 1) {
                    this.pagination.page = 1
                  } else {
                    this.pagination.page = parseInt(val)
                  }
                }
              },
              class: ['caption'],
              style: {
                width: '100px',
              }
            })
          ])
        ])
      ])
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
      if (!this.hideDefaultFooter) {
        children.push(
          this.genPagination()
        )
      }
    }
    return gen('div', { class: 'v-data-wrapper' }, children)
  }
}