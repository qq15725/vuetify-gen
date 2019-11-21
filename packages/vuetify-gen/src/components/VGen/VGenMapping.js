import {
  VTextField,
  VTextarea,
  VSelect,
  VSwitch,
  VCheckbox,
  VRadio,
  VRadioGroup,
  VSlider
} from 'vuetify/lib'

import VDateTimePicker from '../VDateTimePicker'

import { mergeObject } from '../../util'

export default {
  install: (Vue, { mapping = {} }) => {
    let defaultMapping = {
      input: {
        tag: VTextField
      },
      text: {
        tag: VTextField
      },
      number: {
        tag: VTextField,
        data: {
          props: {
            type: 'number'
          }
        }
      },
      textarea: {
        tag: VTextarea
      },
      select: {
        tag: VSelect
      },
      switch: {
        tag: VSwitch,
        model: {
          prop: 'inputValue',
          event: 'change'
        }
      },
      checkbox: {
        tag: VCheckbox,
        model: {
          prop: 'inputValue',
          event: 'change'
        }
      },
      radio: ({ props: { items = [] } }) => ({
        tag: VRadioGroup,
        model: {
          prop: 'inputValue',
          event: 'change'
        },
        children: items.map(({ label, value }) => ({
          tag: VRadio,
          data: {
            props: {
              label,
              value
            }
          }
        }))
      }),
      slider: {
        tag: VSlider,
        model: {
          prop: 'input',
          event: 'change'
        }
      },
      date: {
        tag: VDateTimePicker
      }
    }

    Vue.$vuetifyGenMapping = Vue.prototype.$vuetifyGenMapping = mergeObject(defaultMapping, mapping)
  }
}