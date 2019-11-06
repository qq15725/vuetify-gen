import VNotify from './VNotify'

import pluginFactory from '../../util/pluginFactory'

export const { install, factory } = pluginFactory('notify', VNotify, ['message', 'color', 'timeout'])