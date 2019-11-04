import VToast from './VToast'
import pluginFactory from '../../util/pluginFactory'

VToast.install = pluginFactory('toast', VToast, 'message').install

export { VToast }

export default VToast