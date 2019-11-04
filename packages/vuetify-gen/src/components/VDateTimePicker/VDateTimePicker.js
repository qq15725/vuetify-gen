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
  VDivider
} from 'vuetify/lib'
import { parseTime } from '../../util'

export default {
  inheritAttrs: false,
  name: 'v-date-time-picker',
  props: {
    value: String,
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
    allowedDates: Function
  },
  data () {
    const [date, time] = (this.value || '').split(' ')
    return {
      date: date || '',
      time: time || '',
      tab: 0,
      isActive: false
    }
  },
  methods: {
    submit () {
      this.$emit('input', `${this.date} ${this.time}`)
      this.isActive = false
    },
    now () {
      const now = new Date()
      this.date = parseTime(now, '{y}-{m}-{d}')
      this.time = parseTime(now, '{h}:{i}')
    },
    defaultActivator ({ on }) {
      return this.$createElement(VTextField, {
        on,
        props: {
          value: this.value,
          outlined: true,
          readonly: true,
          ...this.$attrs
        }
      })
    }
  },
  render (gen) {
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
    }, [
      gen(VCard, [
        gen(VCardTitle, { class: 'pa-2' }, [
          gen(VRow, {
            props: {
              dense: true
            }
          }, [
            gen(VCol, [
              gen(VTextField, {
                props: {
                  value: this.date,
                  dense: true,
                  outlined: true,
                  hideDetails: true
                },
                on: {
                  click: () => this.tab = 0,
                  input: val => this.date = val
                }
              })
            ]),
            gen(VCol, [
              gen(VTextField, {
                props: {
                  value: this.time,
                  dense: true,
                  outlined: true,
                  hideDetails: true
                },
                on: {
                  click: () => this.tab = 1,
                  input: val => this.time = val
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
                allowedDates: this.allowedDates
              },
              on: {
                input: val => {
                  this.tab = 1
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
              text: true,
              small: true
            },
            on: {
              click: this.now
            }
          }, '此刻'),
          gen(VBtn, {
            props: {
              color: 'primary',
              small: true,
              dark: true,
              depressed: true,
              outlined: true
            },
            on: {
              click: this.submit
            }
          }, '确定'),
        ])
      ])
    ])
  }
}