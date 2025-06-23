import { createBrowserRouter, Navigate } from "react-router";
import MainLayout from "./MainLayout";
import { VehicleDetails } from "../pages/VehicleDetails";
import { Vehicles } from "../pages/Vehicles";
import { Login } from "../pages/Login";
import { Register } from "../pages/Register";
import { Home } from "../pages/Home";
import { PrivateRoute } from "./PrivateRoute";
import { InformatiiUtile } from "../pages/InformatiiUtile";
import { Articol } from "../pages/Articol";


export const router = createBrowserRouter([
  {
    element: <MainLayout />,
    children: [
      { path: "/", element: <Home /> },
      { path: "/login", element: <Login /> },
      { path: "/register", element: <Register /> },
      {
        element: <PrivateRoute />,
        children: [
          { path: "/information/:id", element: <Articol /> },
          { path: "/information", element: <InformatiiUtile /> },
          { path: "/vehicles", element: <Vehicles /> },
          { path: "/vehicles/:regNo", element: <VehicleDetails /> },
        ],
      },

      { path: "*", element: <Navigate to="/" replace /> },
      
    ],
  },
]);
