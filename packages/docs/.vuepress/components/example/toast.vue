<script>
  const template = `
<div>
  <v-btn @click="$toast('这是一条长文字提示，超过一定字数就会换行')" color="primary">提示</v-btn>
  <v-btn @click="$toast('message', 1000)" color="primary">持续1s的提示</v-btn>
  <v-btn @click="$toast('message', 3000, true)" color="primary">不可关闭的提示</v-btn>
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