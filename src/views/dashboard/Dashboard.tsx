import { styled } from "@mui/material/styles";
import Paper from "@mui/material/Paper";
import Grid from "@mui/material/Grid";
import {
  Autocomplete,
  Box,
  CssBaseline,
  List,
  ListItem,
  Modal,
  Slider,
  TextField,
  Typography,
} from "@mui/material";
import ActionAreaCard from "../../components/card/Card";
import axios from "axios";
import { NETWORKING_CONTSTANTS } from "../../network/Common.tsx";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { ROUTES } from "../../route/Constants";

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === "dark" ? "#1A2027" : "#fff",
  ...theme.typography.body2,
  textAlign: "center",
  color: theme.palette.text.secondary,
}));

// const style = {
//   position: "absolute" as "absolute",
//   top: "50%",
//   left: "50%",
//   transform: "translate(-50%, -50%)",
//   width: 400,
//   bgcolor: "background.paper",
//   border: "2px solid #000",
//   boxShadow: 24,
//   p: 4,
// };

export default function Dashboard() {
  const [open, setOpen] = useState(false);

  const config = {
    headers: {
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
  };
  const navigate = useNavigate();
  const [parkingSpots, setParkingSpots] = useState([]);
  const [setSearchParkingSpots, setSearchSetParkingSpots] = useState([]);

  useEffect(() => {
    axios
      .get(
        NETWORKING_CONTSTANTS.BASE_URL + NETWORKING_CONTSTANTS.PARKING.GET_ALL,
        config
      )
      .then((data: any) => {
        setParkingSpots(data.data.data);
        const parkingSpots: any[] = data.data.data;
        const spots: any = parkingSpots.map((item: any) => {
          return {
            label: item.title,
            id: item.id,
          };
        });
        setSearchSetParkingSpots(spots);
      })
      .catch((error) => {
        if (error.code === "ERR_BAD_REQUEST") {
          setOpen(true);
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
        setParkingSpots(data.data.data);
      })
      .catch((error) => {
        if (error.code === "ERR_BAD_REQUEST") {
          navigate(ROUTES.SIGN_IN, { replace: true });
        }
      });
  };

  return (
    <CssBaseline>
      <Box
        flex={1}
        display={"flex"}
        component="main"
        sx={{
          backgroundColor: "#F6F6F6",
          ml: { sm: "240px", xs: 0 },
        }}
      >
        <Grid flex={1} sx={{ ml: 2, mb: 10 }} container spacing={2}>
          <Grid item xs={12} mt={2}>
            <Autocomplete
              disablePortal
              onChange={(event: any, newValue: any) => {
                navigate(ROUTES.DETAIL, {
                  state: { id: newValue.id },
                  replace: true,
                });
              }}
              id="combo-box-demo"
              options={setSearchParkingSpots}
              sx={{ width: { xs: "90%", sm: "60%" }, mb: 2 }}
              renderInput={(params) => (
                <TextField {...params} label="Locations" />
              )}
            />
            <Typography color="#3e4958" component="div" variant="body2">
              {/* 400+ Parking Locations */}
            </Typography>
            <Typography component="div" variant="h5">
              Live From Space
            </Typography>
          </Grid>
          <Grid item xs={12}>
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
          <Grid item xs={11} sm={11} md={11} lg={11} xl={11}>
            <Item>
              <List sx={{ backgroundColor: "#F6F6F6" }}>
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

        {/* <Modal
          open={open}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
          <Box sx={style}>
            <Typography id="modal-modal-title" variant="h6" component="h2">
              Session Expired
            </Typography>
            <Typography id="modal-modal-description" sx={{ mt: 2 }}>
              Please relogin
            </Typography>
          </Box>
        </Modal> */}
      </Box>
    </CssBaseline>
  );
}
