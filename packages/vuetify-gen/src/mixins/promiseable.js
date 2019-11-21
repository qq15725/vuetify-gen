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
        const fn = this.resolveFn
        if (fn) {
          this.resolveFn = null
          this.rejectFn = null
          return fn(...args)
        }
        return null
      },
      reject (...args) {
        const fn = this.rejectFn
        if (fn) {
          this.resolveFn = null
          this.rejectFn = null
          return fn(...args)
        }
        return null
      }
    }
  })
}

export default factory()
