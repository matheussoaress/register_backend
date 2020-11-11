'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class ContactSchema extends Schema {
  up () {
    this.create('contacts', (table) => {
      table.increments()
      table.integer('costumer_id').unsigned().references('id').inTable('costumers')
      table.integer('contact_type_id').unsigned().references('id').inTable('contact_types')
      table.string('number', 255).notNullable().index()
      table.timestamps()
    })
  }

  down () {
    this.drop('contacts')
  }
}

module.exports = ContactSchema
