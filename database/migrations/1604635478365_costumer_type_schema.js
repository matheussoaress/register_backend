'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')
const Database = use('Database')

class CostumerTypeSchema extends Schema {
  up () {
    this.create('costumer_types', (table) => {
      table.increments()
      table.string('name', 100).notNullable()
      table.timestamps()
    })

    // create default data
    this.schedule(async (trx) => {
      const types = [{"name": "CPF", "created_at": this.fn.now(), "updated_at": this.fn.now()}, 
                     {"name": "CNPJ", "created_at": this.fn.now(), "updated_at": this.fn.now()}]
      await Database.table('costumer_types').transacting(trx).insert(types)
    })
  }

  down () {
    this.drop('costumer_types')
  }
}

module.exports = CostumerTypeSchema
