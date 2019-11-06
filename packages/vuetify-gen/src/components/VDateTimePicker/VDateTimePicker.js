import {
  VMenu,
  VBtn,
  VRow,
  VCol,
  VTextField,
  VCard,
  VCardTitle,
  VCardActions,
  VDatePicker,
  VTimePicker,
  VTabsItems,
  VTabItem,
  VDivider,
  VDialog
} from 'vuetify/lib'
import promiseable from '../../mixins/promiseable'
import mixins from '../../util/mixins'

export default mixins(promiseable).extend({
  inheritAttrs: false,
  name: 'v-date-time-picker',
  props: {
    value: [String, Array, Boolean],
    disabled: Boolean,
    maxWidth: {
      type: [Number, String],
      default: 300
    },
    locale: {
      type: String,
      default: 'zh-cn'
    },
    max: String,
    min: String,
    allowedDates: Function,
    range: Boolean,
    dialog: Boolean,
    persistent: Boolean,

    submit: Function,
    cancel: Function
  },
  data () {
    let date, time
    if (this.range) {
      date = this.value || []
    } else {
      [date, time] = (this.value || '').split(' ')
    }
    return {
      date: date || null,
      time: time || null,
      tab: 0,
      isActive: this.dialog ? !!this.value : false
    }
  },
  watch: {
    value (val) {
      if (this.dialog) {
        this.isActive = !!val
      }
    },
    isActive (val) {
      if (this.dialog) {
        !!val !== this.value && this.$emit('input', val)
      }
    }
  },
  methods: {
    onSubmit () {
      if (this.range) {
        this.$emit('input', this.date)
        this.submit && this.submit(this.date)
        this.resolve(this.date)
      } else {
        this.$emit('input', `${this.date} ${this.time}`)
        this.submit && this.submit(`${this.date} ${this.time}`)
        this.resolve(`${this.date} ${this.time}`)
      }
      this.isActive = false
    },
    onCancel () {
      this.cancel && this.cancel()
      this.$emit('cancel')
      this.reject(new Error('cancel'))
      this.isActive = false
    },
    defaultActivator ({ on }) {
      return this.$createElement(VTextField, {
        on,
        props: {
          value: this.range ? (this.value || []).join(' - ') : this.value,
          outlined: true,
          readonly: true,
          ...this.$attrs
        }
      })
    },
    genMenu (children) {
      const gen = this.$createElement
      gen(VMenu, {
        props: {
          value: this.isActive,
          disabled: this.disabled,
          closeOnContentClick: false,
          maxWidth: this.maxWidth,
          offsetY: true,
          bottom: true
        },
        on: {
          input: val => this.isActive = val
        },
        scopedSlots: {
          activator: this.$scopedSlots.activator || this.defaultActivator
        }
      }, children)
    },
    genDialog (children) {
      const gen = this.$createElement
      return gen(VDialog, {
        props: {
          value: this.isActive,
          maxWidth: this.maxWidth,
          persistent: this.persistent
        },
        on: {
          input: val => this.isActive = val
        },
        scopedSlots: {
          activator: this.$scopedSlots.activator
        }
      }, children)
    },
    genPicker () {
      const gen = this.$createElement
      return gen(VCard, [
        gen(VCardTitle, { class: 'pa-2' }, [
          gen(VRow, {
            props: {
              dense: true
            }
          }, [
            gen(VCol, [
              gen(VTextField, {
                props: {
                  value: this.range ? this.date[0] : this.date,
                  dense: true,
                  outlined: true,
                  hideDetails: true
                },
                on: {
                  click: () => {
                    if (!this.range) {
                      this.tab = 0
                    }
                  },
                  input: val => {
                    if (this.range) {
                      this.$set(this.date, 0, val)
                    } else {
                      this.date = val
                    }
                  }
                }
              })
            ]),
            gen(VCol, [
              gen(VTextField, {
                props: {
                  value: this.range ? this.date[1] : this.time,
                  dense: true,
                  outlined: true,
                  hideDetails: true
                },
                on: {
                  click: () => {
                    if (!this.range) {
                      this.tab = 1
                    }
                  },
                  input: val => {
                    if (this.range) {
                      this.$set(this.date, 1, val)
                    } else {
                      this.time = val
                    }
                  }
                }
              })
            ])
          ]),
        ]),

        gen(VDivider),

        gen(VTabsItems, {
          props: {
            value: this.tab
          }
        }, [
          gen(VTabItem, [
            gen(VDatePicker, {
              class: 'elevation-0',
              props: {
                value: this.date,
                noTitle: true,
                fullWidth: true,
                scrollable: true,
                locale: this.locale,
                min: this.min,
                max: this.max,
                allowedDates: this.allowedDates,
                range: this.range
              },
              on: {
                input: val => {
                  if (!this.range) {
                    this.tab = 1
                  }
                  this.date = val
                }
              }
            })
          ]),
          gen(VTabItem, [
            gen(VTimePicker, {
              class: 'elevation-0',
              props: {
                value: this.time,
                noTitle: true,
                format: '24hr',
                fullWidth: true,
                scrollable: true,
                useSeconds: true,
                locale: this.locale
              },
              on: {
                input: val => this.time = val
              }
            })
          ])
        ]),

        gen(VDivider),

        gen(VCardActions, { class: 'justify-end' }, [
          gen(VBtn, {
            props: {
              color: 'primary',
              small: true,
              dark: true,
              depressed: true
            },
            on: {
              click: this.onSubmit
            }
          }, '确定'),
          gen(VBtn, {
            props: {
              color: 'primary',
              small: true,
              dark: true,
              depressed: true,
              outlined: true
            },
            on: {
              click: this.onCancel
            }
          }, '取消'),
        ])
      ])
    }
  },
  render () {
    return this.dialog ? this.genDialog([this.genPicker()]) : this.genMenu([this.genPicker()])
  }
})