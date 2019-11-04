module.exports = {
  transpileDependencies: [
    'vuetify',
    'vuetify-gen'
  ],
  chainWebpack: config => {
    config.resolve.symlinks(false)
  }
}