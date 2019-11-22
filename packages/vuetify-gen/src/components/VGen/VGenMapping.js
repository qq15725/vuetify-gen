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
  VImg,
  VCard,
  VCardTitle,
  VCardSubtitle,
  VCardText,
} from 'vuetify/lib'

import VDateTimePicker from '../VDateTimePicker'

import { mergeObject, when } from '../../util'

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
      date: {
        tag: VDateTimePicker
      },
      card: ({ attrs }) => ({
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
      list: ({ attrs }) => ({
        tag: 'v-list',
        children: (attrs.items || []).map(item => ({
          tag: 'v-list-item',
          attrs: {
            href: item.href
          },
          children: [
            when(item.leftText, {
              tag: 'v-list-item-action',
              children: item.leftText
            }),
            when(item.title, {
              tag: 'v-list-item-content',
              children: [
                {
                  tag: 'v-list-item-title',
                  children: item.title
                },
                when(item.subtitle, {
                  tag: 'v-list-item-subtitle',
                  children: item.subtitle
                })
              ]
            }),
            when(item.rightText, {
              tag: 'v-list-item-action',
              children: item.rightText
            }),
          ]
        }))
      })
    }

    Vue.$vuetifyGenMapping = Vue.prototype.$vuetifyGenMapping = mergeObject(defaultMapping, mapping)
  }
}