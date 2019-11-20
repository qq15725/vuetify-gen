<template>
  <v-container>
    <v-row>
      <v-col cols="12">
        <v-btn @click="$form({ title: 'title', items, outlined: true }).then(submit)" color="primary">表单弹窗</v-btn>
      </v-col>
      <v-col cols="12">
        {{ form }}
        <v-form-gen
          v-model="form"
          :items="items"
          outlined
          dense
        >
        </v-form-gen>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
  export default {
    data () {
      return {
        form: {},
        items: [
          {
            tag: 'input',
            name: 'input',
            data: {
              props: {
                label: 'xxx',
                placeholder: 'username label'
              },
              directives: [
                {
                  name: 'mask',
                  value: '#/#/#'
                }
              ]
            },
            cols: 6
          },
          {
            tag: 'number',
            name: 'number',
            data: {
              props: {
                label: 'xxx',
                placeholder: 'username label'
              }
            },
            cols: 6
          },
          {
            tag: 'select',
            name: 'select',
            data: {
              props: {
                label: 'xxx',
                placeholder: 'username label',
                items: [
                  'asdasdsd',
                  'asdasdsdsadds'
                ]
              }
            },
            cols: 6
          },
          {
            tag: 'switch',
            name: 'switch',
            data: {
              props: {
                label: 'switch'
              }
            },
            cols: 6
          },
          {
            tag: 'checkbox',
            name: 'checkbox',
            data: {
              props: {
                label: 'checkbox1',
                value: 'checkbox1'
              }
            },
            cols: 6
          },
          {
            tag: 'radio',
            name: 'radio',
            data: {
              props: {
                label: 'radio',
                row: true,
                items: [
                  {
                    label: 'radio1',
                    value: 1
                  },
                  {
                    label: 'radio2',
                    value: 2
                  }
                ]
              }
            },
            cols: 6
          },
          {
            tag: 'slider',
            name: 'slider',
            cols: 6
          },
          {
            tag: 'date',
            name: 'date',
            cols: 6
          },
          {
            is: 'date',
            name: 'date',
            props: {
              hideTime: true
            },
            cols: 6
          }
        ]
      }
    },
    methods: {
      submit (val) {
        console.log('submit', val)
      }
    }
  }
</script>