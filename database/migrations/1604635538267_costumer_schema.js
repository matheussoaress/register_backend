'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class CostumerSchema extends Schema {
  up () {
    this.create('costumers', (table) => {
      table.increments()
      table.string('name', 255).notNullable().index()
      table.integer('costumer_type_id').unsigned().references('id').inTable('costumer_types')
      table.string('document', 20).notNullable()
      table.string('document_picture', 20)
      table.timestamps()
    })
  }

  down () {
    this.drop('costumers')
  }
}

module.exports = CostumerSchema
