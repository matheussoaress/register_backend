'use strict'

/** @typedef {import('@adonisjs/framework/src/Request')} Request */
/** @typedef {import('@adonisjs/framework/src/Response')} Response */
/** @typedef {import('@adonisjs/framework/src/View')} View */

const { validate } = use('Validator')
const Costumer = use('App/Models/Costumer')
const Contact = use('App/Models/Contact')

/**
 * Resourceful controller for interacting with contacts
 */
class ContactController {
  /**
   * Show a list of all contacts.
   * GET costumers/costumer_id/contacts
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async index ({ params, request, response, view }) {
    response.header('Content-type', 'application/json');
    let costumer = await Costumer.find(params.costumers_id)
    return await costumer.contacts().fetch()
  }

  
  /**
   * Create/save a new contact.
   * POST costumers/costumer_id/contacts
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async store ({ params, request, response }) {
    const contactData = request.only(["contact_type_id", "value"])

    const contactValidation = await validate(contactData, Contact.rules)

    if (contactValidation.fails()) {
      return response.status(400).json(contactValidation.messages()) 
    }
    
    let costumer = await Costumer.find(params.costumers_id)
    let contact = await costumer.contacts().create(contactData)

    response.json(contact)
  }

  /**
   * Display a single contact.
   * GET costumers/costumer_id/contacts/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async show ({ params, request, response, view }) {
    response.header('Content-type', 'application/json');
    let costumer = await Costumer.find(params.costumers_id)
    return await costumer.contacts().where('id', params.id).fetch()
  }

  /**
   * Update contact details.
   * PUT or PATCH costumers/costumer_id/contacts/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async update ({ params, request, response }) {
    const contactData = request.only(["contact_type_id", "value"])
    
    let costumer = await Costumer.find(params.costumers_id)
    
    let contact = await costumer.contacts()
                                .where('id', params.id)
                                .update(contactData)

    response.json(contact)
  }

  /**
   * Delete a contact with id.
   * DELETE costumers/costumer_id/contacts/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async destroy ({ params, request, response }) {
    let costumer = await Costumer.find(params.costumers_id)
    
    await costumer.contacts()
                  .where('id', params.id)
                  .delete()
  }
}

module.exports = ContactController
