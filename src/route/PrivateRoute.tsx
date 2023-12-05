import { Navigate, Outlet } from "react-router-dom";
import { ROUTES } from "./Constants";

const PrivateRoute = () => {
  const auth = true;
  return auth ? <Outlet /> : <Navigate to={ROUTES.SIGN_IN} />;
};

export default PrivateRoute;
