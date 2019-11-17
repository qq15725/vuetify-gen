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

export default {
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
    staticClass: 'ma-0 pa-0',
    model: {
      prop: 'inputValue',
      event: 'change'
    }
  },
  checkbox: {
    tag: VCheckbox,
    staticClass: 'ma-0 pa-0',
    model: {
      prop: 'inputValue',
      event: 'change'
    }
  },
  radio: ({ props: { items = [] } }) => ({
    tag: VRadioGroup,
    staticClass: 'ma-0 pa-0',
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