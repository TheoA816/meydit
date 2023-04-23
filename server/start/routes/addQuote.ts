import Route from '@ioc:Adonis/Core/Route'
import { schema } from '@ioc:Adonis/Core/Validator'
import Quote from 'App/Models/Quote';


const quoteSchema = schema.create({
  id: schema.number.optional(),
  job: schema.number(),
  contact: schema.number(),
  cost: schema.number.optional(),
  timeframe: schema.string.optional(),
})

Route.post('/user/addquote', async ({ request, response }) => {
  const payload = await request.validate({ schema: quoteSchema });
  const exists = await Quote.query().where('job', payload.job).where('contact', payload.contact);
  if (exists.length === 0) response.status(400).send("You already have a quote for this job");
  await Quote.create(payload);
})

Route.post('/user/editquote', async ({ request, response }) => {
  const payload = await request.validate({ schema: quoteSchema });
  if (await Quote.findBy('id', payload.id) === null) response.status(400).send("Quote does not exist");
  await Quote.updateOrCreate({ id: payload.id }, payload);
})