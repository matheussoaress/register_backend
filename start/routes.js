'use strict'

/*
|--------------------------------------------------------------------------
| Routes
|--------------------------------------------------------------------------
|
| Http routes are entry points to your web application. You can create
| routes for different URLs and bind Controller actions to them.
|
| A complete guide on routing is available here.
| http://adonisjs.com/docs/4.1/routing
|
*/

/** @type {typeof import('@adonisjs/framework/src/Route/Manager')} */
const Route = use('Route')

Route.get('/', () => {
  return { greeting: 'Hello world in JSON' }
})




/**
 * CREATING ROUTES TO V1 PROJECT
 * 
 * The user'll be called as COSTUMER, once the USER model will be required to auth process.
 */

Route.group(function() {

  Route.get('/', () => {
    return "Obrigado por validar o uso da API!"
  })

  Route.resource("costumers", "CostumerController")

  Route.resource('costumers/:costumers_id/contacts', 'ContactController')

  Route.resource('costumers/:costumers_id/addresses', 'AddressController')

}).prefix('api/v1');