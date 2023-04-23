import Route from '@ioc:Adonis/Core/Route'
import User from 'App/Models/User'
import { schema } from '@ioc:Adonis/Core/Validator'

const userSchema = schema.create({
  email: schema.string(),
  password: schema.string(),
  phone: schema.string.optional(),
  addr: schema.number.optional(),
  rememberMeToken: schema.string.optional()
})

Route.post('/register', async ({ request, response }) => {
  const payload = await request.validate({ schema: userSchema });
  if (await User.findBy('email', payload.email) !== null) {
    response.status(400).send("email is already registered with a Meydit account");
    return;
  }
  await User.create(payload);
})

Route.post('/login', async ({ auth, request, response }) => {
  try {
    const payload = await request.validate({ schema: userSchema });
    await auth.use('web').attempt(payload.email, payload.password);
  } catch {
    return response.badRequest('Invalid credentials')
  }
})