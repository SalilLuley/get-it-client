import {
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  CardMedia,
  Container,
  Grid,
  Modal,
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
  const [open, setOpen] = useState(false);

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

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
        setParkingSpot(data.data.data);
      })
      .catch((error) => {
        if (error.code === "ERR_BAD_REQUEST") {
          navigate(ROUTES.SIGN_IN, { replace: true });
        }
      });
  }, []);

  const handleReserveNow = () => {
    axios
      .post(
        NETWORKING_CONTSTANTS.BASE_URL + NETWORKING_CONTSTANTS.ORDERS.CREATE,
        {
          duration: 2,
          parkingSpotId: state.id,
        },
        config
      )
      .then((data: any) => {
        handleOpen();
      })
      .catch((error) => {
        console.log(error);
        if (error.code === "ERR_BAD_REQUEST") {
          navigate(ROUTES.SIGN_IN, { replace: true });
        }
      });
  };

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
              <Button
                onClick={handleReserveNow}
                size="small"
                variant="contained"
                color="primary"
              >
                Reserve Now
              </Button>
            </CardActions>
          </Card>
          <Modal
            open={open}
            onClose={handleClose}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
          >
            <Box
              sx={{
                position: "absolute",
                top: "50%",
                left: "50%",
                transform: "translate(-50%, -50%)",
                width: { xs: "80%", sm: "40%" },
                bgcolor: "background.paper",
                border: "2px solid #000",
                boxShadow: 24,
                p: 4,
              }}
            >
              <Typography id="modal-modal-title" variant="h6" component="h2">
                Success
              </Typography>
              <Typography id="modal-modal-description" sx={{ mt: 2 }}>
                Successfuly created order
              </Typography>
              <Box sx={{ mt: 2 }}></Box>
              <Button variant="outlined" onClick={handleClose}>
                Close
              </Button>
            </Box>
          </Modal>
        </Grid>
      </Grid>
    </Box>
  );
};

export default OrderDetailsPage;
