module.exports = {
  publicPath: process.env.NODE_ENV === 'production' ? '/vuetify-gen/packages/docs/dist' : '/',
  transpileDependencies: [
    'vuetify',
    'vuetify-gen'
  ],
  chainWebpack: config => {
    config.resolve.symlinks(false)
  }
}