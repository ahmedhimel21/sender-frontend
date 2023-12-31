import { createBrowserRouter } from "react-router-dom";
import Main from "../Layouts/Main";
import Home from "../Pages/Home/Home";
import Login from "../Pages/Login/Login";
import Register from "../Pages/Register/Register";
import ErrorPage from "../Pages/ErrorPage/ErrorPage";
import PrivateRoutes from "./PrivateRoutes";
import Dashboard from "../Layouts/Dashboard";
import WelcomePage from "../Components/Dahboard/WelcomePage";
import ManageUsers from "../Components/Dahboard/ManageUsers";
import AdminRoutes from "./AdminRoutes";
import SendAMessage from "../Components/Dahboard/SendAMessage";
import SendConsumerMessage from "../Components/Dahboard/sendConsumerMessage";

const router = createBrowserRouter([
  {
    path: '/', element: <Main></Main>,
    children: [
      {
        path: '/', element: <Home></Home>
      },
      {
        path: '/login', element: <Login></Login>
      },
      {
        path: '/register', element: <Register></Register>
      }
    ]
  },
  {
    path: 'dashboard', 
    element: <PrivateRoutes><Dashboard></Dashboard></PrivateRoutes>,
    children: [
      {
        path: '/dashboard', element: <WelcomePage></WelcomePage>
      },
      {
        path: 'manageUsers', 
        element: <AdminRoutes><ManageUsers></ManageUsers></AdminRoutes>
      },
      {
        path: 'sendAMessage',
        element: <AdminRoutes><SendAMessage></SendAMessage></AdminRoutes>
      },
      {
        path: 'sendConsumerMessage',
        element: <SendConsumerMessage></SendConsumerMessage>
      }
    ]
  },
  {
    path: '*',
    element: <ErrorPage></ErrorPage>
  }
])

export default router;