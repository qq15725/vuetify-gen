import VConfirm from './VConfirm'
import pluginFactory from '../../util/pluginFactory'

VConfirm.install = pluginFactory('confirm', VConfirm, 'title').install

export { VConfirm }

export default VConfirm
