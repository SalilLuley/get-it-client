import { styled } from "@mui/material/styles";
import Paper from "@mui/material/Paper";
import Grid from "@mui/material/Grid";
import {
  Box,
  CssBaseline,
  List,
  ListItem,
  Slider,
  Typography,
} from "@mui/material";
import ActionAreaCard from "../../components/card/Card";
import axios from "axios";
import { NETWORKING_CONTSTANTS } from "../../network/Common";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { ROUTES } from "../../route/Constants";

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === "dark" ? "#1A2027" : "#fff",
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: "center",
  color: theme.palette.text.secondary,
}));

export default function Dashboard() {
  const config = {
    headers: {
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
  };
  const navigate = useNavigate();
  const [parkingSpots, setParkingSpots] = useState([]);

  useEffect(() => {
    axios
      .get(
        NETWORKING_CONTSTANTS.BASE_URL + NETWORKING_CONTSTANTS.PARKING.GET_ALL,
        config
      )
      .then((data: any) => {
        console.log(data.data.data);
        setParkingSpots(data.data.data);
      })
      .catch((error) => {
        console.log("Error me", error);
        if (error.code === "ERR_BAD_REQUEST") {
          navigate(ROUTES.SIGN_IN, { replace: true });
        }
      });
  }, []);

  const handleChange = (event: Event, newValue: number | number[]) => {
    axios
      .post(
        NETWORKING_CONTSTANTS.BASE_URL +
          NETWORKING_CONTSTANTS.PARKING.FILTER.RENT,
        {
          postalCode: "",
          rent: newValue ?? 100,
        },
        config
      )
      .then((data: any) => {
        console.log(data.data.data);
        setParkingSpots(data.data.data);
      })
      .catch((error) => {
        console.log("Error me", error);
        if (error.code === "ERR_BAD_REQUEST") {
          navigate(ROUTES.SIGN_IN, { replace: true });
        }
      });
  };

  return (
    <CssBaseline>
      <Box
        component="main"
        sx={{
          backgroundColor: "#F6F6F6",
          ml: { sm: "240px", xs: 0 },
          mt: { sm: "80px", xs: "80px", lg: "80px", md: "80px" },
          mb: 10,
          height: "100vh",
        }}
        overflow="auto"
      >
        <Grid sx={{ ml: 2 }} container spacing={2}>
          <Grid item xs={12} ml={5} mt={5}>
            <Typography color="#3e4958" component="div" variant="body2">
              400+ Parking Locations
            </Typography>
            <Typography component="div" variant="h5">
              Live From Space
            </Typography>
          </Grid>
          <Grid item xs={12} ml={5}>
            <Box sx={{ width: { xs: "75%", sm: "25%" } }}>
              <Typography component="div" variant="body2">
                Filter By Rent
              </Typography>
              <Slider
                defaultValue={30}
                valueLabelDisplay="auto"
                step={10}
                marks
                min={10}
                max={110}
                onChange={handleChange}
              />
            </Box>
          </Grid>
          <Grid item xs={10} sm={11} md={11} lg={11} xl={11}>
            <Item>
              <List>
                {parkingSpots.map((spot: any) => (
                  <ListItem key={spot["title"]} disablePadding>
                    <ActionAreaCard {...spot} />
                  </ListItem>
                ))}
              </List>
            </Item>
          </Grid>
          {/* <Grid item xs={0} sm={6} md={6} lg={6} xl={6}>
            <Item>
              <MapComponent></MapComponent>
            </Item>
          </Grid> */}
        </Grid>
      </Box>
    </CssBaseline>
  );
}
