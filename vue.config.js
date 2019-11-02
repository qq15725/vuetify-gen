module.exports = {
  transpileDependencies: ['vuetify'],
  chainWebpack: config => {
    config.externals(['vue', 'vuetify', 'vuetify/lib'])
  }
}