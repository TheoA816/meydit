import Route from '@ioc:Adonis/Core/Route'
import { schema } from '@ioc:Adonis/Core/Validator'
import Address from 'App/Models/Address';

const addrSchema = schema.create({
  id: schema.number.optional(),
  city: schema.string(),
  state: schema.string(),
  country: schema.string(),
  zipcode: schema.number(),
})

/**
 * @precondition - all place names are lowercase
 * @returns - id of address
 */
Route.post('user/addaddr', async ({ request, response }) => {
  const payload = await request.validate({ schema: addrSchema });
  let addr = await Address.query()
                      .where('city', payload.city)
                      .where('state', payload.state)
                      .where('country', payload.country)
                      .where('zipcode', payload.zipcode)
  if (addr.length !== 0) {
    response.status(200).send(addr[0].id);
    return;
  }
  const newAddr = await Address.create(payload);
  response.status(200).send(newAddr.id);
}).middleware('auth');