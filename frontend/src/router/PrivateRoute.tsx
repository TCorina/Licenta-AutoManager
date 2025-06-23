import { Navigate, Outlet } from "react-router";
import { useAuth } from "../context/auth";

export const PrivateRoute = () => {
  const { isAuth } = useAuth();

  return isAuth ? <Outlet /> : <Navigate to="/login" />;
};
