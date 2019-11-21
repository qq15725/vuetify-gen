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

      <v-col cols="12">
        <v-card>
          <v-form-gen
            v-model="form"
            :items="items"
            @submit="submit"
            single-line
            hide-details
            full-width
            no-gutters
          >
          </v-form-gen>
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
            tag: 'text',
            name: 'name',
            data: {
              props: {
                label: 'post name',
                required: true
              }
            }
          },
          { tag: 'v-divider' },
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
                  value: '####-####-####'
                }
              ]
            },
            cols: 6
          },
          {
            tag: 'number',
            name: 'number',
            props: {
              label: 'xxx',
              placeholder: 'username label'
            },
            cols: 6
          },
          { tag: 'v-divider' },
          {
            tag: 'select',
            name: 'select',
            props: {
              label: 'username',
              items: [
                'asdasdsd',
                'asdasdsdsadds'
              ]
            },
            cols: 12
          },
          { tag: 'v-divider' },
          {
            tag: 'date',
            name: 'date',
            props: {
              label: '日期时间选择'
            }
          },
          { tag: 'v-divider' },
          {
            tag: 'date',
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