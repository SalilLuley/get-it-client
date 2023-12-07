import {
  Box,
  Card,
  CardContent,
  Chip,
  Container,
  Grid,
  Typography,
} from "@mui/material";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { NETWORKING_CONTSTANTS } from "../../network/Common.tsx";
import { useNavigate } from "react-router-dom";
import { ROUTES } from "../../route/Constants.tsx";
import PullToRefresh from "react-pull-to-refresh";

export type MyOrders = Order[];

export interface Order {
  duration: number;
  orderId: number;
  parkingSpotId: number;
  price: number;
  parkingSpot: ParkingSpot;
  status: string;
  createdAt: string;
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
  const [refresh, setRefresh] = useState(false);

  useEffect(() => {
    axios
      .get(
        NETWORKING_CONTSTANTS.BASE_URL +
          NETWORKING_CONTSTANTS.ORDERS.GET_MY_ORDERS,
        config
      )
      .then((data: any) => {
        const myOrders = data.data.data
          .map((order: any) => {
            return {
              duration: order.duration,
              orderId: order.orderId,
              parkingSpotId: order.parkingSpotId,
              price: order.price,
              parkingSpot: order.parkingSpot,
              status: order.status,
              createdAt: order.createdAt,
            };
          })
          .reverse();
        setOrders(myOrders);
      })
      .catch((error) => {
        if (error.code === "ERR_BAD_REQUEST") {
          navigate(ROUTES.SIGN_IN, { replace: true });
        }
      });
  }, [refresh]);

  return (
    <React.Fragment>
      <Box
        component="main"
        display="flex"
        sx={{
          backgroundColor: "#F6F6F6",
          ml: { sm: "240px", xs: 0 },
        }}
      >
        <Grid sx={{ backgroundColor: "#F6F6F6" }} flex={1} container>
          <Grid item xs={12}>
            <Container sx={{ mt: 5, mb: 5, ml: 2 }}>
              <Typography variant="h4" component="h1" gutterBottom>
                My Order Details
              </Typography>
            </Container>
            <PullToRefresh
              onRefresh={async () => {
                setRefresh(!refresh);
              }}
            >
              {orders.map((order, index) => (
                <Card key={index} sx={{ minWidth: "auto", m: 5 }}>
                  <CardContent>
                    <Typography
                      variant="h5"
                      component="div"
                      sx={{
                        display: "flex",
                        justifyContent: "space-between",
                        fontSize: { xs: "1rem", sm: "1.5rem" },
                      }}
                    >
                      <span>{order.parkingSpot.title}</span>
                      <Chip
                        label={order.status}
                        color={
                          order.status === "ONGOING" ? "secondary" : "primary"
                        }
                        size="small"
                      />
                    </Typography>
                    <Typography variant="body2">
                      {`${order.parkingSpot.address}`}
                    </Typography>
                    <Typography variant="body2">
                      {`Postal Code: ${order.parkingSpot.postalCode}`}
                    </Typography>
                    <Typography variant="body2">
                      {`Duration: ${order.duration} hrs`}
                    </Typography>
                    <Typography variant="body2">
                      {`Total: €${order.price}`}
                    </Typography>
                    <Typography variant="body2">
                      {`Date: ${order.createdAt}`}
                    </Typography>
                  </CardContent>
                </Card>
              ))}
            </PullToRefresh>
          </Grid>
        </Grid>
      </Box>
    </React.Fragment>
  );
}
