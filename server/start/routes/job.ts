import Route from '@ioc:Adonis/Core/Route'
import { schema } from '@ioc:Adonis/Core/Validator'
import Address from 'App/Models/Address';
import Job from 'App/Models/Job';

const jobSchema = schema.create({
  id: schema.number.optional(),
  clothing: schema.string(),
  material: schema.string(),
  budget: schema.number.optional(),
  count: schema.number.optional(),
  images: schema.array.optional().members(schema.string()),
  descr: schema.string.optional(),
  contact: schema.number(),
  addr: schema.object().members({
    id: schema.number.optional(),
    city: schema.string(),
    state: schema.string(),
    country: schema.string(),
    zipcode: schema.number(),
  }),
})

/**
 * 
 * checks payload and make sure it is valid
 */
const checkAddr = async (payload) => {
  // check addr exist
  const addr = payload.addr;
  const matchingAddr = await Address.query()
                      .where('city', addr.city)
                      .where('state', addr.state)
                      .where('country', addr.country)
                      .where('zipcode', addr.zipcode)
  if (matchingAddr.length !== 0) {
    return { addr: matchingAddr[0].id };
  }

  // add new addr
  const newAddr = await Address.create(addr);
  return { addr: newAddr.id };
}

Route.post('/user/addjob', async ({ auth, request, response }) => {
  const payload = await request.validate({ schema: jobSchema });
  // payload check
  const res = await checkAddr(payload);
  // create job
  await Job.create({ ...payload, addr: res.addr, contact: auth.user?.id });
  return response.send({ mssg: "Success!" });
}).middleware('auth');

Route.post('/user/editjob', async ({ auth, request, response }) => {
  const payload = await request.validate({ schema: jobSchema });
  // check job exists
  if (await Job.findBy('id', payload.id) === null) {
    response.status(400).send("Job does not exist");
    return;
  }
  // job check
  const res = await checkAddr(payload);
  // update job
  await Job.updateOrCreate({ id: payload.id }, { ...payload, addr: res.addr, contact: auth.user?.id });
  return response.send({ mssg: "Success!" });
}).middleware('auth');
