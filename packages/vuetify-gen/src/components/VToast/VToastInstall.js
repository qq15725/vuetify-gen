import VToast from './VToast';

import pluginFactory from '../../util/pluginFactory'

export const { install, factory } = pluginFactory('toast', VToast, ['message', 'timeout', 'persistent'])