'use strict'

/** @typedef {import('@adonisjs/framework/src/Request')} Request */
/** @typedef {import('@adonisjs/framework/src/Response')} Response */
/** @typedef {import('@adonisjs/framework/src/View')} View */

const ADDRESSES_LIMIT = 3
const { validate } = use('Validator')
const Costumer = use('App/Models/Costumer')
const Address = use('App/Models/Address')

/**
 * Resourceful controller for interacting with addresses
 */
class AddressController {
  /**
   * Show a list of all addresses.
   * GET costumers/costumer_id/addresses
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async index ({ params, request, response, view }) {
    response.header('Content-type', 'application/json');
    let costumer = await Costumer.find(params.costumers_id)
    return await costumer.addresses().fetch()
  }

  /**
   * Create/save a new address.
   * POST costumers/costumer_id/addresses
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async store ({ params, request, response }) {
    const addressData = request.only(["zip_code", "street", "number", "complement", 
                                      "neighborhood", "city", "state", "picture"]);

    const addressValidation = await validate(addressData, Address.rules)

    let costumer = await Costumer.find(params.costumers_id)
    let total_addresses = await costumer.addresses().count({'count': 'id'}).first()
    total_addresses = total_addresses['count']

    if ( total_addresses > ADDRESSES_LIMIT ){
      return response.status(400).json({"message":"limit addresses reached to costumer",
                                        "limit": ADDRESSES_LIMIT, "size": total_addresses}) 
    }else if (addressValidation.fails()) {
      return response.status(400).json(addressValidation.messages()) 
    }
    
    let address = await costumer.addresses().create(addressData)

    response.json(address)
  }

  /**
   * Display a single address.
   * GET costumers/costumer_id/addresses/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async show ({ params, request, response, view }) {
    response.header('Content-type', 'application/json');
    let costumer = await Costumer.find(params.costumers_id)
    return await costumer.addresses().where('id', params.id).fetch()
  }

  /**
   * Update address details.
   * PUT or PATCH costumers/costumer_id/addresses/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async update ({ params, request, response }) {
    const addressData = request.only(["zip_code", "street_name", "number", "complement", 
                                      "neighborhood", "city", "state", "picture"])
    
    let costumer = await Costumer.find(params.costumers_id)
    
    let address = await costumer.addresses()
                                .where('id', params.id)
                                .update(addressData)

    response.json(address)
  }

  /**
   * Delete a address with id.
   * DELETE costumers/costumer_id/addresses/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async destroy ({ params, request, response }) {
    let costumer = await Costumer.find(params.costumers_id)
    
    await costumer.addresses()
                  .where('id', params.id)
                  .delete()
  }
}

module.exports = AddressController
