'use strict'

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model')

class Address extends Model {

  static get rules () {
    return {
      "addresses.*.zip_code": 'required',
      "addresses.*.number": 'required',
      "addresses.*.street": 'required',
      "addresses.*.neighborhood": 'required',
      "addresses.*.city": 'required',
      "addresses.*.state": 'required'
    }
  }

  costumer () {
    return this.belongsTo('App/Models/Costumer')
  }
}

module.exports = Address
