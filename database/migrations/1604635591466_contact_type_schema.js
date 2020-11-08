'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')
const Database = use('Database')

class ContactTypeSchema extends Schema {
  up () {
    this.create('contact_types', (table) => {
      table.increments()
      table.string('name', 255).notNullable().index()
      table.timestamps()
    })

    // create default data
    this.schedule(async (trx) => {
      const types = [{"name": "Telefone", "created_at": this.fn.now(), "updated_at": this.fn.now()}, 
                     {"name": "E-mail", "created_at": this.fn.now(), "updated_at": this.fn.now()}]
      await Database.table('contact_types').transacting(trx).insert(types)
    })

  }

  

  down () {
    this.drop('contact_types')
  }
}

module.exports = ContactTypeSchema
