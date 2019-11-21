module.exports = {
  base: '/vuetify-gen/packages/docs/dist/',
  title: 'vuetify-gen',
  description: 'vuetify 扩展组件',
  dest: './dist',
  port: 2233,
  themeConfig: {
    nav: [
      {
        text: '快速开始',
        link: '/lib/quickstart.md'
      },
      {
        text: 'github',
        link: 'https://github.com/qq15725/vuetify-gen'
      }
    ],
    sidebar: {
      '/lib/': [
        ['quickstart', '快速开始'],
        {
          title: '扩展组件',
          children: [
            ['toast', 'VToast（轻提示）'],
            ['notify', 'VNotify（通知）'],
            ['confirm', 'VConfirm（确定）'],
            ['date-time-picker', 'VDateTimePicker（日期选择）'],
            ['qrcode', 'VQrcode（二维码）'],
            ['loadmore', 'VLoadmore（加载更多）'],
            ['data-wrapper', 'VDataWrapper（数据包装器）'],
            ['gen', 'VGen（组件生成）'],
            ['form-gen', 'VFormGen（表单生成）']
          ]
        }
      ]
    }
  },
  chainWebpack(config) {
    config.resolve.alias.set('vue', 'vue/dist/vue.common.js')
  }
}