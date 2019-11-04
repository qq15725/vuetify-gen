export function install (Vue, args = {}) {
  (function registerComponents (components) {
    if (components) {
      for (const key in components) {
        const component = components[key]
        if (component) {
          Vue.component(key, component)
          component.install && Vue.use(component, {
            vuetify: args.vuetify
          })
        }
      }
      return true
    }
    return false
  })(args.components || {})
}
