import {
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  Chip,
  Container,
  Grid,
  Typography,
} from "@mui/material";
import axios from "axios";
import React, { useEffect, useState } from "react";

import { useNavigate } from "react-router-dom";
import { NETWORKING_CONTSTANTS } from "../../../../network/Common";
import { ROUTES } from "../../../../route/Constants";

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

export default function MyOrdersOwner() {
  const [orders, setOrders] = useState<MyOrders>([]);
  const [refresh, setRefresh] = useState(false);

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
          NETWORKING_CONTSTANTS.ORDERS.GET_MY_OWNER_ORDERS,
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

  const handleCloseOrder = (orderId: number) => {
    axios
      .patch(
        NETWORKING_CONTSTANTS.BASE_URL +
          NETWORKING_CONTSTANTS.ORDERS.UPDATE +
          `/${orderId}`,
        {
          status: 1,
        },
        config
      )
      .then((_: any) => {
        setRefresh(!refresh);
      })
      .catch((_) => {});
  };

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
            {orders.map((order) => (
              <Card key={order.orderId} sx={{ minWidth: "auto", m: 5 }}>
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
                <CardActions>
                  <Button
                    variant="outlined"
                    color="primary"
                    onClick={() => handleCloseOrder(order.orderId)}
                    disabled={order.status === "COMPLETED"}
                  >
                    Close Order
                  </Button>
                </CardActions>
              </Card>
            ))}
          </Grid>
        </Grid>
      </Box>
    </React.Fragment>
  );
}
