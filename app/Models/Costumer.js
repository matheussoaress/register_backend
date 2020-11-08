'use strict'

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model')
const Mail = use('Mail')

class Costumer extends Model {

  static get rules () {
    return {
      "name": 'required',
      "costumer_type_id": 'required',
      "document": 'required',
    }
  }

  static boot () {
    super.boot()

    this.addHook('afterSave', async (costumerInstance) => {
      await Mail.send('emails.welcome', user.toJSON(), (message) => {
        message
          .to("matheushsoaress@gmail.com")
          .from('sistema@register.test')
          .subject(`O cliente ${costumerInstance.name} acabou de se cadastrar`)
      })
    })
  }

  addresses () {
    return this.hasMany('App/Models/Address')
  }

  contacts () {
    return this.hasMany('App/Models/Contact')
  }

  costumerType () {
    return this.belongsTo('App/Models/CostumerType')
  }

}

module.exports = Costumer
