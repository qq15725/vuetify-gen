<template>
  <v-card>
    <v-card-title>{{ title }}</v-card-title>
    <v-card-text>{{ text }}</v-card-text>
  </v-card>
</template>

<script>
  export default {
    props: {
      title: String,
      text: String
    }
  }
</script>