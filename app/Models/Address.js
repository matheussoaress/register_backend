'use strict'

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model')

class Address extends Model {

  static get rules () {
    return {
      "zip_code": 'required',
      "number": 'required',
      "street": 'required',
      "neighborhood": 'required',
      "city": 'required',
      "state": 'required'
    }
  }

  costumer () {
    return this.belongsTo('App/Models/Costumer')
  }
}

module.exports = Address
