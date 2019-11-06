import VFormGenDialog from './VFormGenDialog'

import pluginFactory from '../../util/pluginFactory'

export const { install, factory } = pluginFactory('form', VFormGenDialog, ['title', 'items', 'persistent'])