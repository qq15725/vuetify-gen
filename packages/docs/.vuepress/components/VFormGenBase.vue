<template>
  <v-container>
    <v-row>
      <v-col cols="12">
        <v-btn @click="$form({ title: 'title', items, outlined: true }).then(submit)" color="primary">表单弹窗</v-btn>
      </v-col>
      {{ form }}
      <v-col cols="12">
        <v-card>
          <v-card-text>
            <v-form-gen
              v-model="form"
              :items="items"
              @submit="submit"
              outlined
            >
            </v-form-gen>
          </v-card-text>
        </v-card>
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
            is: 'text',
            name: 'name',
            data: {
              props: {
                label: 'post name',
                required: true
              }
            }
          },
          { is: 'v-divider' },
          {
            is: 'input',
            name: 'input',
            data: {
              props: {
                label: 'xxx',
                placeholder: 'username label'
              },
              directives: [
                {
                  name: 'mask',
                  value: '####-####-####'
                }
              ]
            },
            cols: 6
          },
          {
            is: 'number',
            name: 'number',
            props: {
              label: 'xxx',
              placeholder: 'username label'
            },
            cols: 6
          },
          { is: 'v-divider' },
          {
            is: 'select',
            name: 'select',
            props: {
              label: 'username',
              items: [
                'asdasdsd',
                'asdasdsdsadds'
              ]
            },
            cols: 6
          },
          {
            is: 'switch',
            name: 'switch',
            props: {
              label: 'switch'
            },
            cols: 6
          },
          { is: 'v-divider' },
          {
            is: 'checkbox',
            name: 'checkbox',
            props: {
              label: 'checkbox1',
              value: 'checkbox1'
            },
            cols: 6
          },
          {
            is: 'radio',
            name: 'radio',
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
            },
            cols: 6
          },
          { is: 'v-divider' },
          {
            is: 'date',
            name: 'date',
            props: {
              label: '日期时间选择'
            }
          },
          { is: 'v-divider' },
          {
            is: 'date',
            name: 'date',
            props: {
              label: '日期选择',
              hideTime: true
            }
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