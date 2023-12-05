import { styled } from "@mui/material/styles";
import Paper from "@mui/material/Paper";
import Grid from "@mui/material/Grid";
import { Box, CssBaseline, List, ListItem, Typography } from "@mui/material";
import ActionAreaCard from "../../components/card/Card";
import axios from "axios";
import { NETWORKING_CONTSTANTS } from "../../network/Common";
import { useEffect, useState } from "react";

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === "dark" ? "#1A2027" : "#fff",
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: "center",
  color: theme.palette.text.secondary,
}));

const config = {
  headers: {
    Authorization: `Bearer ${localStorage.getItem("token")}`,
  },
};

export default function Dashboard() {
  const [value, setValue] = useState<number[]>([20, 37]);
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
      });
  }, []);

  function valuetext(value: number) {
    return `${value}°C`;
  }

  const handleChange = (event: Event, newValue: number | number[]) => {
    setValue(newValue as number[]);
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
      .catch(function () {});
  };

  useEffect(() => {
    axios
      .post(
        NETWORKING_CONTSTANTS.BASE_URL +
          NETWORKING_CONTSTANTS.PARKING.FILTER.RENT,
        {
          postalCode: "",
          rent: value ?? 100,
        },
        config
      )
      .then((data: any) => {
        console.log(data.data.data);
        setParkingSpots(data.data.data);
      })
      .catch(function () {});
  }, []);

  return (
    <CssBaseline>
      <Box
        component="main"
        sx={{
          display: "flex",
          ml: { sm: "240px", xs: 0 },
          mt: { sm: "80px", xs: "80px", lg: "80px", md: "80px" },
        }}
      >
        <Grid container spacing={2}>
          <Grid item xs={12} ml={5} mt={5}>
            <Typography color="#3e4958" component="div" variant="body2">
              400+ Parking Locations
            </Typography>
            <Typography component="div" variant="h5">
              Live From Space
            </Typography>
          </Grid>
          <Grid item xs={12} ml={5}>
            <Box sx={{ width: 300 }}>
              <Typography component="div" variant="body2">
                Filter By Rent
              </Typography>
              <Slider
                defaultValue={30}
                getAriaValueText={valuetext}
                valueLabelDisplay="auto"
                step={10}
                marks
                min={10}
                max={110}
                onChange={handleChange}
              />
            </Box>
          </Grid>
          <Grid item xs={12} sm={6} md={6} lg={6} xl={6}>
            <Item>
              <List>
                {parkingSpots.map((spot: any) => (
                  <ListItem key={spot["parking_spot_id"]} disablePadding>
                    <ActionAreaCard {...spot} />
                  </ListItem>
                ))}
              </List>
            </Item>
          </Grid>
          <Grid item xs={0} sm={6} md={6} lg={6} xl={6}>
            {/* <Item>
              <MapComponent></MapComponent>
            </Item> */}
          </Grid>
        </Grid>
      </Box>
    </CssBaseline>
  );
}

import Slider from "@mui/material/Slider";

const marks = [
  {
    value: 0,
    label: "0",
  },
  {
    value: 20,
    label: "20",
  },
  {
    value: 50,
    label: "50",
  },
  {
    value: 100,
    label: "100",
  },
];
