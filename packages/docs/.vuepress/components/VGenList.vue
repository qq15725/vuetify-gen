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
    <v-col cols="12">
      <pre class="white--text">{{ createVNodeConstruct(items[0]) }}</pre>
    </v-col>
  </v-row>
</template>

<script>
  import { createVNodeConstruct } from 'vuetify-gen/src/components/VGen/create-vnode-construct'

  export default {
    data () {
      return {
        formData: {
          items: [
            {
              leftText: '左侧',
              rightText: '右侧',
              title: '列表标题1',
              subtitle: '列表副标题1'
            },
            {
              title: '列表标题2',
              subtitle: '列表副标题2'
            }
          ]
        },
        formItems: [
          {
            tag: 'text',
            name: 'items.0.leftText',
            props: {
              label: '左侧文本1'
            }
          },
          { tag: 'v-divider' },
          {
            tag: 'text',
            name: 'items.0.rightText',
            props: {
              label: '右侧文本1'
            }
          },
          { tag: 'v-divider' },
          {
            tag: 'text',
            name: 'items.0.href',
            props: {
              label: '跳转链接1'
            }
          },
          { tag: 'v-divider' },
          {
            tag: 'text',
            name: 'items.0.title',
            props: {
              label: '列表标题1'
            }
          },
          { tag: 'v-divider' },
          {
            tag: 'text',
            name: 'items.0.subtitle',
            props: {
              label: '列表副标题1'
            }
          },
          { tag: 'v-divider' },
          {
            tag: 'text',
            name: 'items.1.title',
            props: {
              label: '列表标题2'
            }
          },
          { tag: 'v-divider' },
          {
            tag: 'text',
            name: 'items.1.subtitle',
            props: {
              label: '列表副标题2'
            }
          }
        ]
      }
    },
    methods: {
      createVNodeConstruct
    },
    computed: {
      items () {
        return [
          {
            tag: 'list',
            props: this.formData
          }
        ]
      }
    }
  }
</script>