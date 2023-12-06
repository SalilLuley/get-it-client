import { Navigate, Outlet } from "react-router-dom";
import { ROUTES } from "./Constants";

const PrivateRoute = () => {
  const token = localStorage.getItem("token");
  return token !== "" ? <Outlet /> : <Navigate to={ROUTES.SIGN_IN} />;
};

export default PrivateRoute;
