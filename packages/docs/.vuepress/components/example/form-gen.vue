<script>
  const template = `
<div>
  <v-btn @click="$form('title', items).then(submit)" color="primary">表单弹窗</v-btn>
</div>
`
  import { VTextField } from 'vuetify/lib'

  export default {
    data () {
      return {
        template,
        items: [
          {
            is: VTextField,
            name: 'username',
            props: { label: 'username label' }
          }
        ]
      }
    },
    template,
    methods: {
      submit () {
        console.log('submit')
      }
    }
  }
</script>