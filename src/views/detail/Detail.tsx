import {
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  CardMedia,
  Typography,
} from "@mui/material";
import axios from "axios";
import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { NETWORKING_CONTSTANTS } from "../../network/Common";
import { ROUTES } from "../../route/Constants";

const OrderDetailsPage = () => {
  const { state } = useLocation();
  const navigate = useNavigate();

  const config = {
    headers: {
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
  };

  const [parkingSpot, setParkingSpot] = useState({});

  useEffect(() => {
    axios
      .get(
        NETWORKING_CONTSTANTS.BASE_URL +
          NETWORKING_CONTSTANTS.PARKING.GET_ONE +
          `${state.id}`,
        config
      )
      .then((data: any) => {
        console.log(data.data.data);
        setParkingSpot(data.data.data);
      })
      .catch((error) => {
        console.log("Error me", error);
        if (error.code === "ERR_BAD_REQUEST") {
          navigate(ROUTES.SIGN_IN, { replace: true });
        }
      });
  }, []);

  return (
    <Box
      component="main"
      sx={{
        backgroundColor: "#F6F6F6",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        height: "100vh",
        p: 2,
        ml: { sm: "240px", xs: 0 },
        mt: { sm: "80px", xs: "80px", lg: "80px", md: "80px" },
      }}
    >
      <Card sx={{ maxWidth: "90vh", width: "100%", m: "auto" }}>
        <CardMedia
          component="img"
          image="https://info.hignell.com/hubfs/HR/Images/Blog%20Images/reserved%20parking%20spot_10441780.jpg"
          alt={(parkingSpot as { title: string })["title"]}
        />
        <CardContent>
          <Typography gutterBottom variant="h5" component="div">
            {(parkingSpot as { title: string })["title"]}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {(parkingSpot as { body: string })["body"]}
          </Typography>
        </CardContent>
        <CardActions>
          <Typography variant="h6">
            ${(parkingSpot as { rent: string })["rent"]}
          </Typography>
          <Box sx={{ flexGrow: 1 }} />
          <Button size="small" variant="contained" color="primary">
            Reserve Now
          </Button>
        </CardActions>
      </Card>
    </Box>
  );
};

export default OrderDetailsPage;
