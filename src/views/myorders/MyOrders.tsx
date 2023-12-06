import {
  Box,
  Card,
  CardContent,
  Container,
  Grid,
  Typography,
} from "@mui/material";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { NETWORKING_CONTSTANTS } from "../../network/Common.tsx";
import { useNavigate } from "react-router-dom";
import { ROUTES } from "../../route/Constants.tsx";

export type MyOrders = Order[];

export interface Order {
  duration: number;
  orderId: number;
  parkingSpotId: number;
  price: number;
  parkingSpot: ParkingSpot;
}

export interface ParkingSpot {
  id: number;
  title: string;
  body: string;
  rent: number;
  latitude: number;
  longitude: number;
  address: string;
  postalCode: string;
}

export default function MyOrders() {
  const [orders, setOrders] = useState<MyOrders>([]);
  const config = {
    headers: {
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
  };
  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get(
        NETWORKING_CONTSTANTS.BASE_URL +
          NETWORKING_CONTSTANTS.ORDERS.GET_MY_ORDERS,
        config
      )
      .then((data: any) => {
        console.log("data", data.data.data);
        const myOrders = data.data.data.map((order: any) => {
          return {
            duration: order.duration,
            orderId: order.orderId,
            parkingSpotId: order.parkingSpotId,
            price: order.price,
            parkingSpot: order.parkingSpot,
          };
        });
        setOrders(myOrders);
      })
      .catch((error) => {
        if (error.code === "ERR_BAD_REQUEST") {
          navigate(ROUTES.SIGN_IN, { replace: true });
        }
      });
  }, []);

  return (
    <React.Fragment>
      <Box
        component="main"
        sx={{
          height: "100vh",
          backgroundColor: "#F6F6F6",
          display: "flex",
          flexDirection: "column",
          ml: { sm: "240px", xs: 0 },
        }}
      >
        <Grid flex={1} container>
          <Grid item xs={11}>
            <Container sx={{ mt: 5, mb: 5, ml: 2 }}>
              <Typography variant="h4" component="h1" gutterBottom>
                My Order Details
              </Typography>
            </Container>
            {orders.map((order, index) => (
              <Card key={index} sx={{ minWidth: 275, m: 5 }}>
                <CardContent>
                  <Typography variant="h5" component="div">
                    {`${order.parkingSpot.title}`}
                  </Typography>
                  <Typography variant="body2">
                    {`${order.parkingSpot.address}`}
                  </Typography>
                  <Typography variant="body2">
                    {`Postal Code: ${order.parkingSpot.postalCode}`}
                  </Typography>
                  <Typography variant="body2">
                    {`Duration: ${order["duration"]} hrs`}
                  </Typography>
                  <Typography variant="body2">
                    {`Total: €${order["price"]}`}
                  </Typography>
                </CardContent>
              </Card>
            ))}
          </Grid>
        </Grid>
      </Box>
    </React.Fragment>
  );
}
