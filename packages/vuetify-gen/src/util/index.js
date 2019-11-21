import Vue from 'vue'

export function parseTime (time, cFormat) {
  if (arguments.length === 0) {
    return null
  }
  const format = cFormat || '{y}-{m}-{d} {h}:{i}:{s}'
  let date
  if (typeof time === 'object') {
    date = time
  } else {
    if (('' + time).length === 10) time = parseInt(time) * 1000
    date = new Date(time)
  }
  const formatObj = {
    y: date.getFullYear(),
    m: date.getMonth() + 1,
    d: date.getDate(),
    h: date.getHours(),
    i: date.getMinutes(),
    s: date.getSeconds(),
    a: date.getDay()
  }
  return format.replace(/{(y|m|d|h|i|s|a)+}/g, (result, key) => {
    let value = formatObj[key]
    // Note: getDay() returns 0 on Sunday
    if (key === 'a') {
      return ['日', '一', '二', '三', '四', '五', '六'][value]
    }
    if (result.length > 0 && value < 10) {
      value = '0' + value
    }
    return value || 0
  })
}

export function getNestedValue (obj, path, fallback) {
  const last = path.length - 1

  if (last < 0) return obj === undefined ? fallback : obj

  for (let i = 0; i < last; i++) {
    if (obj == null) {
      return fallback
    }
    obj = obj[path[i]]
  }

  if (obj == null) return fallback

  return obj[path[last]] === undefined ? fallback : obj[path[last]]
}

export function getObjectValueByPath (obj, path, fallback) {
  // credit:
  // http://stackoverflow.com/questions/6491463/accessing-nested-javascript-objects-with-string-key#comment55278413_6491621
  if (obj == null || !path || typeof path !== 'string') return fallback
  if (obj[path] !== undefined) return obj[path]
  path = path.replace(/\[(\w+)\]/g, '.$1') // convert indexes to properties
  path = path.replace(/^\./, '') // strip a leading dot
  return getNestedValue(obj, path.split('.'), fallback)
}

export function setNestedValue (obj, path, value) {
  const last = path.length - 1
  for (let i = 0; i < last; i++) {
    if (typeof obj[path[i]] !== 'object') {
      Vue.set(obj, path[i], {})
    }
    obj = obj[path[i]]
  }
  Vue.set(obj, path[last], value)
}

export function setObjectValueByPath (obj, path, value) {
  if (typeof obj !== 'object' || !path || typeof path !== 'string') return
  path = path.replace(/\[(\w+)\]/g, '.$1')
  path = path.replace(/^\./, '')
  return setNestedValue(obj, path.split('.'), value)
}

export function mergeObject (obj1, obj2) {
  for (let key in obj2) {
    obj1[key] = obj1[key] && obj1[key].toString() === '[object Object]'
      ? mergeObject(obj1[key], obj2[key])
      : obj1[key] = obj2[key]
  }
  return obj1
}

export function when (whenIf, trueValue, falseValue = null) {
  return whenIf ? trueValue : falseValue
}