import Home from './home/Home'
import Job from './job/Job'
import { createBrowserRouter, RouterProvider } from "react-router-dom";

function App() {

  const router = createBrowserRouter([
    {
      path: "/",
      element: <Home />,
    },
    {
      path: "job",
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
