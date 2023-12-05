import React from "react";
import {
  Container,
  Paper,
  Typography,
  Button,
  Grid,
  Card,
  CardActionArea,
  CardContent,
  CardMedia,
  Box,
  Modal,
} from "@mui/material";

const OrderDetailsPage = () => {
  const productDetails = {
    name: "Product Name",
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla cursus elit a sem varius, et tempor ex lacinia.",
    image:
      "https://info.hignell.com/hubfs/HR/Images/Blog%20Images/reserved%20parking%20spot_10441780.jpg",
  };

  const handleSubmit = () => {
    // Implement your submit logic here
    console.log("Order Submitted!");
  };

  return (
    <React.Fragment>
      <Modal
        open={true}
        onClose={() => {
          console.log("Modal closed");
        }}
        aria-labelledby="parent-modal-title"
        aria-describedby="parent-modal-description"
      >
        <Box sx={{ width: 400 }}>
          <h2 id="parent-modal-title">Text in a modal</h2>
          <p id="parent-modal-description">
            Duis mollis, est non commodo luctus, nisi erat porttitor ligula.
          </p>
        </Box>
      </Modal>
    </React.Fragment>
  );
};

export default OrderDetailsPage;
