'use strict'

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model')

class ContactType extends Model {

  static scopeHasContacts (query) {
    return query.has('contacts')
  }

  contacts () {
    return this.hasMany('App/Models/Contacts')
  }
}

module.exports = ContactType
