import Home from './home/Home'
import Job from './job/Job'
import { createBrowserRouter, Navigate, RouterProvider } from "react-router-dom";
import Login from './login/Login';
import axios from './config/axios';

function App() {

  const router = createBrowserRouter([
    {
      path: "/",
      element: <Navigate to={'/0'} replace />,
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
      path: "/job",
      element: <Job />,
    },
  ])

  return (
    <>
      <RouterProvider router={router}/>
    </>
  )
}

export default App
