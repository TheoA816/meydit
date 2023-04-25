import Route from '@ioc:Adonis/Core/Route'
import User from 'App/Models/User'
// import { schema } from '@ioc:Adonis/Core/Validator'

// const userSchema = schema.create({
//   email: schema.string(),
//   password: schema.string(),
//   phone: schema.string.optional(),
//   addr: schema.number.optional(),
//   rememberMeToken: schema.string.optional()
// })

Route.get('/google/redirect', async ({ ally }) => {
  return ally.use('google').redirect();
})

Route.get('/google-callback', async ({ ally, auth, response }) => {
  const google = ally.use('google');
  
  // errors
  if (google.accessDenied()) {
    response.status(400).send('Access was denied');
    return;
  }
  if (google.stateMisMatch()) {
    response.status(400).send('Request expired. Retry again');
    return;
  }
  if (google.hasError()) {
    response.status(400).send(google.getError())
    return;
  }

  // register / login
  const googleUser = await google.user();
  const user = await User.firstOrCreate({
    email: googleUser.email!,
  })
  console.log(user);
  await auth.use('web').login(user);
})