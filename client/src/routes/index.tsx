import { createBrowserRouter } from "react-router-dom";

import RootLayout from "../layouts/RootLayout";
import DashboardLayout from "../layouts/DashboardLayout";
import Login from "../pages/Login";
import Signup from "../pages/Signup";
import Home from "@/pages/Home";

const router = createBrowserRouter([
  {
    path: "*",
    element: <RootLayout />,
    children: [
      {
        path: "login",
        element: <Login />,
      },
      {
        path: "signup",
        element: <Signup />,
      },
      {
        path: "",
        element: <DashboardLayout />,
        children: [
          {
            path: "",
            element: <Home />,
          },
        ],
      },
    ],
  },
]);

export default router;
