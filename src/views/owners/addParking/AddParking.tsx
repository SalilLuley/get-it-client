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

import { NETWORKING_CONTSTANTS } from "../../../network/Common";

export default function OwnerAddParking() {
  const config = {
    headers: {
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
  };

  const [title, settitle] = useState("");
  const [rent, setRent] = useState(0);
  const [body, setBody] = useState("");
  const [address, setAddress] = useState("");
  const [postalCode, setPostalCode] = useState("");
  const [openSuccess, setSuccessOpen] = useState(false);
  const [image, setImage] = useState(null);

  const handleSuccessOpen = () => setSuccessOpen(true);
  const handleSuccessClose = () => setSuccessOpen(false);

  function handleSubmit(event: { preventDefault: () => void }) {
    event.preventDefault();

    axios
      .post(
        NETWORKING_CONTSTANTS.BASE_URL + NETWORKING_CONTSTANTS.PARKING.CREATE,
        {
          title: title === "" ? undefined : title,
          rent: rent === 0 ? undefined : rent,
          body: body === "" ? undefined : body,
          postalCode: postalCode === "" ? undefined : postalCode,
          address: address === "" ? undefined : address,
          latitude: 0,
          longitude: 0,
        },
        config
      )
      .then(() => {
        handleSuccessOpen();
      })
      .catch(() => {});
  }

  const handleImageChange = (e: any) => {
    setImage(e.target.files[0]);
  };

  return (
    <React.Fragment>
      <Box
        component="main"
        sx={{
          backgroundColor: "#F6F6F6",
          display: "flex",
          flexDirection: "column",
          minHeight: "100vh",
          ml: { sm: "240px", xs: 0 },
        }}
      >
        <Grid container>
          <Grid item xs={12} sm={10} md={8} lg={6}>
            <Container sx={{ mt: 5, mb: 5 }}>
              <Typography variant="h4" component="h1" gutterBottom>
                Add Parking Spot
              </Typography>
            </Container>
            <Box
              component="form"
              onSubmit={handleSubmit}
              sx={{ margin: 2, ml: { sm: 3 } }}
            >
              <Stack spacing={2} direction="column" sx={{ mb: 4, mt: 5 }}>
                <Stack direction="row" spacing={2} sx={{ mb: 4, mt: 5 }}>
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
                  sx={{ mb: 4 }}
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
                  sx={{ mb: 4 }}
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
                  sx={{ mb: 4 }}
                />
              </Stack>
              <Button variant="contained" type="submit">
                Create
              </Button>
              {/* <Button sx={{ ml: 2 }} variant="contained" component="label">
                Upload Image
                <input type="file" hidden onChange={handleImageChange} />
              </Button> */}
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
                  transBox: "translate(-50%, -50%)",
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
                  Parking added successfully.
                </Typography>
              </Box>
            </Modal>
          </Grid>
        </Grid>
      </Box>
    </React.Fragment>
  );
}
