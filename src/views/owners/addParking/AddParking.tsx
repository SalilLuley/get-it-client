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
import React, { useState } from "react";

import { useNavigate } from "react-router-dom";
import { NETWORKING_CONTSTANTS } from "../../../network/Common";

const style = {
  position: "absolute" as "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};

export default function OwnerAddParking() {
  const config = {
    headers: {
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
  };
  const navigate = useNavigate();

  const [title, settitle] = useState("");
  const [rent, setRent] = useState(0);
  const [body, setBody] = useState("");
  const [address, setAddress] = useState("");
  const [postalCode, setPostalCode] = useState("");
  const [open, setOpen] = useState(false);

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  function handleSubmit(event: { preventDefault: () => void }) {
    event.preventDefault();

    axios
      .patch(
        NETWORKING_CONTSTANTS.BASE_URL + NETWORKING_CONTSTANTS.PARKING.CREATE,
        {
          title: title === "" ? undefined : title,
          rent: rent === 0 ? undefined : rent,
          body: body === "" ? undefined : body,
          postalCode: postalCode === "" ? undefined : postalCode,
          address: address === "" ? undefined : address,
        },
        config
      )
      .then((data: any) => {})
      .catch((error) => {
        handleOpen();
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
          flexDirection: "column",
          ml: { sm: "240px", xs: 0 },
        }}
      >
        <Grid flex={1} container>
          <Grid item xs={10}>
            <Container sx={{ mt: 5, mb: 5, ml: 2 }}>
              <Typography variant="h4" component="h1" gutterBottom>
                Add Parking Spot
              </Typography>
            </Container>
            <form onSubmit={handleSubmit}>
              <Stack spacing={2} direction="row" sx={{ mb: 4, ml: 5, mt: 5 }}>
                <TextField
                  type="text"
                  variant="outlined"
                  color="primary"
                  label="Title"
                  onChange={(e) => settitle(e.target.value)}
                  value={title}
                  fullWidth
                  required
                />
                <TextField
                  type="number"
                  variant="outlined"
                  color="primary"
                  label="Rent"
                  inputProps={{ min: 0, max: 100 }}
                  onChange={(e) => setRent(parseInt(e.target.value))}
                  onKeyDown={(e) => {
                    // Allow only backspace, arrow keys, and delete
                    if (![8, 37, 38, 39, 40, 46].includes(e.keyCode)) {
                      e.preventDefault();
                    }
                  }}
                  value={rent}
                  fullWidth
                  required
                />
              </Stack>
              <TextField
                type="text"
                variant="outlined"
                color="primary"
                label="Description"
                onChange={(e) => setBody(e.target.value)}
                value={body}
                fullWidth
                required
                sx={{ mb: 4, ml: 5 }}
              />
              <TextField
                type="text"
                variant="outlined"
                color="primary"
                label="Address"
                onChange={(e) => setAddress(e.target.value)}
                value={address}
                fullWidth
                required
                sx={{ mb: 4, ml: 5 }}
              />
              <TextField
                type="text"
                variant="outlined"
                color="primary"
                label="Postal Code"
                onChange={(e) => setPostalCode(e.target.value)}
                value={postalCode}
                fullWidth
                required
                sx={{ mb: 4, ml: 5 }}
              />
              <Button sx={{ ml: 5 }} variant="contained" type="submit">
                Submit
              </Button>
            </form>
            <Modal
              open={open}
              onClose={handleClose}
              aria-labelledby="modal-modal-title"
              aria-describedby="modal-modal-description"
            >
              <Box sx={style}>
                <Typography id="modal-modal-title" variant="h6" component="h2">
                  Error
                </Typography>
                <Typography id="modal-modal-description" sx={{ mt: 2 }}>
                  Only users with role Owners can add parking spots, please
                  contact admin to change your role.
                </Typography>
              </Box>
            </Modal>
          </Grid>
        </Grid>
      </Box>
    </React.Fragment>
  );
}
