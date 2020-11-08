'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class AddressSchema extends Schema {
  up () {
    this.create('addresses', (table) => {
      table.increments()
      table.integer('costumer_id').unsigned().references('id').inTable('costumers')
      table.string('zip_code', 50).notNullable()
      table.integer('number').notNullable().unsigned()
      table.string('street', 255).notNullable()
      table.string('complement', 255)
      table.string('neighborhood', 100).notNullable()
      table.string('city', 100).notNullable()
      table.string('state', 100).notNullable()
      table.string('picture', 255)
      table.timestamps()
    })
  }

  down () {
    this.drop('addresses')
  }
}

module.exports = AddressSchema
