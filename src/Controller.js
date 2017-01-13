import _ from 'lodash'

export default class Controller {
  constructor(context) {
    _.each(context, (value, key) => {
      this[key] = value
    })
  }
}
