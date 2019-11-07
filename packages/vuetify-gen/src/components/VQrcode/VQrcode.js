import QRCode from 'qrcodejs2'

export default {
  name: 'v-qrcode',
  props: {
    tag: {
      type: String,
      default: 'div'
    },
    text: String,
    width: Number,
    height: Number,
    size: {
      type: Number,
      default: 200
    },
    colorDark: {
      type: String,
      default: '#000000'
    },
    colorLight: {
      type: String,
      default: '#ffffff'
    }
  },
  data () {
    return {
      instance: null
    }
  },
  mounted () {
    this.genQrcode()
  },
  watch: {
    text () {
      this.genQrcode()
    }
  },
  methods: {
    async genQrcode () {
      if (this.text) {
        if (this.instance) {
          this.instance.makeCode(this.text)
          await this.$nextTick()
          this.$emit('loaded')
        } else {
          this.instance = new QRCode(this.$el, {
            text: this.text,
            width: this.width || this.size,
            height: this.height || this.size,
            colorDark: this.colorDark,
            colorLight: this.colorLight,
            correctLevel: QRCode.CorrectLevel.H
          })
          await this.$nextTick()
          this.$emit('loaded')
        }
      }
    }
  },
  render (gen) {
    return gen(this.tag, { class: 'd-inline-block' }, this.$slots.default)
  }
}