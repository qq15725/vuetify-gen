import {
  // Form
  VTextField,
  VTextarea,
  VSelect,
  VSwitch,
  VCheckbox,
  VRadio,
  VRadioGroup,
  VSlider,
  // base
  // img
  VImg,
  // card
  VCard,
  VCardTitle,
  VCardSubtitle,
  VCardText,
  // list
  VList,
  VListItem,
  VListItemContent,
  VListItemTitle,
  VListItemSubtitle,
  VListItemAction,
  VListItemIcon,
  // icon
  VIcon,
  // hr
  VDivider
} from 'vuetify/lib'

import VDateTimePicker from './components/VDateTimePicker'

import { when } from './util'

export default {
  hr: {
    tag: VDivider
  },
  input: {
    tag: VTextField
  },
  'text-input': {
    tag: VTextField
  },
  'number-input': {
    tag: VTextField,
    type: 'number'
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
  radio: ({ attrs: { items = [] } }) => ({
    tag: VRadioGroup,
    model: {
      prop: 'inputValue',
      event: 'change'
    },
    children: items.map(({ label, value }) => ({
      tag: VRadio,
      attrs: {
        label,
        value
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
  'date-time-picker': {
    tag: VDateTimePicker
  },
  card: ({ attrs = {} }) => ({
    tag: VCard,
    children: [
      when(attrs.cover && attrs.cover.src, {
        tag: VImg,
        src: attrs.cover.src,
        aspectRatio: attrs.cover.aspectRatio || 2,
        key: 'cover'
      }),
      when(attrs.title, {
        tag: VCardTitle,
        children: attrs.title,
        key: 'title'
      }),
      when(attrs.subtitle, {
        tag: VCardSubtitle,
        children: attrs.subtitle,
        key: 'subtitle'
      }),
      when(attrs.text, {
        tag: VCardText,
        style: {
          whiteSpace: 'pre-wrap'
        },
        children: attrs.text,
        key: 'text'
      })
    ].sort((a, b) => {
      if (attrs.sort) {
        const sort = attrs.sort.split(',') || []
        let sortA = a ? sort.findIndex(key => key === a.key) : 100
        sortA = sortA < 0 ? 100 : sortA
        let sortB = b ? sort.findIndex(key => key === b.key) : 100
        sortB = sortB < 0 ? 100 : sortB
        return sortA - sortB
      }
      return 0
    })
  }),
  list: ({ attrs = {} }) => ({
    tag: VList,
    children: (attrs.items || []).map(item => ({
      tag: 'list-item',
      ...item
    }))
  }),
  'list-item': ({ attrs = {} }) => {
    const { left = {}, right = {} } = attrs

    return {
      tag: VListItem,
      attrs: {
        href: attrs.href
      },
      children: [
        when(left.text, {
          tag: VListItemAction,
          children: left.text
        }),
        when(left.icon, {
          tag: VListItemIcon,
          children: [
            {
              tag: VIcon,
              children: left.icon
            }
          ]
        }),
        when(attrs.title, {
          tag: VListItemContent,
          children: [
            {
              tag: VListItemTitle,
              children: attrs.title
            },
            when(attrs.subtitle, {
              tag: VListItemSubtitle,
              children: attrs.subtitle
            })
          ]
        }),
        when(right.text, {
          tag: VListItemAction,
          children: right.text
        }),
        when(right.icon, {
          tag: VListItemIcon,
          children: [
            {
              tag: VIcon,
              children: right.icon
            }
          ]
        })
      ]
    }
  }
}