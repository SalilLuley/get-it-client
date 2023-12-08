import {
  Box,
  Button,
  Container,
  Grid,
  Modal,
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
  const [emailError, setEmailError] = useState(false);

  const [openSuccess, setSuccessOpen] = useState(false);

  const handleSuccessOpen = () => setSuccessOpen(true);
  const handleSuccessClose = () => setSuccessOpen(false);

  const handleEmailChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(event.target.value);
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    setEmailError(!emailRegex.test(event.target.value));
  };

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
        if (data.data.data.dob !== null) setDateOfBirth(data.data.data.dob);
        if (data.data.data.email !== null) setEmail(data.data.data.email);
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
      .then((_: any) => {
        handleSuccessOpen();
      })
      .catch((_) => {});
  }

  return (
    <React.Fragment>
      <Box
        component="main"
        sx={{
          backgroundColor: "#F6F6F6",
          display: "flex",
          flexDirection: "column",
          ml: { sm: "240px", xs: 0 },
          minHeight: "100vh",
        }}
      >
        <Grid container>
          <Grid item xs={12} sm={10} md={8} lg={6}>
            <Container sx={{ mt: 5, mb: 5 }}>
              <Typography variant="h4" component="h1" gutterBottom>
                Update Profile Details
              </Typography>
            </Container>
            <Box
              component="form"
              onSubmit={handleSubmit}
              sx={{ margin: 2, ml: { sm: 3 } }}
            >
              <Stack
                spacing={2}
                direction={{ xs: "column", sm: "row" }}
                sx={{ marginBottom: 4, mt: 5 }}
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
                value={email}
                fullWidth
                sx={{ mb: 4 }}
                onChange={handleEmailChange}
                error={emailError}
                helperText={emailError ? "Invalid email" : ""}
              />
              <TextField
                type="date"
                variant="outlined"
                color="primary"
                onChange={(e) => setDateOfBirth(e.target.value)}
                value={dateOfBirth}
                fullWidth
                sx={{ mb: 4 }}
                InputProps={{
                  inputProps: {
                    max: "2006-12-31",
                  },
                }}
              />
              <Button
                disabled={emailError}
                variant="contained"
                type="submit"
                sx={{ mt: 2 }}
              >
                Update
              </Button>
            </Box>
            <Modal
              open={openSuccess}
              onClose={handleSuccessClose}
              aria-labelledby="modal-modal-title"
              aria-describedby="modal-modal-description"
            >
              <Box
                sx={{
                  position: "absolute",
                  top: "50%",
                  left: "50%",
                  transform: "translate(-50%, -50%)",
                  width: 400,
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
                  User updated successfully.
                </Typography>
              </Box>
            </Modal>
          </Grid>
        </Grid>
      </Box>
    </React.Fragment>
  );
}
