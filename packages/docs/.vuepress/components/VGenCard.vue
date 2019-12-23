<template>
  <v-container>
    <v-row>
      <v-col cols="6">
        <v-gen
          v-bind="item"
        >
        </v-gen>
      </v-col>

      <v-col cols="6">
        <v-card>
          <v-form-gen
            v-model="form"
            :items="items"
            single-line
            hide-details
            full-width
            no-gutters
          >
          </v-form-gen>
        </v-card>
      </v-col>

      <v-col cols="12">
        <v-card>
          <v-card-title>JSON</v-card-title>
          <v-json-editor :value="item"></v-json-editor>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
  import GenCard from './gen/card'

  export default {
    data () {
      return {
        form: {
          title: '卡片标题',
          subtitle: '卡片副标题',
          text: "卡片正文卡片正文卡片正文卡片正文卡片正文卡片正文卡片正文卡片正文\n卡片正文卡片正文卡片正",
          cover: {
            src: 'https://cdn.vuetifyjs.com/images/cards/docks.jpg',
            aspectRatio: 2
          },
          sort: 'title,subtitle'
        },
        items: GenCard.form()
      }
    },
    computed: {
      item () {
        return {
          tag: GenCard,
          ...this.form
        }
      }
    }
  }
</script>