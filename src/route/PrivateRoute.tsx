import { useNavigate } from "react-router-dom";
import { ROUTES } from "./Constants";
import axios from "axios";
import { NETWORKING_CONTSTANTS } from "../network/Common";
import { useQuery } from "react-query";
import { useEffect } from "react";

const PrivateRoute = () => {
  const navigate = useNavigate();

  const token = localStorage.getItem("token");
  const config = {
    headers: {
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
  };

  console.log("token", token);

  const validateToken = async () => {
    const response = await axios.get(
      NETWORKING_CONTSTANTS.BASE_URL +
        NETWORKING_CONTSTANTS.AUTH.VALIDATE_TOKEN,
      config
    );
    return response.data.data;
  };

  const { data: _, isError } = useQuery("validateToken", validateToken);

  useEffect(() => {
    if (token !== null && token !== "") {
      if (!isError) {
        navigate(ROUTES.DASHBOARD, { replace: true });
      }
    } else {
      navigate(ROUTES.SIGN_IN, { replace: true });
    }
  }, [token, isError, navigate]);

  return null;
};

export default PrivateRoute;
