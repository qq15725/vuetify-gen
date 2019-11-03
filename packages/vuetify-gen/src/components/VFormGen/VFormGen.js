import {
  VForm,
  VRow,
  VCol
} from 'vuetify/lib'
import { getObjectValueByPath } from 'vuetify/lib/util/helpers'

export default {
  inheritAttrs: false,
  props: {
    lazyValidation: {
      type: Boolean,
      default: true
    },
    value: Object,
    items: {
      type: Array,
      default: () => []
    },
    disabled: Boolean,
    box: Boolean,

    outlined: Boolean,
    rounded: Boolean,
    solo: Boolean,
    flat: Boolean,
    singleLine: Boolean,
    shaped: Boolean,
    dense: Boolean,

    hideDetails: Boolean,
    errors: {
      type: Object,
      default: () => ({})
    }
  },
  data () {
    return {
      inputValues: {}
    }
  },
  methods: {
    submit (e) {
      if (this.$refs.form.validate()) {
        this.$emit('submit')
      }
      e.preventDefault()
    },
    getObjectValueByPath (value, name) {
      if (name.indexOf('|') > -1) {
        return name.split('|').map(_name => getObjectValueByPath(value, _name))
      }
      return getObjectValueByPath(value, name)
    },
    deepSet (name, value) {
      if (name.indexOf('.') > -1) {
        let _value = this.value
        const attrs = name.split('.')
        attrs.forEach((attr, index) => {
          if ((attrs.length - 1) === index) {
            this.$set(_value, attr, value)
          } else {
            _value = _value[attr]
          }
        })
      } else {
        this.$set(this.value, name, value)
      }
    },
    onInput (item, value) {
      if (item.name.indexOf('|') > -1) {
        item.name.split('|').forEach((name, index) => {
          this.deepSet(name, value[index])
        })
      } else {
        this.deepSet(item.name, value)
      }
      this.$emit('input', this.value)
    },
    onChange (index, item, val) {
      if (this.$refs.components && this.$refs.components[index]) {
        const classList = this.$refs.components[index].$el.classList.value
        if (['v-file-input', 'v-input--switch', 'v-input--checkbox'].some(className => classList.indexOf(className) > -1)) {
          this.onInput(item, val)
        }
      }
    }
  },
  mounted () {
    const handle = (item, index) => {
      if (item.$el && item.$el.classList) {
        const classList = item.$el.classList.value
        if (['v-input--switch', 'v-input--checkbox'].some(className => classList.indexOf(className) > -1)) {
          this.$set(this.inputValues, index, item.value)
        }
      }
    }

    if (this.$refs.components) {
      if (this.$refs.components[0]) {
        this.$refs.components.forEach((item, index) => handle(item, index))
      } else {
        handle(this.$refs.components, 0)
      }
    }
  },
  render (gen) {
    return gen(VForm, {
      props: {
        lazyValidation: this.lazyValidation
      },
      on: {
        submit: this.submit
      },
      ref: 'form'
    }, [
      gen(VRow, {
        align: 'center',
        dense: this.dense
      }, [
        this.$slots.before,
        this.items.filter(item => !item.hide).map((item, index) => gen(VCol, {
          props: {
            cols: '12',
            ...Object.keys(item).filter(key => ['name', 'is', 'on', '$slots'].indexOf(key) === -1).reduce((o, i) => ({ [i]: item[i], ...o }), {})
          },
          on: {
            click: e => item.click && item.click(e)
          }
        }, [
          item.is ? gen(item.is, {
            ref: 'components',
            class: [this.dense ? 'caption' : ''],
            props: {
              value: item.name ? getObjectValueByPath(this.value, item.name) : undefined,
              errorMessages: item.name ? (this.errors[item.name] ? this.errors[item.name].join(',') : undefined) : undefined,
              inputValue: this.inputValues[index],
              ...Object.assign({
                disabled: this.disabled,
                hideDetails: this.hideDetails,
                outlined: this.outlined,
                rounded: this.rounded,
                solo: this.solo,
                flat: this.flat,
                singleLine: this.singleLine,
                shaped: this.shaped,
                dense: this.dense
              }, item.props)
            },
            on: {
              input: val => this.onInput(item, val),
              change: val => this.onChange(index, item, val),
              ...(item.on || {})
            }
          }, [
            item.$slots ? item.$slots.default : ''
          ]) : ''
        ])),
        this.$slots.after,
        this.$slots.default
      ])
    ])
  }
}