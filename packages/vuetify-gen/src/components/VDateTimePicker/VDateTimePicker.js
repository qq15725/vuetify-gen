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
import { parseTime } from '../../util'

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
    cancel: Function,

    hideTime: Boolean
  },
  data () {
    let [date, time] = this.valueToDateTime(this.value)
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
      } else {
        let [date, time] = this.valueToDateTime(val)
        this.date = date
        this.time = time
      }
    },
    isActive (val) {
      if (this.dialog) {
        !!val !== this.value && this.$emit('input', val)
      }
    }
  },
  methods: {
    valueToDateTime (value) {
      let date, time
      if (this.range) {
        date = value || []
        time = null
      } else {
        [date, time] = (value || '').split(' ')
      }
      return [date, time]
    },
    onSubmit () {
      if (this.range) {
        this.$emit('input', this.date)
        this.submit && this.submit(this.date)
        this.resolve(this.date)
      } else {
        const dateTime = this.hideTime
          ? parseTime(new Date(`${this.date} 00:00:00`), '{y}-{m}-{d}')
          : parseTime(new Date(`${this.date} ${this.time}`))
        this.$emit('input', dateTime)
        this.submit && this.submit(dateTime)
        this.resolve(dateTime)
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
      return gen(VMenu, {
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
                    const date = parseTime(new Date(val), '{y}-{m}-{d}')
                    if (this.range) {
                      this.$set(this.date, 0, date)
                    } else {
                      this.date = date
                    }
                  }
                }
              })
            ]),
            !this.hideTime && gen(VCol, [
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
                    const time = parseTime(new Date(`${this.date} ${val}`), '{h}:{i}:{s}')
                    if (this.range) {
                      this.$set(this.date, 1, time)
                    } else {
                      this.time = time
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
                  if (!this.range && !this.hideTime) {
                    this.tab = 1
                  }
                  this.date = val
                }
              }
            })
          ]),
          !this.hideTime && gen(VTabItem, [
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
                input: val => {
                  this.time = val
                }
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
    return this.dialog
      ? this.genDialog([this.genPicker()])
      : this.genMenu([this.genPicker()])
  }
})