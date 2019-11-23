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
          items: [
            {
              left: {
                text: '左侧'
              },
              right: {
                text: '右侧'
              },
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
            tag: 'input',
            name: 'items.0.left.text',
            label: '左侧文本1'
          },
          { tag: 'hr' },
          {
            tag: 'input',
            name: 'items.0.right.text',
            label: '右侧文本1'
          },
          { tag: 'hr' },
          {
            tag: 'input',
            name: 'items.0.href',
            label: '跳转链接1'
          },
          { tag: 'hr' },
          {
            tag: 'input',
            name: 'items.0.title',
            label: '列表标题1'
          },
          { tag: 'hr' },
          {
            tag: 'input',
            name: 'items.0.subtitle',
            label: '列表副标题1'
          },
          { tag: 'hr' },
          {
            tag: 'input',
            name: 'items.1.title',
            label: '列表副标题2'
          },
          { tag: 'hr' },
          {
            tag: 'input',
            name: 'items.1.subtitle',
            label: '列表副标题2'
          }
        ]
      }
    },
    computed: {
      items () {
        return [
          {
            tag: 'list',
            ...this.formData
          }
        ]
      }
    }
  }
</script>