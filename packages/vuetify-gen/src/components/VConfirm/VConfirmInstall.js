import VConfirm from './VConfirm'

import pluginFactory from '../../util/pluginFactory'

export const { install, factory } = pluginFactory('confirm', VConfirm, ['title', 'persistent'])