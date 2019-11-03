import mixins from './mixins'
import { factory as pluginableFactory } from '../mixins/pluginable'

export default (name, component, defaultProp = null, valueProp = 'isActive') => {
  const factory = (Vue, options, propsData) => {
    return new Promise((resolve, reject) => {
      const Component = mixins(pluginableFactory(valueProp)).extend(component)
      if (defaultProp && typeof propsData !== 'object') {
        propsData = { [defaultProp]: propsData }
      }
      const instance = new Component({
        ...options,
        name,
        propsData
      })
      instance.$mount()
      if (!instance.promise) {
        resolve(instance)
      } else {
        instance.promise(resolve, reject)
      }
    })
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