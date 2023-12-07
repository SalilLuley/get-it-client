import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import fav from "../../assets/fav.png";
import { useNavigate } from "react-router-dom";
import { ROUTES } from "../../route/Constants";
import { Chip } from "@mui/material";

interface ParkingSpot {
  id: number;
  title: string;
  body: string;
  rent: number;
  latitude: number;
  longitude: number;
  address: string;
  postalCode: string;
  status: string;
}

export default function ActionAreaCard(parkingSpot: ParkingSpot) {
  const navigate = useNavigate();

  return (
    <Card
      sx={{
        display: "flex",
        m: 1,
        height: { xs: "auto", sm: "40vh" },
        borderRadius: 2,
        flexDirection: { xs: "column", sm: "row" },
      }}
    >
      <CardMedia
        onClick={() => {
          navigate(ROUTES.DETAIL, { state: { id: parkingSpot.id } });
        }}
        component="img"
        sx={{
          width: { xs: "100%", sm: "40%" },
          height: { sm: "auto", xs: "40%" },
          p: 2,
          borderRadius: 5,
        }}
        image="https://info.hignell.com/hubfs/HR/Images/Blog%20Images/reserved%20parking%20spot_10441780.jpg"
        alt="Live from space album cover"
      />
      <Box sx={{ display: "flex", flexDirection: "column" }}>
        <CardContent sx={{ flex: "1 0 auto" }}>
          <Typography
            noWrap={true}
            textOverflow={"ellipsis"}
            component="div"
            variant="h5"
            sx={{ display: "flex", justifyContent: "space-between" }}
          >
            <span>{parkingSpot.title}</span>
            <Chip
              label={parkingSpot.status}
              color={parkingSpot.status === "BOOKED" ? "secondary" : "primary"}
              size="small"
              sx={{ ml: 1 }}
            />
          </Typography>
          <Box sx={{ display: "flex", alignItems: "center" }}>
            <Box component="img" src={fav} />
            <Typography
              variant="subtitle1"
              color="text.secondary"
              component="div"
            >
              4.8
            </Typography>
          </Box>
          <Typography
            variant="subtitle1"
            color="text"
            component="div"
            // noWrap
            sx={{
              textOverflow: "ellipsis",
              overflow: "hidden",
              // whiteSpace: "nowrap",
            }}
          >
            {parkingSpot.body}
          </Typography>
        </CardContent>
        <Box sx={{ display: "flex", alignItems: "center", pl: 1, pb: 1 }}></Box>
      </Box>
    </Card>
  );
}
