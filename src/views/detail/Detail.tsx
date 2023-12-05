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
      <Box
        component="main"
        sx={{
          display: "flex",
          ml: { sm: "240px", xs: 0 },
          mt: { sm: "80px", xs: "80px", lg: "80px", md: "80px" },
          backgroundColor: "red",
        }}
      >
        Detail Product
      </Box>
    </React.Fragment>
  );
};

export default OrderDetailsPage;
