import VFormGen from './VFormGen'
import pluginFactory from '../../util/pluginFactory'
import VFormGenDialog from './VFormGenDialog'

VFormGen.install = pluginFactory('form', VFormGenDialog).install

export { VFormGen }

export default VFormGen
