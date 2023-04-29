import Mail from '@ioc:Adonis/Addons/Mail';
import Route from '@ioc:Adonis/Core/Route'
import { schema } from '@ioc:Adonis/Core/Validator'
import Job from 'App/Models/Job';
import Quote from 'App/Models/Quote';
import User from 'App/Models/User';
import Env from '@ioc:Adonis/Core/Env'


const quoteSchema = schema.create({
  id: schema.number.optional(),
  job: schema.number(),
  contact: schema.number(),
  cost: schema.number.optional(),
  finishby: schema.string.optional(),
})

Route.post('/user/addquote', async ({ request, response }) => {
  // create new quote
  const payload = await request.validate({ schema: quoteSchema });
  const exists = await Quote.query().where('job', payload.job).where('contact', payload.contact);
  if (exists.length !== 0) {
    response.status(400).send("You already have a quote for this job");
    return;
  }
  await Quote.create(payload);
  // notify job owner via email
  const maker = await User.findBy('id', payload.contact);
  const contact = await User.findBy('id', (await Job.findBy('id', payload.job))?.contact);
  await Mail.send((message) => {
    message
      .to(contact?.email!)
      .subject(`${maker?.name} just sent you a quote!`)
      .htmlView('emails/notif', { maker: maker?.name, url: `${Env.get('FRONTEND_HOST')}/job/${payload.job}` })
  })
})

Route.post('/user/editquote', async ({ request, response }) => {
  const payload = await request.validate({ schema: quoteSchema });
  if (await Quote.findBy('id', payload.id) === null) {
    response.status(400).send("Quote does not exist");
    return;
  }
  await Quote.updateOrCreate({ id: payload.id }, payload);
}).middleware('auth');