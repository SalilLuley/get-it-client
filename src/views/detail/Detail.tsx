import {
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  CardMedia,
  Container,
  Grid,
  Typography,
} from "@mui/material";
import axios from "axios";
import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { NETWORKING_CONTSTANTS } from "../../network/Common.tsx";
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
        console.log("---", data.data.data);
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
        p: 2,
        height: "100vh",
        ml: { sm: "240px", xs: 0 },
      }}
    >
      <Grid flex={1} container>
        <Grid item xs={11}>
          <Container sx={{ mt: 3, mb: 5 }}>
            <Typography variant="h4" component="h1" gutterBottom>
              Parking Lot Details
            </Typography>
          </Container>
          <Card sx={{ m: "auto", mb: 5, p: 2, ml: 3, boxShadow: 3 }}>
            <CardMedia
              sx={{ height: { xs: "auto", sm: 400 } }}
              component="img"
              image="https://info.hignell.com/hubfs/HR/Images/Blog%20Images/reserved%20parking%20spot_10441780.jpg"
              alt={(parkingSpot as { title: string })["title"]}
            />
            <CardContent>
              <Typography gutterBottom variant="h5" component="div">
                {(parkingSpot as { title: string })["title"]}
              </Typography>
              <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
                {(parkingSpot as { body: string })["body"]}
              </Typography>
              <Box sx={{ display: "flex", alignItems: "center", mt: 2 }}>
                <Typography variant="body2" color="text.secondary">
                  Address : {(parkingSpot as { address: string })["address"]}
                </Typography>
              </Box>
            </CardContent>
            <CardActions sx={{ p: 2 }}>
              <Typography variant="h6">
                €{(parkingSpot as { rent: string })["rent"]}
              </Typography>
              <Box sx={{ flexGrow: 1 }} />
              <Button size="small" variant="contained" color="primary">
                Reserve Now
              </Button>
            </CardActions>
          </Card>
        </Grid>
      </Grid>
    </Box>
  );
};

export default OrderDetailsPage;
