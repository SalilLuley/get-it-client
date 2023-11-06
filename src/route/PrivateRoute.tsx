import { Navigate, Outlet } from "react-router-dom";
import { ROUTES } from "./Constants";

const PrivateRoute = () => {
  const auth = false;
  return auth ? <Outlet /> : <Navigate to={ROUTES.SIGN_IN} />;
};

export default PrivateRoute;
