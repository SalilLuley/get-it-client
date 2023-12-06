import {
  Box,
  Button,
  Container,
  Grid,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { NETWORKING_CONTSTANTS } from "../../network/Common.tsx";
import { ROUTES } from "../../route/Constants";
import { useNavigate } from "react-router-dom";

export default function Profile() {
  const config = {
    headers: {
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
  };
  const navigate = useNavigate();

  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [dateOfBirth, setDateOfBirth] = useState("");

  useEffect(() => {
    axios
      .get(
        NETWORKING_CONTSTANTS.BASE_URL +
          NETWORKING_CONTSTANTS.USER.GET_MY_PROFILE,
        config
      )
      .then((data: any) => {
        setFirstName(data.data.data.firstname);
        setLastName(data.data.data.lastname);
        if (!data.data.data.dob) setDateOfBirth(data.data.data.dob);
        setEmail(data.data.data.email);
      })
      .catch((error) => {
        if (error.code === "ERR_BAD_REQUEST") {
          navigate(ROUTES.SIGN_IN, { replace: true });
        }
      });
  }, []);

  function handleSubmit(event: { preventDefault: () => void }) {
    event.preventDefault();

    axios
      .patch(
        NETWORKING_CONTSTANTS.BASE_URL + NETWORKING_CONTSTANTS.USER.UPDATE,
        {
          firstname: firstName === "" ? undefined : firstName,
          lastname: lastName === "" ? undefined : lastName,
          email: email === "" ? undefined : email,
          dob: dateOfBirth === "" ? undefined : dateOfBirth,
        },
        config
      )
      .then((data: any) => {})
      .catch((error) => {});
  }

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
          <Grid item xs={10}>
            <Container sx={{ mt: 5, mb: 5, ml: 2 }}>
              <Typography variant="h4" component="h1" gutterBottom>
                Update Profile Details
              </Typography>
            </Container>
            <form onSubmit={handleSubmit}>
              <Stack
                spacing={2}
                direction="row"
                sx={{ marginBottom: 4, ml: 5, mt: 5 }}
              >
                <TextField
                  type="text"
                  variant="outlined"
                  color="primary"
                  label="First Name"
                  onChange={(e) => setFirstName(e.target.value)}
                  value={firstName}
                  fullWidth
                />
                <TextField
                  type="text"
                  variant="outlined"
                  color="primary"
                  label="Last Name"
                  onChange={(e) => setLastName(e.target.value)}
                  value={lastName}
                  fullWidth
                />
              </Stack>
              <TextField
                type="email"
                variant="outlined"
                color="primary"
                label="Email"
                onChange={(e) => setEmail(e.target.value)}
                value={email}
                fullWidth
                sx={{ mb: 4, ml: 5 }}
              />
              {/* <TextField
            type="password"
            variant="outlined"
            color="primary"
            label="Password"
            onChange={(e) => setPassword(e.target.value)}
            value={password}
            
            fullWidth
            sx={{ mb: 4, ml: 5 }}
          /> */}
              <TextField
                type="date"
                variant="outlined"
                color="primary"
                onChange={(e) => setDateOfBirth(e.target.value)}
                value={dateOfBirth}
                fullWidth
                sx={{ mb: 4, ml: 5 }}
              />
              <Button sx={{ ml: 5 }} variant="contained" type="submit">
                Submit
              </Button>
            </form>
          </Grid>
        </Grid>
      </Box>
    </React.Fragment>
  );
}
