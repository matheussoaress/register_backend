'use strict'

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model')

class CostumerType extends Model {

  static scopeHasCostumers (query) {
    return query.has('costumers')
  }

  costumers () {
    return this.hasMany('App/Models/Costumer')
  }

}

module.exports = CostumerType
