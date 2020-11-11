'use strict'

/** @typedef {import('@adonisjs/framework/src/Request')} Request */
/** @typedef {import('@adonisjs/framework/src/Response')} Response */
/** @typedef {import('@adonisjs/framework/src/View')} View */

const { validate } = use('Validator')
const Costumer = use('App/Models/Costumer')
const Address = use('App/Models/Address')
const Contact = use('App/Models/Contact')

const ADDRESSES_LIMIT = 3

/**
 * Resourceful controller for interacting with costumers
 */
class CostumerController {
  /**
   * Show a list of all costumers.
   * GET costumers
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async index ({ request, response, view }) {
    response.header('Content-type', 'application/json')
    let costumers = await Costumer.query()
                                  .with('contacts')
                                  .fetch()
    response.json(costumers)

  }

  /**
   * Create/save a new costumer.
   * POST costumers
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @TODO Validação do campos e limitar a 3 endereços.
   */
  async store ({ request, response }) {
    const costumerData = request.only(['name', 'costumer_type_id', 'email', 'document']);
    const addressData = request.only(["addresses"]).addresses;
    const contactData = request.only(["contacts"]).contacts;
    let costumer = await Costumer.create(costumerData);

    const costumerValidation = await validate(costumerData, Costumer.rules)
    const addressValidation = await validate(addressData, Address.rules)
    const contactValidation = await validate(contactData, Contact.rules)

    if (costumerValidation.fails()) {
      return response.status(400).json(costumerValidation.messages()) 
    }else if (addressValidation.fails()) {
      return response.status(400).json(addressValidation.messages()) 
    }else if (addressData.length > ADDRESSES_LIMIT ){
      return response.status(400).json({"message":"limit addresses reached to costumer",
                                        "limit": ADDRESSES_LIMIT, "size": addressData.length}) 
    }else if (contactValidation.fails()) {
      return response.status(400).json(contactValidation.messages()) 
    }
    
    await costumer.addresses()
                  .createMany(addressData);
    
    await costumer.contacts()
                  .createMany(contactData);
    await costumer.loadMany(['contacts', 'addresses']);

    response.json(costumer)
  }

  /**
   * Display a single costumer.
   * GET costumers/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async show ({ params, request, response, view }) {
    response.safeHeader('Content-type', 'application/json')
    let costumer = await Costumer.find(params.id)
    await costumer.loadMany(['contacts', 'addresses'])
    response.json(costumer)
  }

  /**
   * Update costumer details.
   * PUT or PATCH costumers/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async update ({ params, request, response }) {
    const costumerData = request.only(['name', 'costumer_type_id', 'document']);
    let costumer = await Costumer.find(params.id)
    await costumer.update(costumerData)
    response.json(costumer)
  }

  /**
   * Delete a costumer with id.
   * DELETE costumers/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async destroy ({ params, request, response }) {
    let costumer = await Costumer.find(params.id)
    if (costumer){
      await costumer.addresses().delete()
      await costumer.contacts().delete()
      await costumer.delete()
    
    }
  }
}

module.exports = CostumerController
