import Route from '@ioc:Adonis/Core/Route'
import User from 'App/Models/User'

Route.get('/isloggedin', async({ auth }) => {
  try {
    await auth.use('web').authenticate();
    return {
      id: auth.user?.id,
      email: auth.user?.email,
      profpic: auth.user?.profpic
    };
  } catch {
    return { err: "Not logged in" };
  }
})

Route.get('/login', async ({ ally }) => {
  return ally.use('google').redirectUrl();
})

Route.get('/logout', async ({ auth }) => {
  await auth.use('web').logout();
  return { mssg: "Logged out" };
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
  }, {
    accessToken: googleUser.token.token,
    profpic: googleUser.avatarUrl!
  })
  await auth.use('web').login(user);
  return response.redirect('http://localhost:5173');
})