<template>
  <v-row>
    <v-col cols="6">
      <v-gen
        v-for="(item, index) in items"
        :key="index"
        v-bind="item"
      >
      </v-gen>

      <pre class="white--text">{{ formData }}</pre>
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
            props: {
              label: '卡片标题'
            }
          },
          { tag: 'v-divider' },
          {
            tag: 'text',
            name: 'subtitle',
            props: {
              label: '卡片副标题'
            }
          },
          { tag: 'v-divider' },
          {
            tag: 'textarea',
            name: 'text',
            props: {
              label: '卡片正文'
            }
          },
          { tag: 'v-divider' },
          {
            tag: 'text',
            name: 'href',
            props: {
              label: '卡片链接'
            }
          },
          { tag: 'v-divider' },
          {
            tag: 'text',
            name: 'cover.src',
            props: {
              label: '卡片封面'
            }
          },
          { tag: 'v-divider' },
          {
            tag: 'number',
            name: 'cover.aspectRatio',
            props: {
              label: '卡片封面宽高比'
            }
          },
          { tag: 'v-divider' },
          {
            tag: 'text',
            name: 'sort',
            props: {
              label: '排序'
            }
          },
          { tag: 'v-divider' },
          {
            tag: 'checkbox',
            name: 'flat',
            data: {
              staticClass: 'mb-5 mx-1',
              props: {
                label: 'flat'
              }
            },
            cols: 'auto'
          },
          {
            tag: 'checkbox',
            name: 'tile',
            data: {
              staticClass: 'mb-5 mx-1',
              props: {
                label: 'tile'
              }
            },
            cols: 'auto'
          },
          {
            tag: 'checkbox',
            name: 'outlined',
            data: {
              staticClass: 'mb-5 mx-1',
              props: {
                label: 'outlined'
              }
            },
            cols: 'auto'
          },
          {
            tag: 'checkbox',
            name: 'shaped',
            data: {
              staticClass: 'mb-5 mx-1',
              props: {
                label: 'shaped'
              }
            },
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
            props: this.formData
          }
        ]
      }
    }
  }
</script>