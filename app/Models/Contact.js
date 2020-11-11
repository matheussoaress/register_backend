'use strict'

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model')

class Contact extends Model {

  static get rules () {
    return {
      "contacts.*.contact_type_id": 'required',
      "contacts.*.number": 'required',
    }
  }

  costumer () {
    return this.belongsTo('App/Models/Costumer')
  }

  contactType () {
    return this.belongsTo('App/Models/ContactType')
  }
}

module.exports = Contact
