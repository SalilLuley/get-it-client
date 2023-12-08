import { styled } from "@mui/material/styles";
import Paper from "@mui/material/Paper";
import Grid from "@mui/material/Grid";
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Autocomplete,
  Box,
  Container,
  CssBaseline,
  List,
  ListItem,
  Pagination,
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
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { useQuery } from "react-query";
import NoDataImage from "../../assets/nodata.jpg";
const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === "dark" ? "#1A2027" : "#fff",
  ...theme.typography.body2,
  textAlign: "center",
  color: theme.palette.text.secondary,
}));

export default function Dashboard() {
  const navigate = useNavigate();
  const [, setOpen] = useState(false);
  const [parkingSpots, setParkingSpots] = useState([]);
  const [setSearchParkingSpots, setSearchSetParkingSpots] = useState([]);

  const [postalCode, setPostalCode] = useState("");
  const [rent, setRent] = useState(110);

  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const recordsPerPage = 3;

  const config = {
    headers: {
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
  };

  const handlePageChange = (_: React.ChangeEvent<unknown>, value: number) => {
    setPage(value);
  };

  const fetchParkingSpots = async () => {
    const response = await axios.get(
      NETWORKING_CONTSTANTS.BASE_URL +
        NETWORKING_CONTSTANTS.PARKING.GET_ALL +
        `${page}/${recordsPerPage}`,
      config
    );

    return response.data.data;
  };

  const fetchAutoCompleteSpots = async () => {
    const response = await axios.get(
      NETWORKING_CONTSTANTS.BASE_URL +
        NETWORKING_CONTSTANTS.PARKING.GET_ALL_AUTOCOMPLETE,
      config
    );
    return response.data.data;
  };

  const { data: parkingData, isError: parkingError } = useQuery(
    ["parkingSpots", page],
    fetchParkingSpots,
    { keepPreviousData: true }
  );

  const { data: autoCompleteData, isError: autoCompleteError } = useQuery(
    ["autoCompleteSpots", page],
    fetchAutoCompleteSpots,
    { keepPreviousData: true }
  );

  useEffect(() => {
    if (parkingData) {
      const totalRecords = parkingData[0].total;
      console.log("totalRecords", totalRecords);
      console.log("parkingData", parkingData);

      setParkingSpots(parkingData);
      setTotalPages(Math.ceil(totalRecords / recordsPerPage));
    }

    if (autoCompleteData) {
      const parkingSpots: any[] = autoCompleteData;
      const spots: any = parkingSpots.map((item: any) => {
        return {
          label: item.title,
          id: item.id,
        };
      });
      setSearchSetParkingSpots(spots);
    }

    if (parkingError || autoCompleteError) {
      setOpen(true);
      navigate(ROUTES.SIGN_IN, { replace: true });
    }
  }, [parkingData, autoCompleteData, parkingError, autoCompleteError]);

  const handleRentRangeChange = (_: Event, newValue: number | number[]) => {
    setRent(newValue as number);
    axios
      .post(
        NETWORKING_CONTSTANTS.BASE_URL +
          NETWORKING_CONTSTANTS.PARKING.FILTER.RENT,
        {
          postalCode,
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

  const handlePostalCodeChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const postalCode = event.target.value;
    setPostalCode(postalCode);
    if (postalCode.length >= 3) {
      axios
        .post(
          NETWORKING_CONTSTANTS.BASE_URL +
            NETWORKING_CONTSTANTS.PARKING.FILTER.RENT,
          {
            postalCode,
            rent: rent ?? 100,
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
    }
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
        <Grid flex={1} container spacing={2}>
          <Grid item xs={12}>
            <Autocomplete
              disablePortal
              onChange={(_: any, newValue: any) => {
                navigate(ROUTES.DETAIL, {
                  state: { id: newValue.id },
                  replace: true,
                });
              }}
              id="combo-box-demo"
              options={setSearchParkingSpots}
              sx={{ p: 2, width: { xs: "100%", sm: "91.66%" } }}
              renderInput={(params) => (
                <TextField {...params} label="Locations" />
              )}
            />
            <Typography
              component="div"
              variant="h5"
              align="left"
              sx={{ ml: { xs: 2, sm: 2 } }}
            >
              Live From Space
            </Typography>
          </Grid>
          <Grid item xs={12}>
            <Box
              display={{ xs: "flex", sm: "flex" }}
              justifyContent="space-between"
              alignItems="center"
              pl={2}
              pr={2}
            >
              <Accordion
                sx={{
                  width: { xs: "100%", sm: "91.66%" },
                  border: "1px solid #e0e0e0",
                  borderRadius: 2,
                  backgroundColor: "#F6F6F6",
                }}
              >
                <AccordionSummary
                  expandIcon={<ExpandMoreIcon />}
                  id="filters-header"
                >
                  <Typography variant="body1">Filters</Typography>
                </AccordionSummary>
                <AccordionDetails>
                  <Accordion
                    sx={{
                      boxShadow: "none",
                      "&:before": { display: "none" },
                      "&:not(:last-child)": { borderBottom: 0 },
                    }}
                  >
                    <AccordionSummary
                      expandIcon={<ExpandMoreIcon />}
                      aria-controls="panel1a-content"
                      id="panel1a-header"
                    >
                      <Typography>Rent Range</Typography>
                    </AccordionSummary>
                    <AccordionDetails>
                      <Slider
                        defaultValue={30}
                        valueLabelDisplay="auto"
                        aria-labelledby="range-slider"
                        step={10}
                        marks
                        min={10}
                        max={110}
                        onChange={handleRentRangeChange}
                      />
                    </AccordionDetails>
                  </Accordion>
                  <Accordion
                    sx={{
                      boxShadow: "none",
                      "&:before": { display: "none" },
                      "&:not(:last-child)": { borderBottom: 0 },
                    }}
                  >
                    <AccordionSummary
                      expandIcon={<ExpandMoreIcon />}
                      aria-controls="panel2a-content"
                      id="panel2a-header"
                    >
                      <Typography>Postal Code</Typography>
                    </AccordionSummary>
                    <AccordionDetails>
                      <TextField
                        value={postalCode}
                        onChange={handlePostalCodeChange}
                        label="Postal Code"
                        variant="outlined"
                        size="small"
                      />
                    </AccordionDetails>
                  </Accordion>
                </AccordionDetails>
              </Accordion>
            </Box>
          </Grid>
          <Grid item xs={12} sm={11} md={11} lg={11} xl={11}>
            {parkingSpots.length === 0 ? (
              <Container maxWidth="sm">
                <Box
                  display="flex"
                  justifyContent="center"
                  alignItems="center"
                  sx={{ height: { sm: "80vh", xs: "40vh" } }}
                >
                  <img
                    src={NoDataImage}
                    alt="No data"
                    style={{ width: "100%", height: "auto" }}
                  />
                </Box>
              </Container>
            ) : (
              <Item>
                <List sx={{ backgroundColor: "#F6F6F6" }}>
                  {parkingSpots.map((spot: any) => (
                    <ListItem key={spot["title"]} disablePadding>
                      <ActionAreaCard {...spot} />
                    </ListItem>
                  ))}
                  <Pagination
                    count={totalPages}
                    page={page}
                    onChange={handlePageChange}
                  />
                </List>
              </Item>
            )}
          </Grid>
        </Grid>
      </Box>
    </CssBaseline>
  );
}
