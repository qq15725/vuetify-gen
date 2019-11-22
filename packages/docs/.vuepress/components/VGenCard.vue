<template>
  <v-row>
    <v-col cols="6">
      <v-gen
        v-for="(item, index) in items"
        :key="index"
        v-bind="item"
      >
      </v-gen>

      <pre class="white--text">{{ items }}</pre>
    </v-col>

    <v-col cols="6">
      <v-card>
        <v-form-gen
          v-model="formData"
          :items="formItems"
          single-line
          hide-details
          full-width
          no-gutters
        >
        </v-form-gen>
      </v-card>
    </v-col>
  </v-row>
</template>

<script>
  export default {
    data () {
      return {
        formData: {
          title: '卡片标题',
          subtitle: '卡片副标题',
          text: "卡片正文卡片正文卡片正文卡片正文卡片正文卡片正文卡片正文卡片正文\n卡片正文卡片正文卡片正",
          cover: {
            src: 'https://cdn.vuetifyjs.com/images/cards/docks.jpg',
            aspectRatio: 2
          },
          sort: 'title,subtitle'
        },
        formItems: [
          {
            tag: 'text',
            name: 'title',
            label: '卡片标题'
          },
          { tag: 'v-divider' },
          {
            tag: 'text',
            name: 'subtitle',
            label: '卡片副标题'
          },
          { tag: 'v-divider' },
          {
            tag: 'textarea',
            name: 'text',
            label: '卡片正文'
          },
          { tag: 'v-divider' },
          {
            tag: 'text',
            name: 'href',
            label: '卡片链接'
          },
          { tag: 'v-divider' },
          {
            tag: 'text',
            name: 'cover.src',
            label: '卡片封面'
          },
          { tag: 'v-divider' },
          {
            tag: 'number',
            name: 'cover.aspectRatio',
            label: '卡片封面宽高比'
          },
          { tag: 'v-divider' },
          {
            tag: 'text',
            name: 'sort',
            label: '排序'
          },
          { tag: 'v-divider' },
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
    },
    computed: {
      items () {
        return [
          {
            tag: 'card',
            ...this.formData
          }
        ]
      }
    }
  }
</script>