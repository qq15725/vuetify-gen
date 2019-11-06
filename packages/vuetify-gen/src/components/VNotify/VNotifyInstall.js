import VNotify from './VNotify'

import pluginFactory from '../../util/pluginFactory'

export default pluginFactory('notify', VNotify, ['message', 'color', 'timeout'])