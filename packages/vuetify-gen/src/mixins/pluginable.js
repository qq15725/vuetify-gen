import Vue from 'vue'

const removeElement = el => {
  if (typeof el.remove !== 'undefined') {
    el.remove()
  } else {
    el.parentNode.removeChild(el)
  }
}

export function factory (prop = 'isActive') {
  return Vue.extend({
    name: 'pluginable',

    watch: {
      [prop] (val) {
        if (!val) {
          this.close()
        }
      }
    },

    beforeMount () {
      this.$nextTick(() => {
        const parent = document.querySelector('[data-app]')
        parent && parent.insertBefore(this.$el, parent.firstChild)
      })
    },

    mounted () {
      this[prop] = true
    },

    methods: {
      close () {
        setTimeout(() => {
          this.$destroy()
          removeElement(this.$el)
        }, 700)
      }
    }
  })
}

/* eslint-disable-next-line no-redeclare */
const Pluginable = factory()

export default Pluginable
