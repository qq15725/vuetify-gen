import { isDef, mergeObject } from '../../util'
import Vue from 'vue'

export function mappingMerge ([tag, data, children]) {
  let mapping = Vue.$vuetifyGenMapping[data.is || tag]

  if (mapping) {
    mapping = typeof mapping === 'function' ? mapping(data) : mapping
    const [mapTag, { model, ...mapData }, mapChildren] = createVNodeConstruct(mapping, false)
    if (model) {
      const { prop, event } = model
      if (prop) {
        if (data.props) {
          data = mergeObject(data, {
            props: {
              [prop]: data.props.value
            },
            attrs: {
              [prop]: data.props.value
            }
          })
          delete data.props.value
        }
      }
      if (event) {
        if (data.on) {
          data = mergeObject(data, {
            on: {
              [event]: data.on.input
            }
          })
          delete data.on.input
        }
      }
    }

    tag = mapTag || tag
    data = mergeObject(data || {}, mapData)
    children = mapChildren || children
  }

  return [
    tag,
    data,
    children
  ]
}

export function createVNodeConstruct (vvnode, merge = true) {
  let { tag, children, ...data } = vvnode || {}

  // data
  if (isDef(data.__ob__)) {
    data = { ...data }
  }

  return merge ? mappingMerge([tag, data, children]) : [tag, data, children]
}

export default createVNodeConstruct