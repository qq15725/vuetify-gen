<template>
  <v-container>
    <v-row>
      <v-col cols="12">
        <v-card>
          <v-card-text>
            <v-gen
              v-for="(item, index) in items"
              :key="index"
              v-bind="item"
            >
            </v-gen>
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
        items: [
          {
            tag: 'v-template-card',
            data: {
              props: {
                title: 'xxx',
                text: 'xxxxx'
              }
            }
          }
        ]
      }
    }
  }
</script>