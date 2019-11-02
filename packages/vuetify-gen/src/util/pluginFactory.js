import mixins from './mixins'
import { factory as pluginableFactory } from '../mixins/pluginable'

export default (name, component, prop = 'isActive') => {
  const factory = (Vue, options, propsData) => {
    const extendComponent = mixins(pluginableFactory(prop)).extend(component)
    return new extendComponent({
      ...options,
      name,
      propsData
    }).$mount()
  }

  const install = (Vue, options = {}) => {
    const prototypeName = options.name || name
    Vue.prototype[`$${prototypeName}`] = factory.bind(this, Vue, options)
    Vue[`$${prototypeName}`] = factory.bind(this, Vue, options)
  }
  return {
    install,
    factory
  }
}