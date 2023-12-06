import { Box, Button, Stack, TextField } from "@mui/material";
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
  const [password, setPassword] = useState("");

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
        setDateOfBirth(data.data.data.dob);
        setEmail(data.data.data.email);
      })
      .catch((error) => {
        console.log("Error me", error);
        if (error.code === "ERR_BAD_REQUEST") {
          navigate(ROUTES.SIGN_IN, { replace: true });
        }
      });
  }, []);

  function handleSubmit(event: { preventDefault: () => void }) {
    event.preventDefault();
    console.log(firstName, lastName, email, dateOfBirth, password);

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
      .then((data: any) => {
        console.log("data", data);
      })
      .catch((error) => {
        console.log("Error me", error);
      });
  }

  return (
    <React.Fragment>
      <Box
        component="main"
        sx={{
          height: "100vh",
          backgroundColor: "#F6F6F6",
          display: "flex",
          ml: { sm: "240px", xs: 0 },
          mt: { sm: "80px", xs: "80px", lg: "80px", md: "80px" },
        }}
      >
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
      </Box>
    </React.Fragment>
  );
}
