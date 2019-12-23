<template>
  <v-card>
    <v-card-title>{{ title }}</v-card-title>
    <v-card-subtitle>{{ subtitle }}</v-card-subtitle>
  </v-card>
</template>

<script>
  export default {
    props: {
      title: String,
      subtitle: String
    },
    form () {
      return [
        {
          tag: 'input',
          name: 'title',
          label: '卡片标题'
        },
        { tag: 'hr' },
        {
          tag: 'input',
          name: 'subtitle',
          label: '卡片副标题'
        },
        { tag: 'hr' },
        {
          tag: 'textarea',
          name: 'text',
          label: '卡片正文'
        },
        { tag: 'hr' },
        {
          tag: 'input',
          name: 'href',
          label: '卡片链接'
        },
        { tag: 'hr' },
        {
          tag: 'text',
          name: 'cover.src',
          label: '卡片封面'
        },
        { tag: 'hr' },
        {
          tag: 'number-input',
          name: 'cover.aspectRatio',
          label: '卡片封面宽高比'
        },
        { tag: 'hr' },
        {
          tag: 'text',
          name: 'sort',
          label: '排序'
        },
        { tag: 'hr' },
        {
          tag: 'checkbox',
          name: 'flat',
          staticClass: 'mb-5 mx-1',
          label: 'flat',
          cols: 'auto'
        },
        {
          tag: 'checkbox',
          name: 'tile',
          staticClass: 'mb-5 mx-1',
          label: 'tile',
          cols: 'auto'
        },
        {
          tag: 'checkbox',
          name: 'outlined',
          staticClass: 'mb-5 mx-1',
          label: 'outlined',
          cols: 'auto'
        },
        {
          tag: 'checkbox',
          name: 'shaped',
          staticClass: 'mb-5 mx-1',
          label: 'shaped',
          cols: 'auto'
        }
      ]
    }
  }
</script>
