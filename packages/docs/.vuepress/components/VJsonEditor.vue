<template>
  <v-codemirror v-model="computedValue" :options="options"></v-codemirror>
</template>

<script>
  import 'codemirror/lib/codemirror.css'

  // language
  import 'codemirror/mode/javascript/javascript.js'

  // theme css
  import 'codemirror/theme/rubyblue.css'

  export default {
    name: 'VJsonEditor',
    props: ['value'],
    data () {
      return {
        options: {
          lineNumbers: true,
          mode: 'application/json',
          gutters: ['CodeMirror-lint-markers'],
          theme: 'rubyblue'
        }
      }
    },
    computed: {
      computedValue: {
        get () {
          if (typeof this.value === 'object') {
            try {
              return JSON.stringify(this.value, null, 2)
            } catch (err) {
              return ''
            }
          }
          return this.value
        },
        set (val) {
          try {
            this.$emit('input', JSON.parse(val))
          } catch (err) {
            // continue regardless of error
          }
        }
      }
    }
  }
</script>