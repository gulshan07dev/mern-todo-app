import { createBrowserRouter } from "react-router-dom";

import AuthLayout from "@/layouts/AuthLayout";
import RootLayout from "../layouts/RootLayout";
import DashboardLayout from "../layouts/DashboardLayout";
import Login from "../pages/auth/Login";
import Signup from "../pages/auth/Signup";
import Home from "@/pages/Home";
import UserProfile from "@/pages/auth/UserProfile";

const router = createBrowserRouter([
  {
    element: <RootLayout />,
    children: [
      {
        element: <AuthLayout authRequired={false} />,
        children: [
          {
            path: "login",
            element: <Login />,
          },
          {
            path: "signup",
            element: <Signup />,
          },
        ],
      },
      {
        element: <DashboardLayout />,
        children: [
          {
            path: "",
            element: <Home />,
          },
          { 
            element: <AuthLayout authRequired />,
            children: [
              {
                path: "/me",
                element: <UserProfile />
              }
            ]
          }
        ],
      },
    ],
  },
]);

export default router;
