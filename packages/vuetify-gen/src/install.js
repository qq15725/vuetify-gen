export function install (Vue, { vuetify, components = {}, mapping = {} }) {
  if (Vue.$_vuetify_gen_installed) return
  Vue.$_vuetify_gen_installed = true;

  (function registerComponents (components) {
    if (components) {
      for (const key in components) {
        const component = components[key]
        if (component.install) {
          Vue.use(component, {
            vuetify
          })
        } else {
          Vue.component(key, component)
        }
      }
      return true
    }
    return false
  })(components)

  Vue.$vuetifyGenMapping = Vue.prototype.$vuetifyGenMapping = mapping
}
