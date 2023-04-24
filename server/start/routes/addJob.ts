import Route from '@ioc:Adonis/Core/Route'
import { schema } from '@ioc:Adonis/Core/Validator'
import Address from 'App/Models/Address';
import User from 'App/Models/Contact';
import Job from 'App/Models/Job';

const jobSchema = schema.create({
  id: schema.number.optional(),
  clothing: schema.string(),
  material: schema.string(),
  budget: schema.number.optional(),
  count: schema.number.optional(),
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
const payloadCheck = async (payload, auth) => {
  // no contact
  const contact = await User.findBy('id', payload.contact);
  if (contact === null || contact.id !== auth.user?.id) {
    return { err: "Error - Job has no contact person, creator undefined" };
  }
  // add addr if not exist
  let addr = await Address.findBy('id', payload.addr.id || -1);
  if (addr === null) {
    const { default: got } = await import('got');
    await got.post('http://127.0.0.1:3333/user/addaddr', { json: payload.addr });
    addr = await Address.findBy('id', payload.addr.id);
  }
  return { addr: addr?.id };
}

Route.post('/user/addjob', async ({ auth, request, response }) => {
  const payload = await request.validate({ schema: jobSchema });

  // payload check
  const res = await payloadCheck(payload, auth);
  if (res.err) {
    response.status(400).send(res.err);
    return;
  }

  // create job
  await Job.create({ ...payload, addr: res.addr });
}).middleware('auth');

Route.post('/user/editjob', async ({ auth, request, response }) => {
  const payload = await request.validate({ schema: jobSchema });

  // check job exists
  if (await Job.findBy('id', request.id) === null) response.status(400).send("Job does not exist");

  // job check
  const res = await payloadCheck(payload, auth);
  if (res.err) {
    response.status(400).send(res.err);
    return;
  }

  // update job
  await Job.updateOrCreate({ id: payload.id }, { ...payload, addr: res.addr });
}).middleware('auth');
