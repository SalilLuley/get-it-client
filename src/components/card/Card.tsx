import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import fav from "../../assets/fav.png";
import { useNavigate } from "react-router-dom";
import { ROUTES } from "../../route/Constants";
export default function ActionAreaCard() {
  const navigate = useNavigate();

  return (
    <Card sx={{ display: "flex", m: 2 }}>
      <CardMedia
        onClick={() => {
          navigate(ROUTES.DETAIL);
        }}
        component="img"
        sx={{ width: "40%", height: "20%", p: 2, borderRadius: 2 }}
        image="https://info.hignell.com/hubfs/HR/Images/Blog%20Images/reserved%20parking%20spot_10441780.jpg"
        alt="Live from space album cover"
      />
      <Box sx={{ display: "flex", flexDirection: "column" }}>
        <CardContent sx={{ flex: "1 0 auto" }}>
          <Typography component="div" variant="h5">
            Live From Space
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
          <Typography variant="subtitle1" color="text" component="div">
            Lorem Ipsum is simply dummy text of the printing and typesetting
            industry.
          </Typography>
        </CardContent>
        <Box sx={{ display: "flex", alignItems: "center", pl: 1, pb: 1 }}></Box>
      </Box>
    </Card>
  );
}
