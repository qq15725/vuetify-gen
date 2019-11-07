<script>
  const template = `
<div>
  <v-btn @click="$notify('这是一条长文字提示，超过一定字数就会换行')" color="primary">通知</v-btn>
  <v-btn @click="$notify('message', 'success')" color="primary">成功通知</v-btn>
  <v-btn @click="$notify('message', 'success', 1000)" color="primary">持续1s的通知</v-btn>
</div>
`

  export default {
    data () {
      return {
        template
      }
    },
    template
  }
</script>