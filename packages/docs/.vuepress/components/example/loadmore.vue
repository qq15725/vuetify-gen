<script>
  const template = `
<v-card width="300" class="ma-auto">
  <v-card-title>当前第{{ page }}页</v-card-title>
  <v-card-text style="height: 500px;" class="overflow-y-auto">
    <v-loadmore v-model="loading" :finished="finished" @load="onLoad">
      <v-list>
        <v-list-item v-for="(item, index) in items" :key="index">
          <v-list-item-avatar color="grey"></v-list-item-avatar>
          <v-list-item-content>content</v-list-item-content>
        </v-list-item>
      </v-list>
    </v-loadmore>
  </v-card-text>
</v-card>
`

  export default {
    data () {
      return {
        template,
        items: [],
        finished: false,
        loading: false,
        page: 0
      }
    },
    template,
    methods: {
      onLoad () {
        this.loading = true
        setTimeout(() => {
          this.items.push(...[...Array.from({ length: 10 }).keys()])
          if (this.page > 2) {
            this.finished = true
          } else {
            this.page += 1
          }
          this.loading = false
        }, 1000)
      }
    }
  }
</script>