import { createBrowserRouter } from "react-router-dom";
import PrivateRouter from "./PrivateRouter";
import Main from "../Layout/Main";
import Home from "../components/Home";
import Login from "../components/Login";
import Register from "../components/Register";
import Profile from "../components/Profile";
import Orders from "../components/Orders";


const router = createBrowserRouter([
    {
      path: "/",
      element: <Main></Main>,
      children: [
        {
          path: '/',
          element: <Home></Home>
        },
        {
          path: '/profile',
          element: <PrivateRouter><Profile></Profile></PrivateRouter>
        },
        {
          path: '/login',
          element: <Login></Login>
        },
        {
          path: '/register',
          element: <Register></Register>
        },
        {
          path: '/order',
          element: <PrivateRouter><Orders></Orders></PrivateRouter>
        }
      ]
    },
  ]);

  export default router ;