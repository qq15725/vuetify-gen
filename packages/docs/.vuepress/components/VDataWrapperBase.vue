<template>
  <div>
    <v-row>
      <v-switch v-model="iterator" class="mx-2" label="表格/迭代器"></v-switch>
      <v-switch v-model="loadmore" class="mx-2" label="加载更多"></v-switch>
    </v-row>

    <v-data-wrapper
      :headers="headers"
      :items="items"
      show-select
      :loadmore="loadmore"
      :iterator="iterator"
      @load="onLoad"
    >
      <template v-slot:item.name="{ item }">
        {{ item.name }}
      </template>

      <template v-slot:default="{ items }">
        <v-row>
          <v-col
            cols="3"
            v-for="(item, index) in items" :key="index"
          >
            <v-card>
              <v-card-title>{{ item.name }}</v-card-title>
              <v-card-subtitle>{{ item.phone }}</v-card-subtitle>
            </v-card>
          </v-col>
        </v-row>
      </template>
    </v-data-wrapper>
  </div>
</template>

<script>
  export default {
    data () {
      return {
        iterator: false,
        loadmore: false,
        loading: false,
        headers: [
          {
            text: '昵称',
            value: 'name'
          },
          {
            text: '手机号',
            value: 'phone'
          }
        ],
        items: [
          {
            id: 0,
            name: 'xxx0',
            phone: '1398340036'
          },
          {
            id: 1,
            name: 'xxx1',
            phone: '1398340036'
          },
          {
            id: 2,
            name: 'xxx2',
            phone: '1398340036'
          },
          {
            id: 3,
            name: 'xxx3',
            phone: '1398340036'
          }
        ]
      }
    },
    methods: {
      async onLoad () {
        this.loading = true
        setTimeout(() => {
          const len = this.items.length
          for (let i = len; i < len + 10; i++) {
            this.items.push({
              id: i,
              name: 'xxx' + i,
              phone: '139834003' + i
            })
          }
          this.loading = false
        }, 2000)
      }
    }
  }
</script>