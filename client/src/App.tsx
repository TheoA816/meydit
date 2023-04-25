import Home from './home/Home'
import Job from './job/Job'
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Login from './login/Login';

function App() {

  const router = createBrowserRouter([
    {
      path: "/",
      element: <Home />,
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
