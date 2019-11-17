export function install (Vue, args = {}) {
  if (Vue.$_vuetify_gen_installed) return
  Vue.$_vuetify_gen_installed = true;

  (function registerComponents (components) {
    if (components) {
      for (const key in components) {
        const component = components[key]
        if (component.install) {
          Vue.use(component, {
            vuetify: args.vuetify
          })
        } else {
          Vue.component(key, component)
        }
      }
      return true
    }
    return false
  })(args.components || {})

  const form = args.form || {}

  Vue.$vuetifyGen = Vue.prototype.$vuetifyGen = {
    form
  }
}
