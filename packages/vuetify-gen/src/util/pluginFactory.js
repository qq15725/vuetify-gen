import mixins from './mixins'
import { factory as pluginable } from '../mixins/pluginable'

export default (name, component, paramsProps = [], defaultProps = {}, valueProp = 'isActive') => {

  const factory = (Vue, options, ...params) => {
    return new Promise((resolve, reject) => {
      const Component = mixins(pluginable(valueProp)).extend(component)
      let propsData = params[0] || {}
      if (typeof propsData !== 'object') {
        propsData = {}
        paramsProps.forEach((prop, index) => {
          propsData[prop] = params[index]
        })
      }
      const instance = new Component({
        ...options,
        name,
        propsData: {
          ...defaultProps,
          ...propsData
        }
      })
      instance.$mount()
      if (instance.injectPromise) {
        instance.injectPromise(resolve, reject)
      } else {
        resolve(instance)
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