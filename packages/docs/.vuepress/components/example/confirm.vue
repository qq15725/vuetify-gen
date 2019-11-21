<script>
  const template = `
<div>
  <v-btn @click="$confirm('这是一条长文字提示，超过一定字数就会换行').then(handler)" color="primary">确定框</v-btn>
  <v-btn @click="$confirm('这是一条长文字提示，超过一定字数就会换行', true).then(handler)" color="primary">不可关闭的确定框</v-btn>
</div>
`

  export default {
    data () {
      return {
        template
      }
    },
    template,
    methods: {
      handler (val) {
        console.log(val)
      }
    }
  }
</script>