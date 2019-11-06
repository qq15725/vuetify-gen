<template>
	<v-app>
		<v-content>
			<v-container>
				<v-row
					align="center"
				>
					<template v-for="item in items">
						<v-col :key="item.value" cols="auto">
							<v-btn color="primary" text @click="test(item)">{{ item.label }}</v-btn>
						</v-col>
					</template>

					<v-col cols="auto">
						<v-date-time-picker
							hide-details
							placeholder="选择日期时间"
							v-model="dateTime"
						></v-date-time-picker>
					</v-col>
				</v-row>
			</v-container>
		</v-content>
	</v-app>
</template>

<script>
  import { VTextField } from 'vuetify/lib'
  import { VDateTimePicker } from 'vuetify-gen'

  export default {
    name: 'App',
    components: {
      VDateTimePicker
    },
    data: () => ({
      dateTime: '',
      items: [
        {
          label: '轻提示',
          value: 'toast',
          params: [
            '这是一条长文字提示，超过一定字数就会换行',
            1000
          ]
        },
        {
          label: '通知',
          value: 'notify',
          params: [
            '这是一条长文字提示，超过一定字数就会换行,这是一条长文字提示，超过一定字数就会换行',
            'error',
            1000
          ]
        },
        {
          label: '确定',
          value: 'confirm',
          params: [
            'sadsad'
          ]
        },
        {
          label: '表单',
          value: 'form',
          params: [
            '表单',
            [
              {
                name: 'name',
                is: VTextField,
                props: {}
              }
            ]
          ]
        },
        {
          label: '时间选择',
          value: 'dateTimePicker',
          params: []
        }
      ]
    }),
    methods: {
      async test ({ label, value, params }) {
        const _ = await this[`$${value}`](...params)
        window.console.log(label, _)
      }
    }
  }
</script>
