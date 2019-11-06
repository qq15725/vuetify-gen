import Vue from 'vue'

export function factory () {
  return Vue.extend({
    name: 'promiseable',

    data () {
      return {
        resolveFn: null,
        rejectFn: null
      }
    },

    methods: {
      injectPromise (resolve, reject) {
        this.resolveFn = resolve
        this.rejectFn = reject
      },
      resolve (...args) {
        return this.resolveFn && this.resolveFn(...args)
      },
      reject (...args) {
        return this.rejectFn && this.rejectFn(...args)
      }
    }
  })
}

export default factory()
