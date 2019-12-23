<script>
  const template = `
<div>
  <v-btn @click="$dateTimePicker().then(submit)" color="primary">时间选择弹窗</v-btn>

  <div class="my-10"></div>

  <v-date-time-picker label="日期时间选择" v-model="dateTime"></v-date-time-picker>

  <v-date-time-picker label="日期选择" v-model="date" hide-time></v-date-time-picker>

  <v-date-time-picker label="日期范围选择" v-model="dateRange" range></v-date-time-picker>
</div>
`

  export default {
    data () {
      return {
        dateTime: null,
        date: null,
        dateRange: null,
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