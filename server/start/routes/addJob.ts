import Route from '@ioc:Adonis/Core/Route'
import { schema } from '@ioc:Adonis/Core/Validator'
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
  addr: schema.number(),
})

Route.post('/user/addjob', async ({ request, response }) => {
  const payload = await request.validate({ schema: jobSchema });
  const contact = await User.findBy('id', payload.contact);
  if (contact === null) {
    response.status(400).send("Error - Job has no contact person, creator undefined");
    return;
  }
  await Job.create(payload);
}).middleware('auth');

Route.post('/user/editjob', async ({ request, response }) => {
  const payload = await request.validate({ schema: jobSchema });
  if (await Job.findBy('id', request.id) === null) response.status(400).send("Job does not exist");
  await Job.updateOrCreate({ id: payload.id }, payload);
}).middleware('auth');