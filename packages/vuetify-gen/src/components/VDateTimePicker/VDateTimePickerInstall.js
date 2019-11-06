import VDateTimePicker from './VDateTimePicker'

import pluginFactory from '../../util/pluginFactory'

export default pluginFactory('dateTimePicker', VDateTimePicker, ['range', 'persistent'], { dialog: true })