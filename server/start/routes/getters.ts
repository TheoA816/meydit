import Route from '@ioc:Adonis/Core/Route'
import Address from 'App/Models/Address';
import User from 'App/Models/User';
import Job from 'App/Models/Job';
import Quote from 'App/Models/Quote';
import { format } from 'date-fns'

Route.get('/getaddr', async ({ request }) => {
  let addr = await Address.findBy('id', request.input('id'));
  return addr;
});

// get enough for one page
Route.get('/getjobs', async () => {
  const jobsOnPage = await Job.query();
  return jobsOnPage;
})

Route.get('/getjob', async ({ request }) => {
  const id = parseInt(request.input('id'));
  const job = await Job.findBy('id', id);
  const addr = await Address.findBy('id', job?.addr)
  return { ...job?.$attributes, addr: addr?.$attributes };
})

Route.get('/getuser', async ({ request }) => {
  const id = parseInt(request.input('id'));
  const user = await User.findBy('id', id);
  return user;
})

Route.get('/getquotes', async ({ request }) => {
  const job = parseInt(request.input('job'));
  const quotesOnJob = await Quote.query()
                              .where('job', job);
  // format date
  quotesOnJob.map((quote) => {
    const date = new Date(quote.finishby);
    quote.finishby = format(date, 'd MMM y');
  })
  return quotesOnJob;
})