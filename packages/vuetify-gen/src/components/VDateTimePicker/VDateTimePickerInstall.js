import VDateTimePicker from './VDateTimePicker'

import pluginFactory from '../../util/pluginFactory'

export const { install, factory } = pluginFactory('dateTimePicker', VDateTimePicker, ['range', 'persistent'], { dialog: true })