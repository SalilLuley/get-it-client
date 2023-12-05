import React from "react";
import {
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  CardMedia,
  Typography,
} from "@mui/material";

const OrderDetailsPage = () => {
  const product = {
    name: "Parking slot 1",
    price: "15",
    description:
      "This is a reserved parking spot. It is located in a prime location with easy access.",
    image:
      "https://info.hignell.com/hubfs/HR/Images/Blog%20Images/reserved%20parking%20spot_10441780.jpg",
  };

  // return (
  //   <React.Fragment>
  //     <Box
  //       component="main"
  //       sx={{
  //         display: "flex",
  //         ml: { sm: "240px", xs: 0 },
  //         mt: { sm: "80px", xs: "80px", lg: "80px", md: "80px" },
  //       }}
  //     >
  //       <Card sx={{ maxWidth: 345, m: "auto", mt: 5 }}>
  //         <CardMedia
  //           component="img"
  //           height="140"
  //           image={
  //             "https://info.hignell.com/hubfs/HR/Images/Blog%20Images/reserved%20parking%20spot_10441780.jpg"
  //           }
  //           alt={"product.name"}
  //         />
  //         <CardContent>
  //           <Typography gutterBottom variant="h5" component="div">
  //             {"Parking slot 1"}
  //           </Typography>
  //           <Typography variant="body2" color="text.secondary">
  //             {
  //               "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla cursus elit a sem varius, et tempor ex lacinia."
  //             }
  //           </Typography>
  //         </CardContent>
  //         <CardActions>
  //           <Typography variant="h6">${"10"}</Typography>
  //           <Box sx={{ flexGrow: 1 }} />
  //           <Button size="small" variant="contained" color="primary">
  //             Buy Now
  //           </Button>
  //         </CardActions>
  //       </Card>
  //     </Box>
  //   </React.Fragment>
  // );
  return (
    <Box
      component="main"
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        height: "100vh",
        bgcolor: "background.default",
        p: 2,
      }}
    >
      <Card sx={{ maxWidth: 800, width: "100%", m: "auto" }}>
        <CardMedia
          component="img"
          height="400"
          image={product.image}
          alt={product.name}
        />
        <CardContent>
          <Typography gutterBottom variant="h5" component="div">
            {product.name}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {product.description}
          </Typography>
        </CardContent>
        <CardActions>
          <Typography variant="h6">${product.price}</Typography>
          <Box sx={{ flexGrow: 1 }} />
          <Button size="small" variant="contained" color="primary">
            Reserve Now
          </Button>
        </CardActions>
      </Card>
    </Box>
  );
};

export default OrderDetailsPage;
