import forEach from 'lodash.foreach'

export default class Controller {
  constructor(context) {
    forEach(context, (value, key) => {
      this[key] = value
    })
  }
}
