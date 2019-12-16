export function isString(value) {
  return typeof value === 'string' || value instanceof String
}

export function isArray(value) {
  return Array.isArray(value)
}

export function isNumber(value) {
  return typeof value === 'number'
}

export function inNaN(value) {
  return Number.isNaN(value)
}

export function isBoolean(value) {
  return typeof value === 'boolean'
}

export function isNull(value) {
  return value === null
}

export function isUndefined(value) {
  return typeof value === 'undefined'
}

export function isDefined(value) {
  return !isNull(value) && !isUndefined(value)
}
