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
        props: {
          type: 'number'
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
          props: {
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
      card: ({ props }) => ({
        tag: VCard,
        children: [
          when(props.cover && props.cover.src, {
            tag: VImg,
            props: {
              src: props.cover.src,
              aspectRatio: props.cover.aspectRatio || 2
            },
            key: 'cover'
          }),
          when(props.title, {
            tag: VCardTitle,
            children: props.title,
            key: 'title'
          }),
          when(props.subtitle, {
            tag: VCardSubtitle,
            children: props.subtitle,
            key: 'subtitle'
          }),
          when(props.text, {
            tag: VCardText,
            style: {
              whiteSpace: 'pre-wrap'
            },
            children: props.text,
            key: 'text'
          })
        ].sort((a, b) => {
          if (props.sort) {
            const sort = props.sort.split(',') || []
            let sortA = a ? sort.findIndex(key => key === a.key) : 100
            sortA = sortA < 0 ? 100 : sortA
            let sortB = b ? sort.findIndex(key => key === b.key) : 100
            sortB = sortB < 0 ? 100 : sortB
            return sortA - sortB
          }
          return 0
        })
      }),
      list: ({ props }) => ({
        tag: 'v-list',
        children: (props.items || []).map(item => ({
          tag: 'v-list-item',
          props: {
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