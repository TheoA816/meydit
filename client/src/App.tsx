import Home from './components/home/Home'
import Job from './components/job/Job'
import { createBrowserRouter, Navigate, RouterProvider } from "react-router-dom";
import Login from './components/login/Login';
import axios from './config/axios';

function App() {

  const router = createBrowserRouter([
    {
      path: "/",
      element: <Navigate to={'/0'} replace />
    },
    {
      path: "/:page",
      element: <Home />,
      loader: async ({ params }) => {
        const jobs = await axios.get('/getjobs', { params: { page: params.page }});
        for (const job of jobs.data) {
          job.addr = (await axios.get('/getaddr', { params: { id: job.addr }})).data
        }
        return jobs.data;
      }
    },
    {
      path: "/login",
      element: <Login />,
    },
    {
      path: "/job/:id",
      element: <Job />,
      loader: async ({ params }) => {
        const job = await axios.get('/getjob', { params: { id: params.id }});
        console.log(job)
        return job.data;
      }
    },
  ])

  return (
    <>
      <RouterProvider router={router}/>
    </>
  )
}

export default App
