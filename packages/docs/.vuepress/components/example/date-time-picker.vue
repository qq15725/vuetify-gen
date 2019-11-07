<script>
  const template = `
<div>
  <v-btn @click="$dateTimePicker().then(submit)" color="primary">时间选择弹窗</v-btn>

  <div class="my-10"></div>

  <v-date-time-picker label="时间选择" v-model="date"></v-date-time-picker>
</div>
`

  export default {
    data () {
      return {
        date: null,
        template
      }
    },
    template,
    methods: {
      submit () {
        window.console.log('submit')
      }
    }
  }
</script>