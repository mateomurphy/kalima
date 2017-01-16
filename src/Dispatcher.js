import forEach from 'lodash.foreach'
import isObject from 'lodash.isobject'
import isFunction from 'lodash.isfunction'
import isClass from 'is-class'

export default class Dispatcher {
  constructor(context) {
    this.handlers = {}
    this.actions = {}
    this.context = context
  }

  dispatch({key, payload}) {
    // todo. middleware?

    let parts = key.split('.')
    let method = parts.pop()
    let namespace = parts.join('.')

    if (isObject(this.handlers[namespace])) {
      return this.handlers[namespace][method](...payload)
    }

    return this.handlers[key].call(this, this.context, ...payload)
  }

  route(config = {}, namespace = null) {
    forEach(config, (handler, key) => {
      if (namespace) {
        key = `${namespace}.${key}`
      }

      if (isFunction(handler)) {
        if (isClass(handler)) {
          return this.routeClass(key, handler)
        }

        return this.routeFunction(key, handler)
      }

      if (isObject(handler)) {
        return this.route(handler, key)
      }
    })
  }

  routeClass(key, handler) {
    let instance = new handler(this.context)

    this.handlers[key] = instance

    Object.getOwnPropertyNames(Object.getPrototypeOf(instance)).forEach(method => {
      if (method !== 'constructor') {
        this.createHelper(`${key}.${method}`)
      }
    })
  }

  routeFunction(key, handler) {
    this.handlers[key] = handler
    this.createHelper(key)
  }

  createHelper(key) {
    let parts = key.split('.')
    let method = parts.pop()
    let root = this.actions

    parts.forEach(part => {
      if (!root[part]) {
        root[part] = {}
      }

      root = root[part]
    })

    root[method] = (...payload) => {
      return this.dispatch({key, payload})
    }
  }
}
